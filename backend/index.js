const express = require("express");
const service = require('./service');
const app = express();

app.get("/bin", (req, res) => {
  res.send(service.getBins());
});

app.post("/bin", (req, res) => {
  res.send(service.setBins());
});

app.listen(1337, () => {
  console.log("Example app listening on port 1337!");
});
