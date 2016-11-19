"use strict";
var struct = require('c-struct');

var Request = new struct.Schema({
  SenderID: struct.type.uint16,
  DestID: struct.type.uint16,
  PD: struct.type.uint8,
  Transaction: struct.type.uint8,
  SenderSubID: struct.type.uint8,
  DestSubID: struct.type.uint8,
  Length: struct.type.uint16
});

// register to cache

struct.register('rq', Request);

module.exports = rq;