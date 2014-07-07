var chai = require('chai');
chai.use(require('chai-json-schema'));

var expect = chai.expect,
    cacheDriver = require('./fixures/cache_driver');

describe('interface', function() {
  beforeEach(function() {
    chai.tv4.prepare = chai.tv4.prepare || function(data) {
      for (prop in data) {
        if (typeof data[prop] == 'function') {
          console.log(data[prop].toString());
        }
      }
    };

    chai.tv4.prepare(cacheDriver);
    chai.tv4.addFormat('digits', function (data, schema) {
      if (typeof data === 'string' || typeof data === 'number' && /^[0-9]+$/.test(data)) {
        return null;
      }
      return "must be string of decimal digits";
    });

    chai.tv4.defineKeyword('isFunction', function(data, value, schema) {
      console.log(data, value, schema);
      return null;
    });

    this.schema = {
      "name": "Interface",
      "type": "object",
      "required": ["name", "defaults", "get", "set", "test", "delete"],
      "properties": {
        "name": {
          "type": "string",
          "minLength": 1
        },
        "defaults": {
          "type": "object",
          "required": ["ttl"],
          "properties": {
            "ttl": {
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
            "paramters": {
              "type": "array",
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
            },
            "return": {
              "type": "boolean"
            }
          }
        }
      }
    };
  });
  afterEach(function () {
    this.schema = null;
  });

  it('should validate schema', function() {
    expect(cacheDriver).to.be.jsonSchema(this.schema);
  });
});