#! /usr/bin/env node
var vault = require('./vault.js').createVault();
var chalk = require('chalk');
var parseArgs = require('minimist');

var version = '0.1.0';
var keyName = 'key1';

var opts = {
    '--': true,
    boolean: ['verbose', 'reallyverbose', 'version', 'zap'],
    string: ['secret']
}

var argv = parseArgs(process.argv.slice(2), opts);

if (!((argv._.length == 1 && argv.value) || argv.version || argv.zap || argv.secret)) {
    showHelp();
} else {
    var storeName = argv._[0];
    var value = argv.value;
    if (argv.version) {
        showVersion();
    } else if (argv.zap) {
        zap(argv.verbose, argv.reallyverbose);
    }
    else if (argv.secret) {
        setSecret(argv.secret, argv.verbose, argv.reallyverbose);
    }
    else {
        store(storeName, value, argv.verbose, argv.reallyverbose);
    }
}

function zap(verbose, reallyverbose) {
    vault.zap(keyName).then(
        function(zapResponse){
            if (verbose) {
                showSuccess('store', zapResponse, false);
            }
        },
        function(err) {
            showError(err);
        }
    );
}

function store(storeName, value, verbose, reallyverbose) {
    vault.generateKey(keyName).then(
        function(keyResponse){
            if (reallyverbose) {
                showSuccess('key', keyResponse, keyResponse.message.indexOf('created') > -1);
            }
            vault.store(keyName, value, storeName).then(
                function(storeResponse) {
                    if (verbose) {
                        showSuccess('store', storeResponse, storeResponse.message.indexOf('created') > -1);
                    }
                },
                function(err) {
                    showError(err);
                }
            );
        },
        function(err) {
            showError(err);
        }
    );

}

function setSecret(secret, verbose, reallyverbose) {
    vault.setSecret(secret, true).then(
        function(response) {
            if (verbose) {
                showSuccess('store', response, false);
            }
        },
        function(err) {
            showError(err);
        }
    );
}

function showError(str, err) {
    var responseString = JSON.stringify(err, undefined, '\t');
    console.log(chalk.red(str, responseString));

    process.exit(1);
}

function showSuccess(str, response, created) {
    var responseString = JSON.stringify(response, undefined, '\t');
    console.log(created ? chalk.green(str, responseString) : chalk.cyan(str, responseString));
}

function showVersion() {
    console.log(version);
}

function showHelp() {
    console.log('usage: vaultcli.js  [--version] [--zap] [--secret=<secretValue>] [--verbose] [--reallyverbose] [--value=<vaultValue>] <vaultName>');
9}