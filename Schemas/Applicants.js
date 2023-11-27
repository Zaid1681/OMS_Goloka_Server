// ExcelData.js (or UserModel.js)

const mongoose = require("mongoose");

const applicantSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Gender: {
    type: String,
  },
  Role: {
    type: String,
    required: true,
  },
  Round: {
    type: String,
    default: "",
  },
  Status: {
    type: String,
    default: "New",
  },
  Contact: {
    type: Number,
    unique: true,
  },
  Resume: {
    type: String,
    default: "htpp resume link",
  },
  About: {
    type: String,
    default: "",
  },
  Remark1: {
    type: String,
    default: "",
  },
  Remark2: {
    type: String,
    default: "",
  },
});

const Applicants = mongoose.model("Applicants", applicantSchema);

module.exports = Applicants;
