class FindUserById {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(id) {
    return await this.userRepository.findById(id);
  }
}

export default FindUserById;
