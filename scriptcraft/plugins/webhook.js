/*
  Apple HomeKit ScriptCraft integration with homebridge & homebridge-http-webhooks (both available on npm)
*/

var accessories = {};
var http = require('../modules/http/request');

command('hk', function(arg, player) {
  var cmd = arg[0];
  var id = arg[1];

  // helper function because yolo
  function ekko(g) {
    echo(player,g);
  }

  // USAGE - /jsp hk register x y z id
  // links a homebridge switch to a coordinate in the world
  // x y z : coordinates of block to link to switch
  // id : the id of the switch as defined with homebridge-http-webhooks in ~/.homebridge/config.json
  if (cmd == 'register') {
    var x = parseInt(arg[1]);
    var y = parseInt(arg[2]);
    var z = parseInt(arg[3]);
    id = arg[4];
    // accessory entry format in the accessories dict:
    // [0] : int : x coord
    // [1] : int : y coord
    // [2] : int : z coord
    // [3] : bool : turn redstone signal on when switch is on (false inverts this)
    // [4] : obj : setinterval object that checks for switch state
    // [5] : bool : echo messages about switch state every update
    accessories[id] = [x,y,z,true];
    accessories[id][5] = false;
    echo(player,x+', '+y+', '+z+' registered to '+id);
    accessories[id][4] = setInterval(function(){
      //checks for switch state every half second
      var jsResponse;
      // replace this link with your homebridge server ip and webhook link
      http.request('http://192.168.0.10:51828/?accessoryId='+id,function(responseCode, responseBody){
        jsResponse = JSON.parse(responseBody);
        // if switch is on...
        if (jsResponse['state'] == '1') {
          // ...and we don't need to invert the switch state...
          //                 ...then set the block at the coordinates to a redstone block
          if (accessories[id][3]) (new Drone(x,y,z,1,player.getWorld())).box(blocks.redstone);
          //                 otherwise just set it to wood
          else (new Drone(x,y,z,1,player.getWorld())).box(blocks.oak);
          // debug message
          if (accessories[id][5]) ekko(x+', '+y+', '+z+'::'+id+' set to '+accessories[id][3]);
        }
        else if (jsResponse['state'] == '0') {
          if (!accessories[id][3]) (new Drone(x,y,z,1,player.getWorld())).box(blocks.redstone);
          else (new Drone(x,y,z,1,player.getWorld())).box(blocks.oak);
          if (accessories[id][5]) ekko(x+', '+y+', '+z+'::'+id+' set to '+!accessories[id][3]);
        }
      });}, 500);
  }
  // USAGE - /jsp hk remove id
  // removes whatever link there was
  // id : the id of the homebridge switch
  else if (cmd == 'remove') {
    clearInterval(accessories[id][4]);
    accessories[id] = null;
    echo(player,id+' unregistered.');
  }
  // USAGE - /jsp hk state id
  // inverts the switch signal - as in, turning the switch off will produce a redstone signal, and vice versa
  // id : the id of the homebridge switch
  else if (cmd == 'state') {
    accessories[id][3] = !accessories[id][3];
    echo(player,id+' signal inverted.');
  }
  // USAGE - /jsp hk debug id
  // prints really annoying status update messages all the friccin time
  // id : the id of the homebridge switch
  else if (cmd == 'debug') {
    accessories[id][5] = !accessories[id][5];
    echo(player,id+' debug messages enabled.')
  }
  // echo(player,'cmd:'+cmd+' id:'+id);
});


