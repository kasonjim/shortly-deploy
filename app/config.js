// use mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/shortlydb');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('Connected to mongoose!');
});

module.exports = db;




// // 1
// var asasd = {}
// module.exports.asasd = asasd;
// // 2
// module.exports.afunction = function() {};

//
// mongoose.connect('mongodb://user:pass@localhost:port/database', { config: { autoIndex: false } });
// // or
// mongoose.createConnection('mongodb://user:pass@localhost:port/database', { config: { autoIndex: false } });
// // or
// animalSchema.set('autoIndex', false);
// // or
// new Schema({..}, { autoIndex: false });





// put into models
/*var Schema = mongoose.Schema;


var userSchema = new Schema({
  username: String,
  password: String
});
var Users = mongoose.model('Users', userSchema);
module.exports.Users = Users;


var urlSchema = new Schema({
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: Number
});
var Urls = mongoose.model('Urls', urlSchema);
module.exports.Urls = Urls;
*/
