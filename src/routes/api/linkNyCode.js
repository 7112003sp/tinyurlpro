const db = require("../../db");

module.exports = function (app) {
  app.get("/api/links/:code", async (req, res) => {
    const { code } = req.params;

    const r = await db.query(
      `SELECT code, target_url AS "targetUrl", clicks, last_clicked_at AS "lastClickedAt", created_at AS "createdAt" FROM links WHERE code=$1`,
      [code]
    );

    if (!r.rowCount) return res.status(404).json({ error: "Not found" });

    res.json(r.rows[0]);
  });

  app.delete("/api/links/:code", async (req, res) => {
    const { code } = req.params;
    const r = await db.query("DELETE FROM links WHERE code=$1", [code]);

    if (!r.rowCount) return res.status(404).json({ error: "Not found" });

    res.json({ ok: true });
  });
};
