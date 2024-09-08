const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};
/*
    posts === {
        id: "idjdev",
        title: 'post title',
        comments: [
            {id: 'idjdev', content: 'comment'}
        ]
    }
*/

app.get("/posts", (req, res) => {
  res.send(posts);
});

// Will Receive events
app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "PostCreated") {
    posts[id] = {
      id,
      title,
      comments: [],
    };
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;

    const post = posts[postId];

    post.comments.push({ id, content, status });
  }

  req.send({});
});

app.listen(8000, () => {
  console.log("Server is up on port 8000");
});
