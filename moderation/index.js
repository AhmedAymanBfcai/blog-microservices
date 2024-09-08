const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.post("/events", async (req, res) => {});

app.listen(9000, () => {
  console.log("Server is up on port 9000");
});
