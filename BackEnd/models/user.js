const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String,trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, match: /^[a-zA-Z0-9._%+-]+@rgukt(rkv|n|ong|sklm)\.ac\.in$/  },
  password: { type: String, select: false},
});

const User = mongoose.model("User", userSchema);

module.exports = User;