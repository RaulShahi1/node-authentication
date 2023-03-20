const express = require("express");
const mongoose = require("mongoose");

const registerRoutes = require("./routes/register");
const loginRoutes = require("./routes/login");
const auth = require("./middleware/auth");
const app = express();

app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://rahulfromnepal2013:bob@cluster0.miyty1x.mongodb.net/users?retryWrites=true&w=majority"
  )
  .then(
    app.listen(5000, (err, suc) => {
      console.log("Server running on port 5000");
    })
  )
  .catch((err) => console.log(err));

app.use("/register", registerRoutes);
app.use("/login", loginRoutes);
app.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});
