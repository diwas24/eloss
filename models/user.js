var mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/elosys");
var Schema = mongoose.Schema({
  name: String,
  age: Number,
  location: String,
});
module.exports = mongoose.model("user", Schema);
