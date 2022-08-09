const  AuthorRepositoryInterface = require('./author.repository.interface');

class AuthorRepositoryMysql extends AuthorRepositoryInterface {
    constructor({ databaseHandler }) {
        super()
        this.databaseHandler = databaseHandler
        this.createAuthor = this.createAuthor.bind(this)
    }
    async createAuthor(arrayParameters) {
        const sql = `call createAuthor(?, @last_id)`
        await this.databaseHandler.getPool().query(sql, arrayParameters)
        const sql2 = `SELECT @last_id AS insertId`
        return this.databaseHandler.getPool().query(sql2)
    }
    async searchAuthor(arrayParameters) {
        const sql = `call searchAuthor(?);`
        return this.databaseHandler.getPool().query(sql, arrayParameters)
    }
}

module.exports = AuthorRepositoryMysql;
