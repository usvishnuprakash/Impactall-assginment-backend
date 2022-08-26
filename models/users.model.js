const Mongoose = require("mongoose");

const UsersSchema = new Mongoose.Schema(
  {
    userName: {
      type: String,
      trim: true,
      index: true,
      unique: true,
      sparse: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
      required: true,
    },
    licenseStartDate: {
      type: Date,
      required: true,
    },
    licenseEndDate: {
      type: Date,
      required: true,
    },
    accessToken: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = Mongoose.model("Users", UsersSchema);
