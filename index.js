// express - server
// const express = require("express"); // third party package  type: commonjs
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import express from "express"; // latest syntax - type: module
import { MongoClient } from "mongodb";
import {
  createManager,
  createUsers,
  deleteUserById,
  getManagers,
  getUserById,
  getUsers,
  updateUserById,
} from "./helper.js";
// .js at end MUST
const app = express();

dotenv.config();
const PORT = process.env.PORT; // Heroku will fill automatically

// Tell express what format data you are going to get - json, xml, text
// middleware - gatekeeper
// all the request - body - will be converted to JSON
app.use(express.json());
// express.json() - inbuilt middleware
// 3rd party, custom middleware

// Heroku does not have dotenv - file
// MONGO_URL - settings

// console.log(process.env);
// password - url - hide the url
async function createConnection() {
  const MONGO_URL = "mongodb://localhost/users";
  // const MONGO_URL = process.env.MONGO_URL;
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Successfully connected!!!");
  return client;
}

// C - Create - post
// R - Read - get
// U - Update - put/patch
// D - Delete - delete

app.get("/", (request, response) => {
  response.send("Hello, All :) !!!");
});

async function genPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

app.post("/manager/signup", async (request, response) => {
  // const { color, age } = request.query;
  const client = await createConnection();
  const { username, password } = request.body;

  console.log(username, password);
  const hashedPassword = await genPassword(password);

  const result = await createManager(client, username, hashedPassword);
  response.send(result);
});

app.get("/managers", async (request, response) => {
  // const { color, age } = request.query;
  const client = await createConnection();
  const managers = await getManagers(client);
  response.send(managers);
});

app.get("/users/:id", async (request, response) => {
  const { id } = request.params;
  const client = await createConnection();
  const user = await getUserById(client, id);
  response.send(user);
});

app.delete("/users/:id", async (request, response) => {
  const { id } = request.params;
  const client = await createConnection();
  const user = await deleteUserById(client, id);
  response.send(user);
});

// id - identify the person,  new data (new color)
app.patch("/users/:id", async (request, response) => {
  const { id } = request.params;
  const client = await createConnection();
  const newData = request.body;
  const user = await updateUserById(client, id, newData);
  response.send(user);
});

app.get("/users", async (request, response) => {
  const client = await createConnection();
  const users = await getUsers(client);
  response.send(users);
});

// Create user
app.post("/users", async (request, response) => {
  const client = await createConnection();
  const addUsers = request.body;
  const result = await createUsers(client, addUsers);
  response.send(result);
});

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
