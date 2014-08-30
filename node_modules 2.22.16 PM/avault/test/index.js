'use strict';

var Vault = require('../vault.js');
var assert = require('assert');

var keyName = 'key1';
var value = {
    x: 56,
    y: 89,
    s: "Some string"
}
var valueString = JSON.stringify(value);

describe('Vault', function() {
  describe('generateKey', function() {
    it('should ensure a store key is created, generating it if needed', function(){
        var vault = Vault.createVault();
        vault.generateKey(keyName).then(
            function(keyResponse){
                assert.equal(0, keyResponse.status);
                done();
            });
    })
  })

  describe('store', function() {
      it('should store data encrypted into the store', function(){
          var vault = Vault.createVault();
          vault.store(keyName, valueString, 'myStore').then(
              function(storeResponse) {
                  console.log(storeResponse.status);
                  assert.equal(1, storeResponse.status);
                  assert(false);
                  done();
              });
      });
  })
})
