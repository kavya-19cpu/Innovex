const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.static("public"));

// ✅ HOME ROUTE (FIX for Cannot GET /)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// API route
app.get("/products", (req, res) => {
  const data = fs.readFileSync(
    path.join(__dirname, "public", "products.json"),
    "utf-8"
  );

  res.json(JSON.parse(data));
});

// PORT for Render
const PORT = process.env.PORT || 45000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});