require("dotenv").config();
const express = require("express");
const app = express();
const routes = require("./routes/routes");
const mongoose = require("mongoose");

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});
app.use("/api/taskmanager/", routes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.port || process.env.PORT, () => {
      console.log("Server is running on port 4000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
