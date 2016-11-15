"use strict";
var socket = require('net').Socket();
var struct = require('c-struct');
var dgram = require('dgram');

var Request = new struct.Schema({
  SenderID: struct.type.uint16,
  DestID: struct.type.uint16,
  PD: struct.type.uint8,
  Transaction: struct.type.uint8,
  SenderSubID: struct.type.uint8,
  DestSubID: struct.type.uint8,
  Length: struct.type.uint16,
  Data: struct.type.uint8
});

// register to cache

struct.register('rq', Request);

var Server = function(host,port) {
    this.host = host;
    this.port = port;
    this.client = dgram.createSocket('udp4');
    
    this.client.bind(port);
};

Server.prototype.setStatus = function (id,subid,status) {
      var buf = struct.packSync('rq', {
      SenderID:2022,
      DestID:id,
      PD:5,
      Transaction:0,
      SenderSubID:0,
      DestSubID:subid,
      Length:1,
      Data:status,
    });

       this.client.send(buf, 0, buf.length, this.port, this.host, function(err, bytes) {
        if (err) throw err;
      });

};

module.exports = Server;