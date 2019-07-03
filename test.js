const moddir      = '/usr/local/lib/node_modules/';
var execSync = require("child_process").execSync;
var licz=0;
"use strict";
const Gpio = require('/home/pi/app/onoff/node_modules/onoff').Gpio;

const pin17 = new Gpio(17, 'in', 'rising'); //'none', 'rising', 'falling' or 'both'. 
const pin18 = new Gpio(18, 'in', 'both');
const pin27 = new Gpio(27, 'in', 'both');

console.log('------ START ---------------------------')

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



   function resetpatch(){
         Volume=80;
         TopScroll=0;
        
   }

   function patch(pin,value){
      //console.log(pin,value)
      PinArr[pin]=value;
      if (pin==17) {
         if (PinArr[18] === PinLastLast[18]) console.log(PinArr[18],PinLast[18],PinLastLast[18]);
            /*
            let dir=0; 
            if (PinArr[18] == PinLast[18]){
               dir = PinArr[18] ? 1:-1;
            }
            if (dir) {
               Volume    += dir;
               TopScroll += dir;
               Volume    = Volume>100? 100:Volume;
               TopScroll = TopScroll>0?TopScroll:0;
               console.log(PinArr[18],dir,PinLast[18],Volume,TopScroll);
         
            }
            */
            PinLastLast[18] = PinLast[18];
            PinLast[18] = PinArr[18];
      }   
   }


         pin17.watch((err, value) => {patch(17,value);  if (err) {throw err;}});
         pin18.watch((err, value) => {patch(18,value);  if (err) {throw err;}});
         pin27.watch((err, value) => {resetpatch();     if (err) {throw err;}});


process.on('SIGINT', () => {
   console.log('===== KONIEC ========');
   pin17.unexport();
   pin18.unexport();
   pin27.unexport();
   process.exit();
});
/*
process.on('SIGINT', function() {
    console.log("Caught interrupt signal");

    if (i_should_exit)
        process.exit();
});
*/

