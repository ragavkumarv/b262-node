async function getUsers(client) {
  return await client.db("users").collection("people").find({}).toArray();
}

async function createUsers(client, addUsers) {
  return await client.db("users").collection("people").insertMany(addUsers);
}

async function updateUserById(client, id, newData) {
  return await client
    .db("users")
    .collection("people")
    .updateOne({ id: id }, { $set: newData });
}

async function deleteUserById(client, id) {
  return await client.db("users").collection("people").deleteOne({ id: id });
}

async function getUserById(client, id) {
  return await client.db("users").collection("people").findOne({ id: id });
}

async function createManager(client, username, hashedPassword) {
  return await client
    .db("users")
    .collection("managers")
    .insertOne({ username: username, password: hashedPassword });
}

async function getManagers(client) {
  return await client.db("users").collection("managers").find({}).toArray();
}

// 1st inline export
// 1000 lines - 2nd way export
export {
  createManager,
  createUsers,
  deleteUserById,
  getManagers,
  getUserById,
  getUsers,
  updateUserById,
};
