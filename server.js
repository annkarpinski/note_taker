// import dependencies
const express = require("express");

// create am express server
const app = express();

// define port where server will listen in prod or locally
const PORT = process.env.PORT || 3000;

// add middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//needed to look into Public folder for static CSS and JS
app.use(express.static("public"));

const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");
app.use(apiRoutes);
app.use(htmlRoutes);

// start the server
app.listen(PORT, function () {
  console.log("server is listening on http://localhost:" + PORT);
});
