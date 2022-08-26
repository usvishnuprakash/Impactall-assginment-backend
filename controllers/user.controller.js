const User = require("../models/users.model");
const bcrypt = require("bcrypt");
const authenticationUtils = require("../utils/authentication.util");
module.exports = {
  async signup(req, res, next) {
    try {
      const exist = await User.countDocuments({
        userName: req.body.userName,
      });
      if (exist) {
        res.status(400).json({
          data: {},
          message: "Username already exists please use different name",
        });
        return;
      }
      const salt = await bcrypt.genSalt(10);
      const newUser = await User.create({
        userName: req.body.userName,
        password: await bcrypt.hash(req.body.password, salt),
        salt: salt,
        licenseStartDate: req.body.licenseStartDate,
        licenseEndDate: req.body.licenseEndDate,
      });
      if (!newUser) {
        res.status(500).json({
          data: {},
          message: "SOMETHING WENT WRONG PLEASE TRY AGAIN",
        });
        return;
      }
      res.status(200).json({
        data: {
          userName: newUser.userName,
        },
        message: "SUCCESSFULLY CREATED USER ACCOUNT",
      });
      return;
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async login(req, res, next) {
    try {
      const exist = await User.findOne({
        userName: req.body.userName,
      });
      if (!exist) {
        res.status(400).json({
          data: req.body,
          message: "Username not found please try with valid username",
        });
      }
      if ((await bcrypt.compare(req.body.password, exist.password)) === false) {
        res.status(400).json({
          data: req.body,
          message: "username and password not match please check",
        });
        return;
      }
      const authToken = authenticationUtils.encrypt({
        accountId: exist._id.toString(),
        userName: exist.userName,
      });
      User.updateOne(
        {
          _id: exist._id,
        },
        {
          accessToken: authToken,
        },
        {
          upsert: true,
        }
      );
      res.status(200).json({
        message: "Login successfully",
        data: {
          accessToken: authToken,
          userName: exist.userName,
        },
      });
      return;
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
