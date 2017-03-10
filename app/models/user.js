var mongoose = require('mongoose');
var Promise = require('bluebird');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
  username: { type: String, index: { unique: true } },
  password: String
});
var User = mongoose.model('User', userSchema);

User.prototype.comparePassword = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
    console.log('isMatch? ', isMatch);
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

userSchema.pre('save', function(next) {
  var cipher = Promise.promisify(bcrypt.hash);
  console.log('new user password: ', this.password);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
      next();
    });
});

module.exports = User;



// var mongoose = require('mongoose');
// var bcrypt = require('bcrypt-nodejs');
// var Promise = require('bluebird');

// var userSchema = new mongoose.Schema({
//   username: { type: String, required: true, index: { unique: true } },
//   password: { type: String, required: true }
// });

// var User = mongoose.model('User', userSchema);

// User.comparePassword = function(candidatePassword, savedPassword, cb) {
//   bcrypt.compare(candidatePassword, savedPassword, function(err, isMatch) {
//     if (err) { return cb(err); }
//     cb(null, isMatch);
//   });
// };

// userSchema.pre('save', function(next) {
//   var cipher = Promise.promisify(bcrypt.hash);
//   return cipher(this.password, null, null).bind(this)
//     .then(function(hash) {
//       this.password = hash;
//       next();
//     });
// });

// module.exports = User;
