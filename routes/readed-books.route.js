/*
Route: /api/auth
*/
const Router = require('express')
const router = Router()

class ReadedBooksRoute {
    constructor({ securityHandler, readedBooksHandler }) {
        this.securityHandler    = securityHandler
        this.readedBooksHandler = readedBooksHandler
        this.createRoutes = this.createRoutes.bind(this)
    }

    createRoutes() {
        router.get('/', [
            this.securityHandler.validateJsonWebToken
        ], this.readedBooksHandler.getAll)
        return router
    }
}

module.exports = ReadedBooksRoute
