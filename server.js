const express = require("express");
const Mongoose = require("mongoose");

const app = express();

app.use(require("cors")("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// router
const usersRoutes = require("./routes/users.routes");
app.use("/api/users", usersRoutes);

app.use("*", (_req, res) => {
  res.status(200).send({ data: {}, message: "Impactall app apis works perfectly" });
});

// Global Error handler
app.use((err, _req, res) => {
  try {
    console.error(err.stack);

    res.status(500).send({ error: err });
  } catch (error) {
    res.status(500).send({ error: error });
  }
});

// Database connection
Mongoose.connect("mongodb://localhost:27017/impactall", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = Mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
  console.log("Database Connected successfully");
});

// set port, listen for requests
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
