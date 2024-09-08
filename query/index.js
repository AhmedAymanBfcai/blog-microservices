const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/posts", (req, res) => {
  res.send(posts);
});

// Will Receive events
app.post("/events", async (req, res) => {});

app.listen(8000, () => {
  console.log("Server is up on port 8000");
});
