import express from "express";
import {
  createConnection,
  createManager,
  genPassword,
  getManagers,
} from "../helper.js"; // .. back a folder & . current folder

// Routers - will helps organize into different files based on route
const router = express.Router();

// 1. import router
// 2. use the router (replace app with router)
// 3. export router & import in index.js (use in index.js)
// 4. replace paths

router.get("/", async (request, response) => {
  // const { color, age } = request.query;
  const client = await createConnection();
  const managers = await getManagers(client);
  response.send(managers);
});

router.post("/signup", async (request, response) => {
  // const { color, age } = request.query;
  const client = await createConnection();
  const { username, password } = request.body;

  console.log(username, password);
  const hashedPassword = await genPassword(password);

  const result = await createManager(client, username, hashedPassword);
  response.send(result);
});

export const managerRouter = router;
