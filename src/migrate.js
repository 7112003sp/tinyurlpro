const fs = require("fs");
const path = require("path");
require("dotenv").config();
const db = require("./db");

async function run() {
  const sql = fs.readFileSync(
    path.join(__dirname, "../migrations/001_create_links.sql"),
    "utf8"
  );

  await db.query(sql);
  console.log("Migration complete");
  process.exit(0);
}

run();
