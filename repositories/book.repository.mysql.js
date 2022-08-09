const  BookRepositoryInterface = require('../repositories/book.repository.interface');

class BookRepositoryMysql extends BookRepositoryInterface {
    constructor({ databaseHandler }) {
        super()
        this.databaseHandler = databaseHandler
        this.createBook = this.createBook.bind(this)
    }
    async createBook(arrayParameters) {
        const sql = `call createBook(?, ?, ?, ?, ?, @last_id)`
        await this.databaseHandler.getPool().query(sql, arrayParameters)
        const sql2 = `SELECT @last_id AS insertId`
        return this.databaseHandler.getPool().query(sql2)
    }
    async searchBook(arrayParameters) {
        const sql = `call searchBook(?);`
        return this.databaseHandler.getPool().query(sql, arrayParameters)
    }
}

module.exports = BookRepositoryMysql;
