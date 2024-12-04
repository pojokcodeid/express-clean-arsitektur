import express from 'express';
import CreateUser from '../../use-cases/CreateUser.js';
import MongoUserRepository from '../../infrastructure/database/MongoUserRepository.js';
import UpdateUser from '../../use-cases/UpdateUser.js';
import FindUserById from '../../use-cases/FindUserById.js';
import DeleteUser from '../../use-cases/DeleteUser.js';
import userSchema from '../validators/userValidator.js';
import logger from '../../config/logger.js';

const router = express.Router();
const userRepository = new MongoUserRepository();

router.post('/', async (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    logger.error(`Validation error: ${error.details[0].message}`);
    return res.status(400).json({ error: error.details[0].message });
  }

  const { name, email } = req.body;
  try {
    const createUser = new CreateUser(userRepository);
    const user = await createUser.execute({ name, email });
    logger.info(`User created: ${user.id}`);
    res.status(201).json(user);
  } catch (error) {
    logger.error(`Error creating user: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    logger.error(`Validation error: ${error.details[0].message}`);
    return res.status(400).json({ error: error.details[0].message });
  }

  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const updateUser = new UpdateUser(userRepository);
    const user = await updateUser.execute(id, { name, email });
    if (user) {
      logger.info(`User updated: ${user.id}`);
      res.status(200).json(user);
    } else {
      logger.warn(`User not found: ${id}`);
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    logger.error(`Error updating user: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const findUserById = new FindUserById(userRepository);
    const user = await findUserById.execute(id);
    if (user) {
      logger.info(`User fetched: ${user.id}`);
      res.status(200).json(user);
    } else {
      logger.warn(`User not found: ${id}`);
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    logger.error(`Error fetching user: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUser = new DeleteUser(userRepository);
    const user = await deleteUser.execute(id);
    if (user) {
      logger.info(`User deleted: ${user.id}`);
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      logger.warn(`User not found: ${id}`);
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    logger.error(`Error deleting user: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
});

export default router;
