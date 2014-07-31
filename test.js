var chai = require('chai');
chai.use(require('chai-json-schema'));

var expect = chai.expect,
    i = require('./');

describe('protoface', function() {
  
  it('should allow json-schema validators to accept "function" data type', function() {
    var schema = {
      "fn": {
        "type": "function"  
      }
    };

    var data =  {
      fn: function() {}
    };

    var err = i(schema, data);
    expect(err).to.be.null;
  });

  it('should validate the implementation of function arguments', function() {
    var schema = {
      "type": "object",
      "properties": {
        "fn": {
          "type": "function",
          "arguments": ["arg1", "arg2"]
        }
      }
    };

    var data = {
        fn: function(arg1, arg2) {}
    };

    var err = i(schema, data);

    expect(err).to.be.null;
  });

  it('should validate the existence of arguments regardless their order', function() {
     var schema = {
      "type": "object",
      "properties": {
        "fn": {
          "type": "function",
          "arguments": ["arg1", "arg2"]
        }
      }
    };

    var data = {
        fn: function(arg2, arg1) {}
    };

    var err = i(schema, data);

    expect(err).to.be.null;
  });

  it('should validate the existence of arguments regardless other arguments', function() {
    var schema = {
      "type": "object",
      "properties": {
        "fn": {
          "type": "function",
          "arguments": ["arg1", "arg2"]
        }
      }
    };

    var data = {
        fn: function(arg2, arg1, arg3) {}
    };

    var err = i(schema, data);

    expect(err).to.be.null;
  });

  it('should continue validate normal schemas', function() {
    var schema = {
      "type": "object",
      "properties": {
        "fn": {
          "type": "function",
          "arguments": ["arg1", "arg2"]
        },
        "coords": {
          "type": "object",
          "properties": {
            "x": {
              "type": 'number'
            },
            "y": {
              "type": 'number'
            }
          },
          "required": ["x", "y"]
        }
      }
    };
    var data = {
        fn: function(arg2, arg1, arg3) {},
        coords: {x: 1, y: 2}
    };

    var err = i(schema, data);

    expect(err).to.be.null;
  });
});