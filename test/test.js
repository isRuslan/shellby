var shellby = require('../')
  , assert = require('assert')
  , path = require('path')
  , exec = require('child_process').exec;

var dummyFile = Math.random().toString(36).substring(7) + '.txt';
var dummyDir = Math.random().toString(36).substring(7);

describe('Exec: create a file with shellby:', function () {  
  before(function (done) {
    shellby.exec('touch ' + dummyFile, function (error) {
      if (error) return done(error);
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
      if (error) return done(error);
      done();
    });
  });
});

describe('Exec with cwd set in options:', function () {  
  before(function (done) {
    shellby.exec('mkdir ' + dummyDir, function (error) {
      if (error) return done(error);
      shellby.exec('touch ' + path.join(dummyDir, dummyFile), function (error) {
        if (error) return done(error);
        done();
      });
    });
  });

  it('Should say that file exist', function() {
    var cmd = '[ -f ' + dummyFile + ' ] && echo "exist"';
    exec(cmd, {cwd: dummyDir}, function (error, stdout, stderr) {
      assert.equal(stdout, 'exist\n');
    });
  });

  after(function (done) {
    exec('rm -rf ' + dummyDir, function (error, stdout, stderr) {
      if (error) return done(error);
      done();
    });
  });
});

describe('Series: create a file and write text there:', function () {
  before(function (done) {
    shellby.series(['touch ' + dummyFile, 'echo "Dummy test" > ' + dummyFile], function (error) {
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

  it('Should say that text in file correct', function() {
    var cmd = 'cat > ' + dummyFile;
    exec(cmd, function (error, stdout, stderr) {
      assert.equal(stdout, 'Dummy text\n');
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
      assert.equal(error instanceof Error, true);
    });
  }); 
});
