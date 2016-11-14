var Service, Characteristic;

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
  this.log( "Initialized '" + this.name + "'" + this.id + "'"+ this.subid + "'");
}

LampAccessoryMimi.prototype.getServices = function() {
  var lightbulbService = new Service.Lightbulb( this.name );
  var bulb = this;

  lightbulbService
    .getCharacteristic( Characteristic.On )
    .on( 'get', function( callback ) {
      callback( null, bulb.power );
    } )
    .on( 'set', function( value, callback ) {
      bulb.power = value;
      bulb.log( "power to " + value );
      callback();
    } );

  return [ lightbulbService ];
};
