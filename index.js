// import express and path
const express = require('express');
const path = require("path");

// Initialize express app and port number
const server = express();
const port = 8080;

// Allow public directory to be accessible by the client.
server.use(express.static(path.join(__dirname, "public")));

server.get("/", function(_, res) {
  res.sendFile(__dirname + "/public/pages/index.html");
});
server.get("/claimed/", function(_, res) {
  res.sendFile(__dirname + "/public/pages/claimed.html");
});


// Start server.
server.listen(port, () => {
    console.log('Server started at http://localhost:' + port);
});