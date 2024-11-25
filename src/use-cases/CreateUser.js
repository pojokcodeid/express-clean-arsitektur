// src/use-cases/CreateUser.js
import User from '../domain/entities/User.js';

class CreateUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(name, email) {
    const newUser = new User(null, name, email);
    await this.userRepository.save(newUser);
    return newUser;
  }
}

export default CreateUser;
