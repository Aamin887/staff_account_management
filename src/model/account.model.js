const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    firstName: {
      type: String,
      required: [true, "Please enter a firstname value"],
    },
    middleName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      required: [true, "Please enter a lastname value"],
    },
    department: {
      type: String,
      required: [true, "Please enter a department"],
    },
    employmentStatus: {
      type: String,
      required: [true, "Please enter an employment"],
    },
    staffId: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "pending",
    },
    updates: {
      type: [String],
    },
    password: {
      type: String,
      required: [true, "Please enter a password value"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Account", userSchema);
