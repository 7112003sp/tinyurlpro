const { customAlphabet } = require("nanoid");

const nano = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  6
);

module.exports = () => nano();
