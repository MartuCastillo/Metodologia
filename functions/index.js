const {onRequest} = require("firebase-functions/v2/https");

// Define your function
exports.helloWorld = onRequest((request, response) => {
  response.send("Hello from Firebase!");
});
