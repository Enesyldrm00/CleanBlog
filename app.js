const exprees = require("express");
const app = exprees();

app.get("/", (req, res) => {
  const blog = {
    id: 1,
    title: "Blog title",
    description: "Blog description",
  };
  res.send(blog);
});
const server = 3000;
app.listen(server, () => {
  console.log("sunucu başladı");
});
