const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const events = [];

app.post("/events", (req, res) => {
  const event = req.body;

  events.push(event);

  axios.post("http://posts-clusterip-srv:4000/events", event);
  // axios.post("http://localhost:4000/events", event);
  // axios.post("http://localhost:6000/events", event);
  // axios.post("http://localhost:6000/events", event);

  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(7000, (req, res) => {
  console.log("Event bust listneing on port 7000");
});
