const mongoose = require("mongoose");
const { Schema } = mongoose;

const ApplicantSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    Team: {
        type: String,
        enum: ["HrTeam"],
        default: "HrTeam", // Set the default value here
        required: true,
      },
    contactNo: {
    type: String,
    required: true,
    },
  },
  { timestamps: true }
);

// Creating and exporting the model
const ApplicantModel = mongoose.model("MarketingTeam", ApplicantSchema);
module.exports = ApplicantModel;
