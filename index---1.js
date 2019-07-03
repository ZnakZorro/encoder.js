const moddir      = '/usr/local/lib/node_modules/';
var execSync = require("child_process").execSync;
const express = require(moddir+'express');
const app = express();
const http = require('http').Server(app);
const io = require('./node_modules/socket.io')(http);
const port = process.env.PORT || 8500;
var licz=0;

app.use(express.static(__dirname + '/public'));

io.on('connection', onConnectionStart);


var timeStart=(new Date()).getTime();
var timeStop =(new Date()).getTime();
var timeDelta =0;

function slij(socket){
	timeStop  = (new Date()).getTime();
	timeDelta = timeStop-timeStart;
	timeStart =(new Date()).getTime();
	licz++
	socket.broadcast.emit('message', los());
	console.timeEnd('a');
	console.time('a');

}


var czyWyslac = true;

function onConnectionStart(socket){
	console.log('onConnectionStart')
	console.time('a');
	onConnection(socket);
	//if (ttt===null) ttt=setInterval(function(){slij(socket);},intervalTIME);
   
   
         pin17.watch((err, value) => {patch(17,value,socket);   if (err) {throw err;}  });
         pin18.watch((err, value) => {patch(18,value,socket);  if (err) {throw err;}  });
         pin27.watch((err, value) => {resetpatch(socket);      if (err) {throw err;}  });
   
   
}

function onConnection(socket){
	socket.on('config', (data) => {
		console.log('config=',data,data.time);
		
	})
	socket.on('message', (data) => {
	  //console.log(data);
	  //socket.broadcast.emit('message', data)
	  
  });
  
}
Buffer.prototype.pars = function() {return this.toString().trim();};

function los() {
return {}
	let cpu_command="grep 'cpu ' /proc/stat | awk '{usage=($2+$4)/($2+$4+$5)} END {print usage}'";
	let cpu = execSync(cpu_command).pars();	

	let tem_command="cat /sys/class/thermal/thermal_zone0/temp";
	let tem = execSync(tem_command).pars();	

	let wif_command="cat /proc/net/wireless | grep wlan0 | awk '{print $4}'";
	let wif = execSync(wif_command).pars();	

	let TEM = Math.round(parseFloat(tem)/10)/100;
	let CPU = Math.round(parseFloat(cpu*10000))/100;
	let WIF = Math.round(parseFloat(wif));

		return { 
			time :(new Date()).getTime(),
			cpu: CPU,
			tem: TEM,
			wif: WIF,
			tim: intervalTIME,
			tre: timeDelta,
         //vol:Volume,
         //top:TopScroll
		}
      //{"vol":Volume,"top":TopScroll}
}

/*
app.post('/time/*', function(req, res) {
	//console.log('#7=',(req));	
	var param = req.params;

	res.send({time:intervalTIME});
});
*/

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
/*
pin17.watch((err, value) => {patch(17,value,_socket);   if (err) {throw err;}  });
pin18.watch((err, value) => {patch(18,value,_socket);   if (err) {throw err;}  });
pin27.watch((err, value) => {console.log(27,value)      if (err) {throw err;}  });
*/

process.on('SIGINT', () => {
   console.log('===== KONIEC ========');
   pin17.unexport();
   pin18.unexport();
   pin27.unexport();
   process.exit();
});




