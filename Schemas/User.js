const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    userRole: {
      type: String,
      default: false,
    },
  },
  { timestamps: true }
);

// Creating and exporting the model
const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
