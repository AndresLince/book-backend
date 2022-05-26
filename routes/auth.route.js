/*
Route: /api/auth
*/
const Router = require('express')
const router = Router()
const { check } = require('express-validator')

const AuthHandler         = require('../handlers/auth.handler')
const UserRepositoryMysql = require('../repositories/user.repository.mysql')
const HttpUtilsHandler    = require('../handlers/http-utils.handler')
const SecurityHandler     = require('../handlers/security.handler')
const httpUtilsHandler    = new HttpUtilsHandler()
const DatabaseHandler = require('../handlers/database/database.mysql.handler')
const securityHandler = new SecurityHandler()
const databaseHandler = new DatabaseHandler()
const userRepositoryMysql = new UserRepositoryMysql({databaseHandler})
const authHandler         = new AuthHandler({
    userRepository: userRepositoryMysql,
    httpUtilsHandler: httpUtilsHandler,
    securityHandler: securityHandler,
})

router.post('/login', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    httpUtilsHandler.validateFields
], authHandler.login)

module.exports = router
