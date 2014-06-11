var shellby = require('../')
  , assert = require('assert')
  , exec = require('child_process').exec;

var dummyFile = Math.random().toString(36).substring(7) + '.txt';

describe('Create ' + dummyFile + ' with shellby:', function () {
  var captured_stdout;

  before(function (done) {
  	shellby.exec('touch ' + dummyFile, function (error) {
  		if (error) done(error);
  		done();
  	});
  });

  it('Should say that file exist', function() {
    var cmd = '[ -f ' + dummyFile + ' ] && echo "exist"';
    exec(cmd, function (error, stdout, stderr) {
      assert.equal(stdout, 'exist\n');
    });
  });


  after(function (done) {
  	exec('rm -rf ' + dummyFile, function (error, stdout, stderr) {
      if (error) done(error);
      done();
    });
  });
});

describe('Dummy command', function () {
  it('Should throw error', function () {    
    shellby.exec('asasas', function (error) {
    	assert.equal(/spawn ENOENT/.test(error), true);
    });
  });	
});