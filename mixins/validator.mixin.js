const FastestValidator = require("fastest-validator");
const V = new FastestValidator();

function Validator(schema = {}) {
  this.schema = schema;
  this.validate = (req, res, next) => {
    const check = V.compile(this.schema);
    const result = check(req.body);
    if (result === true) {
      next();
    } else {
      res.status(422).json(result);
    }
  };
}
module.exports = Validator;
