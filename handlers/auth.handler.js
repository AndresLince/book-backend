class AuthHandler {
    constructor({ userRepository, httpUtilsHandler, securityHandler }) {
        this.userRepository   = userRepository
        this.httpUtilsHandler = httpUtilsHandler
        this.securityHandler  = securityHandler
        this.login = this.login.bind(this)
        this.googleSignIn = this.googleSignIn.bind(this)
        this.renewToken = this.renewToken.bind(this)
    }

    async login(request, response) {
        const {email, password} = request.body

        const user = await this.userRepository.getUserByEmail([email])

        if (user[0].length === 0) {
            return this.httpUtilsHandler.sendBasicJsonResponse(response, 400, 'Usuario o contraseña incorrecta')
        }

        const userDatabase = user[0][0]

        const isValidPassword = this.securityHandler.validatePassword(password, userDatabase.password)
        if (!isValidPassword) {
            return this.httpUtilsHandler.sendBasicJsonResponse(response, 400, 'Usuario o contraseña incorrecta')
        }

        const token = await this.securityHandler.generateJsonWebToken(userDatabase.id_user)

        response.status(200).send({
            token
        })
    }

    async googleSignIn(request, response) {
        const googleToken = request.body.token
        try {
            const { name, email, given_name, family_name, jti } = await this.securityHandler.googleVerify(googleToken)

            const user = await this.userRepository.getUserByEmail([email])

            let userDatabase
            if (user[0].length !== 0) {
                userDatabase = user[0][0]
            } else {
                const encryptedPassword = this.securityHandler.encryptPassword(jti)
                const createdUser = await this.userRepository.createUser([name, encryptedPassword, email, 1, given_name, family_name])

                userDatabase = createdUser[0]
                userDatabase.id_user = createdUser[0].insertId
            }

            const token = await this.securityHandler.generateJsonWebToken( userDatabase.id_user )
            response.json({
                token: token
            })
        } catch (error) {
            return this.httpUtilsHandler.sendBasicJsonResponse(response, 401, 'Token no es correcto')
        }
    }
    async renewToken(request, response) {
        const uid = request.uid
        //generar el token jwt
        const token = await this.securityHandler.generateJsonWebToken(uid)
        response.status(200).send({
            token: token
        })
    }
}

module.exports = AuthHandler