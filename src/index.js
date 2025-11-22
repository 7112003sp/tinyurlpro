require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");

const health = require("./routes/health");
const links = require("./routes/api/links");
const linkByCode = require("./routes/api/linkNyCode");
const stats = require("./routes/stats");
const redirect = require("./routes/redirect");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../public")));

health(app);
links(app);
linkByCode(app);
stats(app);

// Redirect MUST be last
redirect(app);

app.listen(PORT, () => console.log("Server running on " + PORT));
