import mongoose from "mongoose";
import User from "../../domain/entities/User.js";
import UserRepository from "../../domain/repositories/UserRepository.js";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const UserModel = mongoose.model("User", userSchema);

class MongoUserRepository extends UserRepository {
  async create(user) {
    const newUser = new UserModel(user);
    const savedUser = await newUser.save();
    return new User(savedUser.id, savedUser.name, savedUser.email);
  }

  async findById(id) {
    const user = await UserModel.findById(id);
    if (user) {
      return new User(user.id, user.name, user.email);
    }
    return null;
  }

  async update(id, user) {
    const updatedUser = await UserModel.findByIdAndUpdate(id, user, {
      new: true,
    });
    if (updatedUser) {
      return new User(updatedUser.id, updatedUser.name, updatedUser.email);
    }
    return null;
  }

  async delete(id) {
    const user = await UserModel.findByIdAndDelete(id);
    if (user) {
      return new User(user.id, user.name, user.email);
    }
    return null;
  }
}

export default MongoUserRepository;
