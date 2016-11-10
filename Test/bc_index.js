var binary = require('binary');

var s = require('net').Socket();
var HOST = '192.168.1.125';
var PORT = 55555;

// var crypto = require('crypto');
// var algorithm = 'aes-128-ctb';
// var r_pass = '0000000000000000';
// var r_pass_base64 = r_pass.toString("base64");

// var data = 0;

// function encrypt(buffer){
//   var cipher = crypto.createCipher(algorithm,r_pass_base64);
//   var crypted = Buffer.concat([cipher.update(buffer),cipher.final()]);
//   return crypted;
// }
 
// function decrypt(buffer){
//   var decipher = crypto.createDecipher(algorithm,r_pass_base64)
//   var dec = Buffer.concat([decipher.update(buffer) , decipher.final()]);
//   return dec;
// }

// s.connect(PORT,HOST)


var data = binary()
    .word32lu('x')
    .word16bs('y')
    .word16bu('z')
    .tap(function (vars) {
        console.dir(vars);
    })
;


s.on('connect', function(d){
        console.log('connect');
//        if(data != undefined)
//        s.write(data);
})
