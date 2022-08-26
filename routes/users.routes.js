const Validator = require("../mixins/validator.mixin");
const validationSchema = require("../validations/users.validation");
const controller = require("../controllers/user.controller");

const Router = require("express").Router();

Router.post("/signup", new Validator(validationSchema.signup).validate, controller.signup);
Router.post("/login", new Validator(validationSchema.login).validate, controller.login);

module.exports = Router;
