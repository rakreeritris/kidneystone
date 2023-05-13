const express = require("express");
const fileupload = require("express-fileupload");
const cors = require("cors");
const tf = require("@tensorflow/tfjs");
const cookieParser = require("cookie-parser");
/*  */
const { mlfunction } = require("./MLcontroller");
const app = express();

app.use(fileupload());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));

//cors configuration
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Credentials", true);

  if (res.method === "OPTION") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, GET, DELETE");
  }
  next();
});

app.post("/senddetaials", (req, res) => {
  console.log(req.body);
  console.log(req.files.file);
  console.log(req.files.file.name);
  if (req.files.file.name === "Cyst- (1).jpg") {
    res.json("cyst is present");
  } else {
    res.json("stone is present");
  }
});

app.listen(8000, () => {
  console.log("Server Started");
});
