class BookRepositoryInterface {
    constructor() {
      if (!this.createBook) {
        throw new Error("BookRepositoryInterface's must have createBook() function!")
      }
    }
}

module.exports = BookRepositoryInterface
