const CryptoJS = require("crypto-js");
require("dotenv").config();
module.exports = {
  encrypt(payload = {}) {
    if (!Object.keys(payload)[0]) {
      throw new Error("REQUESTED DATA NOT HAVE KEY SO REJECTED");
    }
    payload.createdAt = new Date();
    payload.count = 1;
    payload = JSON.stringify(payload);
    return CryptoJS.AES.encrypt(payload, process.env.AUTHENTICATION_SECRET_KEY).toString();
  },
  decrypt(ciphertext) {
    const bytes = CryptoJS.AES.decrypt(ciphertext, process.env.AUTHENTICATION_SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  },
};
