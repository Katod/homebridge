"use strict";
var sys = require('util');
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
  Length: struct.type.uint16
});

// register to cache

struct.register('rq', Request);

var Server = function(host,port) {
    this.host = host;
    this.port = port;
    this.StatusStorage = []; 
    this.client = dgram.createSocket('udp4');
    this.client.bind(port);


    this.client.on('listening', function(){
        this.setBroadcast(true);
    });

     this.client.on('message', function (message, remote) {
         var buffer = struct.unpackSync('rq', message);//packer.unpack("!HHBBBBHB", message, 0);
          

        if(buffer["PD"] == 15 && buffer["SenderID"] == 401)
          {
             this.StatusStorage.push(10);
            console.log( this.StatusStorage);
          }
      // console.log(remote.address + ':' + remote.port +' - ' + buffer);
     });

};




Server.prototype.setStatus = function (id,subid,status) {
      var buf = struct.packSync('rq', {
      SenderID:2022,
      DestID:id,
      PD:5,
      Transaction:0,
      SenderSubID:0,
      DestSubID:subid,
      Length:status.length
    });

     buf = Buffer.concat([buf, status], (buf.length + status.length));
     
       this.client.send(buf, 0, buf.length, this.port, this.host, function(err, bytes) {
        if (err) throw err;
      });

};

module.exports = Server;