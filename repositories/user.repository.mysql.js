//const pool = require('../database/config');
const  UserRepositoryInterface = require('../repositories/user.repository.interface');

class UserRepositoryMysql extends UserRepositoryInterface {
    constructor({ databaseHandler }) {
        super()
        this.databaseHandler = databaseHandler
        this.getUserByEmail = this.getUserByEmail.bind(this)
    }
    async getUserByEmail(arrayParameters) {
        const sql = `call searchUserByEmail(?);`
        return this.databaseHandler.getPool().query(sql, arrayParameters)
    }
    async createUser(arrayParameters) {
        const sql = `call createUser(?, ?, ?, ?, ?, ?, @last_id)`
        await this.databaseHandler.getPool().query(sql, arrayParameters)
        const sql2 = `SELECT @last_id AS insertId`
        return this.databaseHandler.getPool().query(sql2)
    }
}

module.exports = UserRepositoryMysql;