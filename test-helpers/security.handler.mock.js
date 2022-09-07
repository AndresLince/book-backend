validatePassword = jest.fn( params => {
    if (params === 'PasswordPruebaTesting123?*') {
        return true;
    }
    return false
})
generateJsonWebToken = jest.fn( params => {
    return 'jsonWebToken'
})
googleVerify = jest.fn( params => {
    if (params === 'mytoken') {
        return {
            name: 'name',
            email: 'email@hotmail.com',
            given_name: 'given_name',
            family_name: 'family_name',
            jti: 'jti'
        }
    }
    if (params === 'mytokennewuser') {
        return {
            name: 'name',
            email: 'wrong_email@hotmail.com',
            given_name: 'given_name',
            family_name: 'family_name',
            jti: 'jti'
        }
    }
    throw new Error('Wrong token')
})
encryptPassword = jest.fn( params => {
    return 'encryptedPassword'
})

validateJsonWebToken = jest.fn( (request, response, next) => {
    next()
})
const securityHandler = {
    validatePassword,
    generateJsonWebToken,
    googleVerify,
    encryptPassword,
    validateJsonWebToken
}
module.exports = {
    securityHandler
};
