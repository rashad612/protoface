'use strict';

var tv4 = require('tv4');
var env = require('jjv')();
module.exports = function(schema, data) {
   
    env.addType('function', function(v) {
      
        return typeof v == 'function';
        
        // return /function[\-s]*\([,]*\)[-s]*{.*}/gi.test(v);
    });

    env.addSchema('schema', schema);
    var err = env.validate('schema', data);
    console.log(err);
    return err === null;
};

var protoface = {};

protoface.init = function() {};
protoface.prepare = function(object) {

};
