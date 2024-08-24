const express = require("express");
const app = express();

app.use("/api/posts", (req, res, next) => {
  const posts = [
    {
      id: "dfgdsfg",
      title: "coming from srver",
      content: "Dummy post from server",
    },
  ];
  res.json({
    message: "post fetch successfully",
  });
});

module.exports = app;
