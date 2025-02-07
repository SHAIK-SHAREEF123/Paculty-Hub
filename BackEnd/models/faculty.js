const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const facultySchema = new Schema({
  name: { type: String },
  image: { type: String, default: "" },
  email: { type: String, default: "" },
});

const departmentSchema = new Schema({
  departmentName: { type: String },
  faculty: [facultySchema], // Array of faculty members
});

const Department = mongoose.model("Department", departmentSchema);

module.exports = Department;
