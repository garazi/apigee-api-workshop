var uuid = require('node-uuid');
var Q = require('q');
var crypto = require('crypto');
var fs = require('fs');

var Vault = function(storeFolder, secret, alg) {
    storeFolder = storeFolder || '.'
    var storeFilename = storeFolder + '/store.js';
    var keysFilename = storeFolder + '/keys.js';
    var store = fs.existsSync(storeFilename) ? require(storeFilename) : {};
    var keys = fs.existsSync(keysFilename) ? require(keysFilename) : {};

    var _0x98bf = [alg || "\x61\x65\x73\x31\x32\x38", secret || "\x6f\x70\x65\x6e\x73\x65\x73\x61\x6d\x65"];
    var algorithm = _0x98bf[0];
    var masterPassword = _0x98bf[1];

    this.zap = function() {
        var dfd = Q.defer();
        var response = {
            status: 0
        };
        var fileContents = '';
        fs.writeFile(storeFilename, fileContents, function (err) {
            if (err) {
                // not saved
                response.status = 0x02;
                response.message = '"keys.js" could not be written.';
                dfd.reject(response);
            } else{
                // saved
                response.message = 'Store successfully zapped.';
                fs.writeFile(keysFilename, fileContents, function (err) {
                    if (err) {
                        response.status |= 0x04;
                    } else {
                        // saved
                        response.message += ' Keys successfully zapped';
                        dfd.resolve(response);
                    }
                });
            }
        });

        return(dfd.promise);
    }

    this.store = function(keyName, stringToEncrypt, storeKeyName) {
        var dfd = Q.defer();
        var response = {
            status: 0
        };

        if (keys[keyName] === undefined) {
            response.status = 0x01;
            response.message = 'Required key "' + keyName + '" not defined.';
            dfd.reject(response);
        } else {
            var isNew = store[storeKeyName] === undefined;
            var encryptedKey = keys[keyName].data;
            var decryptedKey = this.decrypt(encryptedKey, masterPassword);
            var encryptedStoreValue = this.encrypt(stringToEncrypt, decryptedKey);
            store[storeKeyName] = {
                key: keyName,
                data: encryptedStoreValue
            }
            var fileContents = 'module.exports = ' + JSON.stringify(store, null, '\t') + ';'
            fs.writeFile(storeFilename, fileContents, function (err) {
                if (err) {
                    // not saved
                    response.status = 0x02;
                    response.message = '"store.js" could not be written.';
                    dfd.reject(response);
                } else{
                    // saved
                    response.encrypted = encryptedStoreValue;
                    response.message = 'Store \'' + storeKeyName + '\' successfully ' + (isNew ? 'created.' : 'updated.');
                    dfd.resolve(response);
                }
            });

        }

        return(dfd.promise);
    }

    this.get = function(storeKey, cb, cbContext) {
        var decrypted = null;

        if (store[storeKey] != undefined) {
            var storeItem = store[storeKey];
            var encryptedData = storeItem.data;
            var key = storeItem.key;
            if (keys[key] != undefined) {
                var keyItem = keys[key];
                var encryptedKey = keyItem.data;
                var decryptedKey = this.decrypt(encryptedKey, masterPassword);
                decrypted = this.decrypt(encryptedData, decryptedKey);
            }
        }
        cb.call(cbContext, decrypted);

    }

    this.getObject = function(storeKey) {
        var decrypted = this.get(storeKey);
        return decrypted ? JSON.parse(decrypted) : {};
    }

    this.encrypt = function(stringToEncrypt, password) {;
        var cipher = crypto.createCipher(algorithm, password);
        var msg = [];
        msg.push(cipher.update(stringToEncrypt, "binary", "hex"));
        msg.push(cipher.final("hex"));
        var encrypted = msg.join("");
        return(encrypted);
    }
    this.decrypt = function(encrypted, password) {
        var decipher = crypto.createDecipher(algorithm, password),
        msg = [];
        msg.push(decipher.update(encrypted, "hex", "binary"));
        msg.push(decipher.final("binary"));
        var decrypted = msg.join("");
        return(decrypted);
    }

    this.generateKey = function(keyName) {
        var dfd = Q.defer();
        var response = {
            status: 0
        };

        var encrypted = null;
        if (keys[keyName] === undefined) {
            var keyValue = uuid.v4();
            var encrypted = this.encrypt(keyValue, masterPassword);
            keys[keyName] = {
                data: encrypted
            }
            var fileContents = 'module.exports = ' + JSON.stringify(keys, null, '\t') + ';'
            fs.writeFile(keysFilename, fileContents, function (err) {
                if (err){
                   // not saved
                    response.status = 0x04;
                    response.message = '"keys.js" could not be written';
                    dfd.reject(response);
                } else{
                    // saved
                    response.encrypted = encrypted;
                    response.message = 'Key successfully created.'
                    dfd.resolve(response);
                }
            });
        } else {
            response.message = 'Key already exists.'
            dfd.resolve(response);
        }

        return(dfd.promise);
    }
    this.setSecret = function(secret, permanent) {
        if (permanent) {
            return(this.setSecretPermanent(secret));
        } else {
            var dfd = Q.defer();
            var response = {
                status: 0
            };
            masterPassword = secret;
            response.message = 'Master secret successfully set';
            dfd.resolve(response);
            return(dfd.promise);
        }
    }
    this.setSecretPermanent = function(secret) {
        var dfd = Q.defer();
        var response = {
            status: 0
        };
        fs.readFile(__filename, 'utf8', function (err, data) {
            if (err) {
                throw err;
            }
            var marker = ', secret || ';
            var pos = data.indexOf(marker);
            var pos2 = -1;
            if (pos > -1) {
                pos2 = data.indexOf(']', pos + 1);
                if (pos2 > -1) {
                    var secretHex = '';
                    for (var i = 0; i < secret.length; ++i) {
                        secretHex +=  '\\x' + secret.charCodeAt(i).toString(16);
                    }
                    var newContents = data.substring(0, pos + marker.length) + '"' + secretHex + '"' + data.substring(pos2);
                    fs.writeFile(__filename, newContents, function (err) {
                        if (err) {
                            response.message = 'Error saving file.  Master secret could not be set.';
                            response.status = 0x10;
                            dfd.reject(response);
                        } else {
                            // saved
                            response.message = 'Master secret successfully set';
                            dfd.resolve(response);
                        }
                    });
                }
            }
            if (pos == -1 || pos2 == -1) {
                response.message = 'Error find marker. Format may have been changed.  Master secret could not be set.';
                response.status = 0x08;
                dfd.reject(response);
            }
        });

        return(dfd.promise);
    }
}

function createVault(storeFolder, secret, alg) {
    return new Vault(storeFolder, secret, alg);
}

module.exports.createVault = createVault;
