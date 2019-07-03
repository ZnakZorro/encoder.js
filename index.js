const moddir      = '/usr/local/lib/node_modules/';
var execSync = require("child_process").execSync;
const express = require(moddir+'express');
const app = express();
const http = require('http').Server(app);
const io = require('./node_modules/socket.io')(http);
const port = process.env.PORT || 8500;
app.use(express.static(__dirname + '/public'));
io.on('connection', onConnectionStart);

function onConnectionStart(socket){
	console.log('onConnectionStart')
	console.time('a');
	onConnection(socket);
      pin17.watch((err, value) => {patch(17,value,socket);   if (err) {throw err;}  });
      pin18.watch((err, value) => {patch(18,value,socket);  if (err) {throw err;}  });
      pin27.watch((err, value) => {resetpatch(socket);      if (err) {throw err;}  });   
}

function onConnection(socket){
	socket.on('config', (data) => {
		console.log('config=',data,data.time);
		
	})
	socket.on('message', (data) => {
	  console.log(data);
	  socket.broadcast.emit('sala', {sala:'sala'});
	  
  });
  
}

http.listen(port, () => console.log('listening on port ' + port));

/*=======================*/

"use strict";
const Gpio = require('/home/pi/app/onoff/node_modules/onoff').Gpio;

const pin17 = new Gpio(17, 'in', 'rising'); //'none', 'rising', 'falling' or 'both'. 
const pin18 = new Gpio(18, 'in', 'both');
const pin27 = new Gpio(27, 'in', 'both');

console.log('------ START --------------------')

let PinArr=[];
PinArr[17]=0;
PinArr[18]=0;
let PinLast=[];
PinLast[17]=0;
PinLast[18]=0;
let PinLastLast=[];
PinLastLast[17]=0;
PinLastLast[18]=0;

let Volume=80;
let TopScroll=0;



   function resetpatch(socket){
         Volume=80;
         TopScroll=0;
        socket.broadcast.emit('message', {"vol":Volume,"top":TopScroll});
   }

   function patch(pin,value,socket){
      //console.log(pin,value)
      PinArr[pin]=value;
      if (pin==17) {
         //let dir= PinArr[18] && (PinArr[18] == PinLast[18]) ? '+++':'---';
         let dir=0; 
         if (PinArr[18] === PinLastLast[18]){
            dir = PinArr[18] ? 1:-1;
         //}
         //if (dir) {
            Volume    += dir;
            TopScroll += dir;
            Volume    = Volume>100? 100:Volume;
            TopScroll = TopScroll>0?TopScroll:0;
            console.log('#155=a/l/ll/dir',PinArr[18],PinLast[18],PinLastLast[18],dir,Volume,TopScroll);
            //console.log(socket)
            socket.broadcast.emit('message', {"vol":Volume,"top":TopScroll});
         }
         PinLastLast[18] = PinLast[18];
         PinLast[18] = PinArr[18];
      }
   }


process.on('SIGINT', () => {
   console.log('===== KONIEC ========');
   pin17.unexport();
   pin18.unexport();
   pin27.unexport();
   process.exit();
});




