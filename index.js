'use strict';
/**
 * Shellby - shell commands runner.
 */

/**
 * Module dependencies
 */
var spawn = require('child_process').spawn;

function exec (cmd, opts, cb) {
  if (typeof opts ===  'function') {
    cb = opts;
    opts = { stdio: 'inherit' };
  }
  var parts = cmd.split(/\s+/g)
    , p = spawn( parts[0], parts.slice(1), [], opts );
  
  p.on('error', function (err) {
    if (cb) cb(err);
  });
  
  p.on('exit', function(code){
    var err = null;
    if (code) {
      err = new Error('command %s exited with wrong status code %s', cmd, code);
      err.code = code;
      err.cmd = cmd;
    }
    if (cb) cb(err);
  });

}

function series (cmds, cb) {
  cb = cb || function () {};
  
  var next = function(){
    exec(cmds.shift(), function(err){
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
