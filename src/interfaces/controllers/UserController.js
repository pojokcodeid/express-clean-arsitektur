import express from "express";
import CreateUser from "../../use-cases/CreateUser.js";
import MongoUserRepository from "../../infrastructure/database/MongoUserRepository.js";
import UpdateUser from "../../use-cases/UpdateUser.js";
import FindUserById from "../../use-cases/FindUserById.js";
import DeleteUser from "../../use-cases/DeleteUser.js";

const router = express.Router();
const userRepository = new MongoUserRepository();

router.post("/", async (req, res) => {
  const { name, email } = req.body;
  try {
    const createUser = new CreateUser(userRepository);
    const user = await createUser.execute({ name, email });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const updateUser = new UpdateUser(userRepository);
    const user = await updateUser.execute(id, { name, email });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const findUserById = new FindUserById(userRepository);
    const user = await findUserById.execute(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUser = new DeleteUser(userRepository);
    const user = await deleteUser.execute(id);
    if (user) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
