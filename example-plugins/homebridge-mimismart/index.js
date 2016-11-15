var Service, Characteristic;
var socket = require('net').Socket();
var struct = require('c-struct');

var PORT = 55555;
var HOST = '192.168.1.124';

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

// object to buffer | this can be on another file

var client = dgram.createSocket('udp4');

client.bind(55555);

module.exports = function( homebridge ) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  homebridge.registerAccessory( "homebridge-mimismart", "Mimi-Lamp", LampAccessoryMimi );
};

function LampAccessoryMimi( log, config ) {
  this.log = log;
  this.config = config;
  this.name = config.name;
  this.id = config.id;
  this.subid = config.subid;
  this.power = 0;
  this.log( "Initialized '" + typeof this.name + "'" + this.id + "'"+ this.subid + "'");
}

LampAccessoryMimi.prototype.getServices = function() {
  var lightbulbService = new Service.Lightbulb(this.name + this.id + this.subid);
  var bulb = this;

  lightbulbService
    .getCharacteristic( Characteristic.On )
    .on( 'get', function( callback ) {
      callback( null, bulb.power );
    } )
    .on( 'set', function( value, callback ) {
      bulb.power = value;
      
var buf = struct.packSync('rq', {
         SenderID:2022,
         DestID:bulb.id,
         PD:5,
         Transaction:0,
         SenderSubID:0,
         DestSubID:bulb.subid,
         Length:1,
         Data:value,
         });

  client.send(buf, 0, buf.length, PORT, HOST, function(err, bytes) {
       if (err) throw err;
      //bulb.log( buf );
      //bulb.log( buf2 );  
   });
      bulb.log( "power to " + value );
      callback();
    } );

  return [ lightbulbService ];
};
