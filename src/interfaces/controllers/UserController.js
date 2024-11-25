// src/interfaces/controllers/UserController.js
import CreateUser from '../../use-cases/CreateUser.js';
import MongoUserRepository from '../../infrastructure/database/MongoUserRepository.js';

class UserController {
  static async createUser(req, res) {
    const { name, email } = req.body;
    const userRepository = new MongoUserRepository();
    const createUser = new CreateUser(userRepository);
    const newUser = await createUser.execute(name, email);
    res.status(201).json(newUser);
  }
}

export default UserController;
