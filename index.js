'use strict';
/**
 * Shellby - shell commands runner.
 */

/**
 * Module dependencies
 */
var spawn = require('child_process').spawn;
var util = require('util');

function exec (cmd, opts, cb) {
  if (typeof opts ===  'function') {
    cb = opts;
    opts = { stdio: 'inherit' };
  }
  var parts = cmd.split(/\s+/g)
    , p = spawn( parts[0], parts.slice(1), opts );
  
  p.on('error', function (err) {
    if (cb) cb(err);
  });
  
  p.on('exit', function(code){
    var err = null;
    if (code) {
      err = new Error(util.format('command %s exited with wrong status code %s', cmd, code));
      err.code = code;
      err.cmd = cmd;
    }
    if (cb) cb(err);
  });

}

function series (cmds, cb) {
  cb = cb || function () {};
  
  var next = function(){
    var cmd = cmds.shift();
    var opts;
    if (typeof cmd === 'string') {
      opts = { stdio: 'inherit' };
    } else if (cmd.length === 2) {
      opts = cmd[1];
      cmd = cmd[0];
    } else throw new TypeError('invalid entry in command list');
    exec(cmd, opts, function(err){
      if (err) return cb(err);
      cmds.length
        ? next()
        : cb(null);
    });
  };
  next();  
}

/**
 * Module exports
 */
module.exports = {
  exec: exec,
  series: series
};
