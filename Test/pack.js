var struct = require('c-struct');

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

2022,401,5,0,0,4,1,0xff

console.log(buf);