const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String,trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String,},
});

const User = mongoose.model("User", userSchema);

module.exports = User;