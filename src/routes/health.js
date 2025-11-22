module.exports = function (app) {
  app.get("/healthz", (req, res) => {
    res.json({ ok: true, version: "1.0" });
  });
};
