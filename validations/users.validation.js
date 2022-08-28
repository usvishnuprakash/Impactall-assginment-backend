module.exports = {
  signup: {
    userName: {
      type: "string",
      trim: true,
      min: 3,
    },
    password: {
      type: "string",

      trim: true,
      min: 6,
    },
    licenseStartDate: {
      type: "date",
      convert: true,
    },
    licenseEndDate: {
      type: "date",
      convert: true,
    },
  },
  login: {
    userName: {
      type: "string",
      trim: true,
      min: 3,
    },
    password: {
      type: "string",

      trim: true,
      min: 6,
    },
  },
};
