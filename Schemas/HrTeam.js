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
        enum: ["MarketingTeam"],
        default: "MarketingTeam", // Set the default value here
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
const ApplicantModel = mongoose.model("Hrteam", ApplicantSchema);
module.exports = ApplicantModel;
