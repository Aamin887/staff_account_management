const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Please enter a username"],
      unique: true,
    },
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    firstNames: {
      type: String,
      required: [true, "Please enter a firstnames"],
    },
    lastName: {
      type: String,
      required: [true, "Please enter a lastname"],
    },
    department: {
      type: String,
      required: [true, "Please enter a department"],
    },
    employmentStatus: {
      type: String,
      required: [true, "Please enter a employment status"],
    },
    staffId: {
      type: String,
      required: [true, "Please enter a staff ID"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please enter an email"],
    },
    password: {
      type: String,
      minLength: 8,
      required: [true, "Please enter a password"],
    },
    refreshToken: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
