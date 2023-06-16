// ALL REQUIRES:
const express = require("express");
const path = require("path");
var exphbs = require("express-handlebars");
var multer = require("multer");
var mongoose = require("mongoose");
require("dotenv").config();

// Handlers
var upload = multer();
var app = express();
const port = 3000;

// DATABASE HANDLING
mongoose.connect("mongodb://127.0.0.1/elosys");
const db = mongoose.connection;
db.on("error", (e) => {
  console.log(e);
});
db.once("open", () => console.log("Connected to MongoDB"));

// ENGINE HANDLING
app.engine(".hbs", exphbs.engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");
const hbs = exphbs.create({
  partialsDir: ["views/partials"],
});
app.engine("handlebars", hbs.engine);

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.array());
app.use(express.static(path.join(__dirname, "public")));

// PROTECTED ROUTES
// AUTH Handler
// PRIVATE ROUTES

// PUBLIC ROUTES
app.use("/", require(process.env.ROUTES));

// LISTEN
app.listen(port, (a) => {
  console.log(`Server: http://localhost:${port}`);
});
