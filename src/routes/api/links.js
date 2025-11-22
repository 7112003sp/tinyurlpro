const db = require("../../db");
const { isValidCode, isValidUrl } = require("../../../utils/validate");
const generateCode = require("../../../utils/eneratecode");


module.exports = function (app) {
  app.get("/api/links", async (req, res) => {
    const r = await db.query(
      `SELECT code, target_url AS "targetUrl", clicks, last_clicked_at AS "lastClickedAt", created_at AS "createdAt" FROM links ORDER BY created_at DESC`
    );
    res.json(r.rows);
  });

  app.post("/api/links", async (req, res) => {
    const { targetUrl, code: customCode } = req.body;

    if (!isValidUrl(targetUrl))
      return res.status(400).json({ error: "Invalid URL" });

    let code = customCode;

    if (code) {
      if (!isValidCode(code))
        return res.status(400).json({ error: "Invalid code format" });

      const exists = await db.query("SELECT 1 FROM links WHERE code=$1", [
        code,
      ]);
      if (exists.rowCount)
        return res.status(409).json({ error: "Code already exists" });
    } else {
      code = generateCode();
    }

    await db.query(
      "INSERT INTO links (code, target_url) VALUES ($1, $2)",
      [code, targetUrl]
    );

    res.status(201).json({
      code,
      targetUrl,
      clicks: 0,
      lastClickedAt: null,
    });
  });
};
