const express = require("express");
const service = require("./service");
const app = express();

app
  .get("/bins", (req, res) => {
    res.status(200).json(service.getBins());
  })
  .post("/bin", (req, res) => {
    res.status(200).json(service.setBins());
  })
  .listen(1337, () => {
    console.log("Example app listening on port 1337!");
  });
