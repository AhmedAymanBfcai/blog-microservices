const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: commentId, content, status: "Pending.." });

  commentsByPostId[req.params.id] = comments;

  await axios.post("http:/event-bus-srv:7000/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postI: req.params.id,
      status: "Pending..",
    },
  });

  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  console.log("Received Event", req.body.type);

  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const { postId, id, status, content } = data;

    const comments = commentsByPostId[postId];

    const comment = comments.find((comment) => {
      return comment.id === id;
    });

    comment.status = status;

    await axios.post("http://event-bus-srv:7000/events", {
      type: "CommentUpdated",
      data: {
        id,
        content,
        status,
        postId,
      },
    });
  }

  res.send({});
});

app.listen(6000, () => {
  console.log("Server is up on port 6000");
});
