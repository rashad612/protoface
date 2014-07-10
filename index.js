'use strict';

var tv4 = require('tv4');
var env = require('jjv')();
module.exports = function(data, schema) {
    // tv4.defineKeyword('isFunction', function(data, value, schema) {
    //     console.log(data, value);
    //     return 'Fail!';
    // });
    // tv4.addSchema('Interface', schema);
    // return tv4.validate(data, schema); 
    // env.addCheck('isFunction', function(v, p) {
    //     if (p === true) {

    //     }
    //     console.log(v, p);
    // });
    env.addType('function', function(v) {
        console.log(v);
        if (typeof v == 'string') {
            eval('var fn = ' + v);
            return typeof fn == 'function';
        }

        return true;
        
        // return /function[\-s]*\([,]*\)[-s]*{.*}/gi.test(v);
    });

    env.addSchema('schema', schema);
    var err = env.validate('schema', data);
    return err === null;
};

var protoface = {};

protoface.init = function() {};
protoface.prepare = function(object) {

};
 // chai.tv4.prepare(cacheDriver);
    // chai.tv4.prepare = chai.tv4.prepare || function(data) {
    //   for (prop in data) {
    //     if (typeof data[prop] == 'function') {
    //       console.log(data[prop].toString());
    //     }
    //   }
    // };

    // chai.tv4.prepare(cacheDriver);
    // chai.tv4.addFormat('digits', function (data, schema) {
    //   if (typeof data === 'string' || typeof data === 'number' && /^[0-9]+$/.test(data)) {
    //     return null;
    //   }
    //   return "must be string of decimal digits";
    // });

    // chai.tv4.defineKeyword('isFunction', function(data, value, schema) {
    //   console.log(data, value, schema);
    //   return null;
    // });