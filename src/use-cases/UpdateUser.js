class UpdateUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(id, data) {
    const { name, email } = data;
    // Validasi atau logika bisnis lainnya dapat ditambahkan di sini
    const user = { name, email };
    return await this.userRepository.update(id, user);
  }
}

export default UpdateUser;
