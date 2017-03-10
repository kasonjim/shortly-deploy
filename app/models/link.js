var mongoose = require('mongoose');
var crypto = require('crypto');

var linkSchema = mongoose.Schema({
  url: String,
  link: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: Number
});
var Link = mongoose.model('Link', linkSchema);

linkSchema.pre('save', function(next) {
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  this.code = shasum.digest('hex').slice(0, 5);
  next();
});

module.exports = Link;


// var db = require('../config');
// var crypto = require('crypto');
// var mongoose = require('mongoose');

// var linkSchema = new mongoose.Schema({
//   visits: Number,
//   link: String,
//   title: String,
//   code: String,
//   baseUrl: String,
//   url: String
// });

// var Link = mongoose.model('Link', linkSchema);

// var createSha = function(url) {
//   var shasum = crypto.createHash('sha1');
//   shasum.update(url);
//   return shasum.digest('hex').slice(0, 5);
// };

// linkSchema.pre('save', function(next) {
//   var code = createSha(this.url);
//   this.code = code;
//   next();
// });

module.exports = Link;

// visits, url, title, baseUrl, code
