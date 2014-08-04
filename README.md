## Protoface [![Build Status](https://travis-ci.org/rashad612/protoface.svg)](https://travis-ci.org/rashad612/protoface)

Like OO Interfaces, we need to ensure the prototypal objects must implement specific methods.

### Why ?

The Mixin pattern allows us to write extendable plugins. But what if we need these plugins to exactly have specific methods?
It is like we need the object to implement some methods, with desired arguments.

### How it works

Protoface validates objects in plain JSON format through JSON Schema. Using [JJV validator](https://github.com/acornejo/jjv) it extends the core functionality and allow JSON Schema to accept **function** data type.

It is a slim wrapper over JJV, and exposes a single instance of it, allowing the rest of the object to be validated through JJV.

### Example

```javascript
var p = require('protoface');

// How functions are validated through Json Schema.
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

var err = p(schema, data); // err === null

...

// The implementation of method and arguments should be correct.
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
  fn: function(arg1) {}
};

var err = p(schema, data); // { validation: { fn: { arguments: true } } }

...

// The existence of extra arguments should not break the validation, alongside 
// other different typed properties. 
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

var err = p(schema, data); // err === null

...

// JJV functionality is still exposed.

var p = require('protoface'); // Based on require('jjv')().

var err = p({
  type: 'object',
  properties: {
      x: {
          type: 'number'
      },
      y: {
          type: 'number'
      }
  },
  required: ['x', 'y']
 }, {x: 20, y: 50}); // err === null

```

### License

MIT
