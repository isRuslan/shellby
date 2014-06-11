# shellby [![Build Status](https://secure.travis-ci.org/isRuslan/shellby.png?branch=master)](http://travis-ci.org/isRuslan/shellby)

> Run single/series shell commands.

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

## Test
```sh
npm test
```

## License
Copyright (c) 2014 Ruslan Ismagilov. Licensed under the MIT license.
