var chai = require('chai');
chai.use(require('chai-json-schema'));

var expect = chai.expect,
    I = require('./');

describe('protoface', function() {
  beforeEach(function() {
    this.fixObject = {
      name: 'Fix Object',
      defaults: {
        attr: 1
      },
      get: function(id) {},
      set: function(id, data) {}
    };

    this.schema = {
      "name": "Interface",
      "type": "object",
      "required": ["name", "defaults", "get", "set"],
      "properties": {
        "name": {
          "type": "string",
          "minLength": 1
        },
        "defaults": {
          "type": "object",
          "required": ["attr"],
          "properties": {
            "attr": {
              "type": "number",
              "format": "digits",
              "minimum": 0
            }
          }
        },
        "set": {
          "type": "object",
          "isFunction": true,
          "properties": {
            "args": {
              "type": "array",
              "required": ["id", "data"],
              "items": [
                {
                  "title": "id",
                  "type": "string",
                  "minLength": 1
                },
                {
                  "title": "data",
                  "type": "string",
                  "minLength": 1
                }
              ]
            }
          }
        }
      }
    };
  });

  afterEach(function() {
    this.fixObject = null;
    this.schema = null;
  });

  it('should allow json-schema validators to accept methods', function() {
    var isValid = I(this.schema, this.fixObject);
 //    var isValid = I({
 //    type: 'object',
 //    properties: {
 //        x: {
 //            type: 'number'
 //        },
 //        y: {
 //            type: 'function'
 //        }
 //    },
 //    required: ['x', 'y']
 // }, {x: 10, y: function(x, y) {}});

    expect(isValid).to.be.ok;
  });
});