const path = require("path");

module.exports = function (app) {
  app.get("/code/:code", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/code.html"));
  });
};
