const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

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
}

module.exports = SecurityHandler;