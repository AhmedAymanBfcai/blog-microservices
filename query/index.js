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
        id: "idj6dev5",
        title: 'post title',
        comments: [
            {id: 'idjdev', content: 'comment'}
        ]
    }
*/

app.get("/posts", (req, res) => {
  res.send(posts);
});

const handleEvent = (type, data) => {
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

  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    const comment = post.comments.find((comment) => {
      return comment.id === id;
    });

    comment.status = status;
    comment.content = content;
  }
};

// Will Receive events
app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  req.send({});
});

app.listen(8000, async () => {
  console.log("Server is up on port 8000");

  const res = await axios.get("http://localhost:7000/events");

  for (let event of res.data) {
    console.log("Processing event:", event.type);
    handleEvent(event.type, event.data);
  }
});
