class ReadedBookRepositoryInterface {
    constructor() {
      if (!this.searchReadedBook) {
        throw new Error("ReadedBookRepositoryInterface's must have searchReadedBook() function!")
      }
    }
}

module.exports = ReadedBookRepositoryInterface