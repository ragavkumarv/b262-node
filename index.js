// express - server
// const express = require("express"); // third party package  type: commonjs
import dotenv from "dotenv";
import express from "express"; // latest syntax - type: module
import { MongoClient } from "mongodb";
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

console.log(process.env);
// password - url - hide the url
async function createConnection() {
  const MONGO_URL = process.env.MONGO_URL;
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

app.get("/users/:id", async (request, response) => {
  console.log(request.params);
  //   const id = request.params.id;
  const { id } = request.params;

  const client = await createConnection();

  const user = await client
    .db("users")
    .collection("people")
    .findOne({ id: id });

  console.log(user);
  response.send(user);
});

app.delete("/users/:id", async (request, response) => {
  console.log(request.params);
  //   const id = request.params.id;
  const { id } = request.params;

  const client = await createConnection();

  const user = await client
    .db("users")
    .collection("people")
    .deleteOne({ id: id });

  console.log(user);
  response.send(user);
});

// id - identify the person,  new data (new color)
app.patch("/users/:id", async (request, response) => {
  console.log(request.params);
  //   const id = request.params.id;
  const { id } = request.params;

  const client = await createConnection();
  const newData = request.body;
  console.log(id, request.body);

  const user = await client
    .db("users")
    .collection("people")
    .updateOne({ id: id }, { $set: newData });

  console.log(user);
  response.send(user);
});

app.get("/users", async (request, response) => {
  // const { color, age } = request.query;
  const client = await createConnection();

  const users = await client
    .db("users")
    .collection("people")
    .find({})
    .toArray();

  console.log(users);

  response.send(users);
});

// Create user
app.post("/users", async (request, response) => {
  // const { color, age } = request.query;
  const client = await createConnection();
  const addUsers = request.body;

  const result = await client
    .db("users")
    .collection("people")
    .insertMany(addUsers);

  console.log(addUsers, result);

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
