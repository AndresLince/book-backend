/*
Route: /api/auth
*/
const Router = require('express')
const router = Router()
const { check } = require('express-validator')

class AuthRoute {
    constructor({userRepositoryMysql, securityHandler}) {
        const AuthHandler         = require('../handlers/auth.handler')
        const HttpUtilsHandler    = require('../handlers/http-utils.handler')
        this.httpUtilsHandler     = new HttpUtilsHandler()
        this.securityHandler      = securityHandler
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
        router.post('/google', [
            check('token', 'El token de Google es obligatorio').not().isEmpty(),
            this.httpUtilsHandler.validateFields
        ], this.authHandler.googleSignIn)
        router.get('/renew',
        [
            this.securityHandler.validateJsonWebToken
        ], this.authHandler.renewToken)
        return router
    }
}

module.exports = AuthRoute
