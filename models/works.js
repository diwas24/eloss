var mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/elosys");
var workSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  rep: {
    // required: true,
  },
  level: {},
  description: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("works", workSchema);
