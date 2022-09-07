/*
Route: /api/auth
*/
const Router = require('express')
const router = Router()
const { check } = require('express-validator')

class ReadedBookRoute {
    constructor({ securityHandler, readedBooksHandler }) {
        this.securityHandler    = securityHandler
        this.readedBooksHandler = readedBooksHandler
        this.createRoutes = this.createRoutes.bind(this)
        const HttpUtilsHandler    = require('../handlers/http-utils.handler')
        this.httpUtilsHandler     = new HttpUtilsHandler()
    }

    createRoutes() {
        router.post('/', [
            this.securityHandler.validateJsonWebToken,
            check('title', 'El titulo es obligatorio').not().isEmpty(),
            check('id', 'El identificador es obligatorio').not().isEmpty(),
            check('pageCount', 'El numero de paginas es obligatorio').not().isEmpty(),
            check('author', 'El author es obligatorio').not().isEmpty(),
            check('thumbnail', 'El thumbnail es obligatorio').not().isEmpty(),
            this.httpUtilsHandler.validateFields
        ], this.readedBooksHandler.create)
        return router
    }
}

module.exports = ReadedBookRoute
