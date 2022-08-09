class AuthorRepositoryInterface {
    constructor() {
      if (!this.createAuthor) {
        throw new Error("AuthorRepositoryInterface's must have createBook() function!")
      }
    }
}

module.exports = AuthorRepositoryInterface
