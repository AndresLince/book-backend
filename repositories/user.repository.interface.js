class UserRepositoryInterface {
    constructor() {
      if (!this.getUserByEmail) {
        throw new Error("UserRepository's must have getUserByEmail() function!")
      }
    }
}

module.exports = UserRepositoryInterface