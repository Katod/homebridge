var socket = require('net').Socket();
var struct = require('c-struct');
var dgram = require('dgram');

var SHClient = module.exports = {};


function SHClient(address , port) 
{
  this.host = address;//"127.0.0.1";
  this.port = port;//"55555";
  this.logicXml = "" ;
  this.client =  dgram.createSocket('udp4');
  this.devicesStatesStore = {};

  this.request = new struct.Schema(
  {
    SenderID: struct.type.uint16,
    DestID: struct.type.uint16,
    PD: struct.type.uint8,
    Transaction: struct.type.uint8,
    SenderSubID: struct.type.uint8,
    DestSubID: struct.type.uint8,
    Length: struct.type.uint16,
    Data: struct.type.uint8
  });

  struct.register('rq', Request);
  this.client.bind(port);
}


SHClient.prototype.setStatus = function(address,status) 
{
  var buf = struct.packSync('rq', {
  SenderID:2022,
  DestID:401,
  PD:5,
  Transaction:0,
  SenderSubID:0,
  DestSubID:4,
  Length:1,
  Data:0xff,
  });

}

var PORT = 55555;
var HOST = '192.168.1.124';



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

// object to buffer | this can be on another file
var buf = struct.packSync('rq', {
  SenderID:2022,
  DestID:401,
  PD:5,
  Transaction:0,
  SenderSubID:0,
  DestSubID:4,
  Length:1,
  Data:0xff,
});



client.bind(55555);
console.log(buf);
//console.log(unbuf);

// client.on('listening', function () {
//     var address = client.address();
//     console.log('UDP Server listening on ' + address.address + ":" + address.port);
// });

  client.on('message', function (message, remote) {
     var buffer = struct.unpackSync('rq', message);//packer.unpack("!HHBBBBHB", message, 0);
     if(buffer["PD"] == 5)
        console.log(buffer);
     // console.log(remote.address + ':' + remote.port +' - ' + buffer);
  });

  client.send(buf, 0, buf.length, PORT, HOST, function(err, bytes) {
       if (err) throw err;
       console.log('UDP message sent to ' + HOST +':'+ PORT + ' bt  '+buf+' size:'+bytes);
   });



