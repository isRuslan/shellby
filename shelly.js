/*! poly v0.1.0 - MIT license */

'use strict';

/**
 * Module dependencies
 */
var child_process = require('child_process');

/**
 * @param {}
 * @return {}
 */
function exec (cmd, cb) {
  var parts = cmd.split(/\s+/g);
  var p = child_process.spawn(parts[0], parts.slice(1), {stdio: 'inherit'});
  p.on('exit', function(code){
    var err = null;
    if (code) {
      err = new Error('command "'+ cmd +'" exited with wrong status code "'+ code +'"');
      err.code = code;
      err.cmd = cmd;
    }
    if (cb) cb(err);
  });
}

function series (cmds, cb) {
  var execNext = function(){
    exports.exec(cmds.shift(), function(err){
      if (err) {
        cb(err);
      } else {
        if
          (cmds.length) execNext();
        else
          cb(null);
      }
    });
  };
  execNext();  
}

/**
 * Module exports
 */
module.exports = {
  exec: exec,
  series: series
};
