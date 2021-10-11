import express from "express";
import {
  createConnection,
  createUsers,
  deleteUserById,
  getUserById,
  getUsers,
  updateUserById,
} from "../helper.js";
const router = express.Router();

// 1. import router
// 2. use the router (replace app with router)
// 3. export router & import in index.js (use in index.js)
// 4. replace paths

router.get("/", async (request, response) => {
  const client = await createConnection();
  const users = await getUsers(client);
  response.send(users);
});

router.get("/:id", async (request, response) => {
  const { id } = request.params;
  const client = await createConnection();
  const user = await getUserById(client, id);
  response.send(user);
});

// Create user
router.post("/", async (request, response) => {
  const client = await createConnection();
  const addUsers = request.body;
  const result = await createUsers(client, addUsers);
  response.send(result);
});

// id - identify the person,  new data (new color)
router.patch("/:id", async (request, response) => {
  const { id } = request.params;
  const client = await createConnection();
  const newData = request.body;
  const user = await updateUserById(client, id, newData);
  response.send(user);
});

router.delete("/:id", async (request, response) => {
  const { id } = request.params;
  const client = await createConnection();
  const user = await deleteUserById(client, id);
  response.send(user);
});

export const usersRouter = router;
