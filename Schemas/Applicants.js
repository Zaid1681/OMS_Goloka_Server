const mongoose = require("mongoose");
const { Schema } = mongoose;

const ApplicantSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    resume: {
      type: String, // You can adjust the type based on how you want to store the resume data
      required: true,
    },
    portfolioLink: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
    },
    about: {
      type: String,
    },
  },
  { timestamps: true }
);

// Creating and exporting the model
const ApplicantModel = mongoose.model("applicants", ApplicantSchema);
module.exports = ApplicantModel;
