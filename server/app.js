const express = require('express');
const uglify = require('uglify-js');
const crush = require('jscrush');
const fs = require('fs');
const { resolve } = require('path');

const CODE_PATH = resolve(__dirname, '..', 'submission.js');

function getCode(callback) {
  fs.readFile(CODE_PATH, 'utf8', callback);
}

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', resolve(__dirname, 'views'));

app.use(function(req, res, next) {
  getCode(function(err, code) {
    if (err) {
      next(err);
    } else {
      res.code = code;
      next();
    }
  });
});

app.get('/', function(req, res) {
  res.redirect('/dev');
});

app.get('/dev', function(req, res) {
  res.render('shim', { code: res.code });
});

app.get('/prod', function(req, res) {
  let code = res.code;
  try {
    const minified = uglify.minify(res.code, { fromString: true });
    const crushed = crush(minified.code);
    if (minified.code.length < crushed.length) {
      code = minified.code;
    } else {
      code = crushed;
    }
  } catch (_error) {
    code = 'console.error("Error minifying code.");\n' + code;
  }
  res.render('shim', { code });
});

app.use(function(req, res) {
  res.set('Content-Type', 'text/plain');
  res.status(404);
  res.send('Visit /dev or /prod');
});

app.listen(app.get('port'), function() {
  return console.log('App started on port ' + app.get('port'));
});
