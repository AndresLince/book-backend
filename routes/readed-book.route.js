/*
Route: /api/auth
*/
const Router = require('express')
const router = Router()

class ReadedBookRoute {
    constructor({ securityHandler, readedBooksHandler }) {
        this.securityHandler    = securityHandler
        this.readedBooksHandler = readedBooksHandler
        this.createRoutes = this.createRoutes.bind(this)
    }

    createRoutes() {
        router.post('/', [
            this.securityHandler.validateJsonWebToken
        ], this.readedBooksHandler.create)
        return router
    }
}

module.exports = ReadedBookRoute
