const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {OAuth2Client} = require('google-auth-library')
const client = new OAuth2Client( process.env.GOOGLE_ID )

class SecurityHandler {
    validatePassword(password, currentPassword) {
        return bcrypt.compareSync(password, currentPassword)
    }
    generateJsonWebToken(uid) {
        return new Promise((resolve,reject) => {
            const payload = { uid }
            jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '12h'}, (err, token) => {
                if (err) {
                    reject('No se pudo generar el JWT')
                } else {
                    resolve(token)
                }
            })
        })
    }
    encryptPassword(password) {
        const salt = bcrypt.genSaltSync()
        return bcrypt.hashSync(password, salt)
    }

    async googleVerify( token ) {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_ID,  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        })

        return ticket.getPayload()
    }
}

module.exports = SecurityHandler;