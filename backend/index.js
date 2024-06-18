require("dotenv").config();

const config = require("./config.json");
const mongoose = require("mongoose");

mongoose.connect(config.connectionString);

const User = require("./models/user.model");
const Note = require("./models/note.model");

const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");

const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

//ROUTES
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/notesRoutes");

app.use("/api/", userRoutes);
app.use("/api/", noteRoutes);


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
