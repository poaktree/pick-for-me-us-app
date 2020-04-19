# pick-for-me-us-app
**TL;DR:** A single-page, responsive Web application that picks something for you when you’re feeling especially indecisive!

This is a full stack web development project I decided to do in my spare time.

https://pick-for-me-us-app.herokuapp.com/

Basically, I designed and developed a single-page, responsive Web application that picks something for you when you’re feeling especially indecisive!

➔ For the app’s front-end, I’ve used:
* React.js (a JS library that allowed me to easily develop the app’s UI);
* React-Bootstrap (a front-end framework that made it possible for the app’s UI to easily adapt to many viewport sizes – i.e., viewports whose width is between 320 and 2560 pixels);
* SASS (a CSS preprocessor that allowed me to expand upon React-Bootstrap’s default breakpoints);
* Animista (a collection of ready-to-use CSS animations);
* Font Awesome (a collection of icons);
* axios (a Promise-based JS library that allowed the app’s front-end to make HTTP requests to its back-end);
* JSON Server (a tool that allowed me to quickly create a mock back-end capable of serving JSON data).

➔ For the app’s back-end, I’ve used:
* Node.js (a JS runtime environment that allowed me to code and run JS outside of the browser);
* Express.js (a back-end framework that allowed me to easily create an Express server, and implement common server operations such as retrieving information from the app’s MongoDB database);
* nodemon (a utility that automatically restarted the app’s Express server with every change that was made to it);
* dotenv (an NPM module that allowed me to separate the app’s code from its configurations by having said configurations load from an .env file);
* cors (an NPM module that allowed our app’s Express server to receive HTTP requests from all origins);
* body-parser (middleware capable of parsing every request’s body);
* mongoose (a JS framework that made it easier to work with MongoDB).

➔ For data persistence, I’ve used:
* MongoDB (a NoSQL database technology that allowed me to store the app’s data as JSON).
