const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

// const mds = ['md1', 'md2', 'md3'];

app.get("/api/md", (req, res) => {
  const md = fs.readFileSync(
    path.resolve(__dirname, "./docs/README.md"),
    "UTF-8"
  );
  res.json(md);
});

app.get("/", (req, res) => {
  res.send("hello owrd server");
});

app.listen(3000);
