var shellby = require('../')
  , assert = require('assert')
  , exec = require('child_process').exec;

describe('Test by file creation:', function() {
  var captured_stdout = ''
    , dummyFile = Math.random().toString(36).substring(7) + '.txt';

  before(function (done) {
    exec('touch ' + dummyFile, function (error, stdout, stderr) {
      if (error) done(error);
      done();
    });
  });

  it('Should say that ' + dummyFile + ' file exist', function() {
    var cmd = '[ -f ' + dummyFile + ' ] && echo "exist"';
    exec(cmd, function (error, stdout, stderr) {
      if (error) done(error);
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