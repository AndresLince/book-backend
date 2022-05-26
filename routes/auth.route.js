/*
Route: /api/auth
*/
const Router = require('express')
const router = Router()
const { check } = require('express-validator')

class AuthRoute {
    constructor({userRepositoryMysql}) {
        const AuthHandler         = require('../handlers/auth.handler')
        const HttpUtilsHandler    = require('../handlers/http-utils.handler')
        const SecurityHandler     = require('../handlers/security.handler')
        this.httpUtilsHandler     = new HttpUtilsHandler()
        const securityHandler = new SecurityHandler()
        this.authHandler         = new AuthHandler({
            userRepository: userRepositoryMysql,
            httpUtilsHandler: this.httpUtilsHandler,
            securityHandler: securityHandler,
        })
        this.createRoutes = this.createRoutes.bind(this)
    }

    createRoutes() {

        router.post('/login', [
            check('email', 'El email es obligatorio').isEmail(),
            check('password', 'El password es obligatorio').not().isEmpty(),
            this.httpUtilsHandler.validateFields
        ], this.authHandler.login)
        return router
    }
}

module.exports = AuthRoute
