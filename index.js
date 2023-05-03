const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

// cors
const cors = require("cors");
app.use(cors);

// import body parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// import route post
const postRouter = require("./routes/posts");
app.use("/api/posts", postRouter);

app.listen(port, () => {
  console.log(`app running at http://localhost:${port}`);
});
