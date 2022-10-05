// import express and path
const express = require('express');
const path = require("path");

// Initialize express app and port number
const app = express();
const port = process.env.PORT || 8080;

// Allow public directory to be accessible by the client.
app.use(express.static(path.join(__dirname, "public")));

// Send the index.html file to the client.
// app.get("/", function(req, res) {
//   res.sendFile(path.join(__dirname, "public/index.html"));
// });


// Start server.
app.listen(port);
console.log('Server started at http://localhost:' + port);