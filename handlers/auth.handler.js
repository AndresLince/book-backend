class AuthHandler {
    constructor({ userRepository, httpUtilsHandler, securityHandler }) {
        this.userRepository   = userRepository
        this.httpUtilsHandler = httpUtilsHandler
        this.securityHandler  = securityHandler
        this.login = this.login.bind(this)
    }

    async login(request, response) {
        const {email, password} = request.body

        const user = await this.userRepository.getUserByEmail([email])

        if (user.length === 0) {
            console.log(user)
            return this.httpUtilsHandler.sendBasicJsonResponse(response, 400, 'Usuario o contraseña incorrecta')
        }

        const userDatabase = user[0]

        const isValidPassword = this.securityHandler.validatePassword(password, userDatabase.password)
        if (!isValidPassword) {
            return this.httpUtilsHandler.sendBasicJsonResponse(response, 400, 'Usuario o contraseña incorrecta')
        }

        const token = await this.securityHandler.generateJsonWebToken(userDatabase.id_user)

        response.status(200).send({
            token
        })
    }
}

module.exports = AuthHandler