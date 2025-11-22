const db = require("../db");
const { isValidCode } = require("../../utils/validate");

module.exports = function (app) {
  app.get("/:code", async (req, res) => {
    const { code } = req.params;

    if (!isValidCode(code)) return res.status(404).send("Not found");

    const r = await db.query("SELECT target_url FROM links WHERE code=$1", [
      code,
    ]);

    if (!r.rowCount) return res.status(404).send("Not found");

    await db.query(
      "UPDATE links SET clicks = clicks + 1, last_clicked_at = now() WHERE code=$1",
      [code]
    );

    res.redirect(302, r.rows[0].target_url);
  });
};
