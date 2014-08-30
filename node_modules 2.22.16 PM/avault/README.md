avault
=========

A small module providing the ability to store sensitive data securely and retrieve it decrypted at runtime.

## Installation

  npm install avault

## Usage
There are two steps to follow to use the avault service:

1. First, use the vaultcli.js utility to store sensitive data encrypted in a named vault.  You may create as many vaults as you like.  Each vault contains a string, which would typically be a stringified JSON object.
2. Then, it can later be retrieved decrypted for use at runtime.

Step 1 is performed very infrequently.  Step 2 is performed frequently, whenever sensitive data (e.g. credentials) needs to be retrieved.

### Create a Vault, Empty All Vaults or Set the Master Secret with Command-line Tool 'vaultcli.js'
  usage: vaultcli.js  [--version]  [--zap] [--verbose] [--reallyverbose] [--secret=&lt;secretValue&gt;] [--value=&lt;vaultValue&gt;] &lt;vaultName&gt;

  example - create a vault entry:

    node_modules/avault/vaultcli.js --verbose --value='{"username": "mrogers", "password": "director", "host": "nsa.rds.amazonaws.com", "database": "prism"}' sigad

  example - remove all vaults:

    node_modules/avault/vaultcli.js --zap --verbose

  example - set the master key:

    node_modules/avault/vaultcli.js --secret=skeleton --verbose

### Create a Vault with Code
    var vault = require('avault').createVault(__dirname);
    var keyName = 'key1';
    vault.generateKey(keyName).then(
        function (keyResponse) {
            vault.store(keyName, '{"username": "mrogers", "password": "director", "host": "nsa.rds.amazonaws.com", "database": "prism"}', 'sigad').then(
                function (storeResponse) {
                    console.log('Ok', storeResponse);
                },
                function (err) {
                    console.log('Error', err);
                });
        },
        function (err) {
            console.log('Error', err);
        });


### Retrieve Decrypted Data from a Vault at Runtime
    var vault = require('avault').createVault(__dirname);

    vault.get('sigad', function (profileString) {
        var profile = JSON.parse(profileString);
        console.log(profile);
    });

## Tests

  npm test

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 0.1.0 Initial release