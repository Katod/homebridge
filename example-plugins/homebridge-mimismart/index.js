"use strict";
var Service, Characteristic;
var Server = require('./Server.js');

var MimiSmartServer =  new Server('192.168.1.124' ,55555);


module.exports = function( homebridge ) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;

  homebridge.registerAccessory( "homebridge-mimismart", "Mimi-Lamp", LampAccessoryMimi );
 // homebridge.registerPlatform("homebridge-mimismart", "mimiSmart", MimiSmartPlatform);
};

// function MimiSmartPlatform(log, config){
//     this.log      = log;
//     this.host     = config["host"];
//     this.port     = config["port"];
//    MimiSmartServer =  new Server(this.host ,this.port);
//}

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
  var lightbulbService = new Service.Lightbulb(this.name);
  var lamp = this;

  lightbulbService
    .getCharacteristic( Characteristic.On )
    .on( 'get', function( callback ) {
      callback( null, lamp.power );
    } )
    .on( 'set', function( value, callback ) {
      lamp.power = value;
      
      MimiSmartServer.setStatus(lamp.id,lamp.subid,value);
      lamp.log( "power to " + value );
      callback();
    } );

  return [ lightbulbService ];
};
