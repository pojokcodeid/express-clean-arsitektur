// src/infrastructure/database/MongoUserRepository.js
import UserRepository from '../../domain/repositories/UserRepository.js';

class MongoUserRepository extends UserRepository {
  async save(user) {
    // Implement logic to save user to MongoDB
    console.log('User saved to MongoDB:', user);
  }
}

export default MongoUserRepository;
