# shellby [![Build Status](https://secure.travis-ci.org/isRuslan/shellby.png?branch=master)](http://travis-ci.org/isRuslan/shellby)

> Run single/series shell commands from node.js.

## Install
```sh
$ npm install shellby --save
```

## Usage

```javascript
var shellby = require('shellby');

shellby.exec('mkdir hello', function (err) {
  console.log('dir created');
});

shellby.series(['git pull', 'npm i'], function (err) {
  console.log('done');
});
```

## Options

You can specify an options object for each command. (see [NodeJS documentation on `spawn`](https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options) for what options are supported.

```javascript
var shellby = require('shellby');

shellby.exec('make', {env: {DEBUG: true}}, function (err) {
  console.log('make run');
});

shellby.series([
  'git clone https://github.com/foo/bar.git',  
  ['npm i', {cwd: 'bar'}]
], function (err) {
  console.log('done');
});
```

## Test
```sh
npm test
```

## License
Copyright (c) 2014 Ruslan Ismagilov. Licensed under the MIT license.
