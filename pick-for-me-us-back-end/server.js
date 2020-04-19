// 1 - Setting things up

// Imports the 'express' module that belongs to the 'Express' library.
const express = require('express');

// Creates an 'Express' server through the 'express' module's 'express()' function.
const server = express();

// Loads our '.env' file's contents (i.e., environment variables) into 'process.env'.
require('dotenv').config();

// The port where our server will be listening for requests.
const PORT = process.env.PORT;

/* If we want our server to be able to handle requests from other origins (i.e., different URLs),
we need it to use the 'cors' middleware. For example, our app's front-end runs on 'http://localhost:3000/',
whereas its back-end runs on 'http://localhost:3001/' - with the 'cors' middleware, it becomes possible for
our app's front-end to ask for data that's located on its back-end. */
const cors = require('cors');

// This tells the server to accept requests from any origin.
server.use(cors());

// Imports the 'body-parser' library.
const parserOfRequestBody = require('body-parser');

/* This tells the server to use the 'body-parser' library to do two things:
1) turn the body of all 'POST' requests it receives into a JavaScript object.
2) attach that JavaScript object to the 'body' property of the 'request' object
before any of the requests' event handlers are called.
If we don't do this, the 'body' property of the 'request' object will be nothing but 'undefined'. */
server.use(parserOfRequestBody.json());

// 2 - Stuff related to our 'MongoDB' database

// Imports our 'Choice' model.
const Choice = require('./database/database.js');

// 3 - How our 'Express' server should handle requests

// 'GET' (i.e., 'retrieve') requests

/* When a 'GET' request is made to '.../' or '.../index.html', our 'Express' server
searches for the 'index.html' file in this 'Node' project's 'build' folder. */
server.use(express.static('build'));

/* When a 'GET' request is made to '.../fiveLatestChoicesMade', our 'Express' server
responds with the five latest choices that have been made (in JSON format). */
server.get('/fiveLatestChoicesMade', (request, response) => {
  console.log("\nA 'GET' request has been made.");

  // We try to retrieve the five latest choices that have been made (and thus saved on our 'MongoDB' database).
  Choice.find({})
    .then((retrievedData) => {
      console.log(retrievedData.length, "records (i.e., 'choices') were retrieved from our 'MongoDB' database.\n");

      // Will hold the five latest choices that have been made (and thus saved on our 'MongoDB' database).
      const fiveLatestChoicesMade = retrievedData.slice(retrievedData.length - 5).reverse();

      console.log('These are the five latest choices that have been made:');
      console.log(fiveLatestChoicesMade);

      console.log("\nThis is the data that will be sent as a response to this 'GET' request (i.e., the five latest choices that have been made):");
      console.log(fiveLatestChoicesMade);

      response.json(fiveLatestChoicesMade);
    })
    .catch((error) => {
      console.log('An error occurred:');
      console.log(error.message);
    });
});

// 'POST' (i.e., 'send') requests

/* When a 'POST' request is made to '.../saveChoiceMade', our 'Express' server takes care of
1) adding a new 'choice that was made' to our 'MongoDB' database's set of 'all choices that have been made'
2) responding with the newly added 'choice that was made' (in JSON format). */
server.post('/saveChoiceMade', (request, response) => {
  const bodyOfPostRequest = request.body;

  console.log("\nA 'POST' request has been made. The body of this 'POST' request contains the following data:");
  console.log(bodyOfPostRequest);

  if (Object.keys(bodyOfPostRequest).length === 0) {
    return response.status(400).json({ error: "No data was provided." });
  }

  const newChoiceMade = new Choice({
    allChoices: request.body.allChoices,
    pickedChoice: request.body.pickedChoice
  });

  console.log("\nThe following record (i.e., 'choice made') will be added to our 'MongoDB' database:");
  console.log(request.body);

  newChoiceMade.save()
    .then((addedRecord) => {
      console.log("\nThe record displayed above has been added to our 'MongoDB' database.");

      response.json(addedRecord);
    })
    .catch((error) => {
      console.log("\nThe record displayed above could not be be added to our 'MongoDB' database.", error.message);

      response.status(400).send("Sorry, but the choice that was made could not be be added to our 'MongoDB' database.");
    });
});

// 4 - Telling the server to 'listen' for requests

server.listen(PORT, () => {
  console.log("Our 'Express' server is running, and listening for requests made to port '" + PORT + "'.");
});