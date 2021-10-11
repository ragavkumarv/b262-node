// express - server
// const express = require("express"); // third party package  type: commonjs
import dotenv from "dotenv";
import express from "express"; // latest syntax - type: module
// .js at end MUST
import { managerRouter } from "./routes/manager.js";
import { usersRouter } from "./routes/users.js";
const app = express();

dotenv.config();
const PORT = process.env.PORT; // Heroku will fill automatically
app.use(express.json());

app.get("/", (request, response) => {
  response.send("Hello, All :) !!!");
});

app.use("/managers", managerRouter);
app.use("/users", usersRouter);

app.listen(PORT, () => console.log("The server is started in ", PORT));

// app.get("/users", (request, response) => {
//   const { color, ageGt } = request.query;
//   console.log(request.query, color, ageGt);

//   if (!color && !ageGt) {
//     response.send(users);
//   } else if (color && !ageGt) {
//     response.send(users.filter((user) => user.color === color));
//   } else if (!color && ageGt) {
//     response.send(users.filter((user) => user.age >= ageGt));
//   } else {
//     response.send(
//       users.filter((user) => user.color === color && user.age >= ageGt)
//     );
//   }

//   // Task
//   // if no query - return all users
//   // color - only given - filter color
//   // age - only given - filter all people more than that age
//   // color & age - filter both by color & all people more than that age
//   // Install Postman
// });

//localhost:5000/users?color=yellow
// ?key=value&key1=value1&key2=value2

// parameter

// sending in json data

// ctrl + c - stop the server
// Task
// if no query - return all users
// color - only given - filter color
// age - only given - filter all people  = age
// color & age - filter both by color & all people = age
// Install Postman

// Common problems
// 1.  "start": "node index.js"
// 2.  .env,  process.env.PORT
// 3. Setting MONGO_URL
// 4. Heroku  > Deploy > Manual deploy
