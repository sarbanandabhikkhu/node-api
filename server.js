require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const proudctRoute = require("./routes/productRoute");
const errorMiddleware = require("./middleware/errorMiddleware");
var cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;
const FRONTEND = process.env.FRONTEND;

const URL =
  process.env.NODE_ENV === "development"
    ? `http://localhost:${PORT}`
    : "https://node-api-snbz.onrender.com";

var corsOptions = {
  origin: FRONTEND,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/products", proudctRoute);

app.get("/", (req, res) => {
  res.send(`Go to the <a href='${URL}/api'>/api</a> route.`);
});

app.get("/api", (req, res) => {
  res.send(`Go to the <a href='${URL}/api/products'>/products</a> route.`);
});

app.use(errorMiddleware);

mongoose.set("strictQuery", false);
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Node API server is running on ${URL}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
