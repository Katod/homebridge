"use strict";
var Service, Characteristic;
var Server = require('./Server.js');

var MimiSmartServer =  new Server('192.168.1.255' ,55555);
    console.log( "TEST");
MimiSmartServer.setStatus(575,40,Buffer([0x0,0x02]));
