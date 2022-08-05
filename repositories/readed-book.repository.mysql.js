const  ReadedBookRepositoryInterface = require('./readed-book.repository.interface');

class ReadedBookRepositoryMysql extends ReadedBookRepositoryInterface {
    constructor({ databaseHandler }) {
        super()
        this.databaseHandler = databaseHandler
        this.searchReadedBook = this.searchReadedBook.bind(this)
    }
    async searchReadedBook(arrayParameters) {
        const sql = `call searchReadedBook(?, ?);`
        return this.databaseHandler.getPool().query(sql, arrayParameters)
    }
    async createReadedBook(arrayParameters) {
        const sql = `call createReadedBook(?, ?, @last_id)`
        await this.databaseHandler.getPool().query(sql, arrayParameters)
        const sql2 = `SELECT @last_id AS insertId`
        return this.databaseHandler.getPool().query(sql2)
    }
}

module.exports = ReadedBookRepositoryMysql;
