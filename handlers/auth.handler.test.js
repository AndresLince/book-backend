const request = require('supertest')
const AppHandler = require('./app.handler')

getUserByEmail = jest.fn( email => {
    if (email[0] === 'wrong_email@hotmail.com') {
        return [[]]
    }
    return [[{name: 'username', password: '$2a$10$cY3QThX9jhUO4kFbvSfnWuWLHnWRkD8uzORVhkQjB7FbKtQujnac2'}]]
})
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
createUser = jest.fn( params => {
    return [
        { insertId: 1 }
    ]
})
validateJsonWebToken = jest.fn( params => {
    return true;
})

const userRepositoryMysql = {
    getUserByEmail,
    createUser
}
const securityHandler = {
    validatePassword,
    generateJsonWebToken,
    googleVerify,
    encryptPassword,
    validateJsonWebToken
}
const bookRepository = {

}
const readedBookRepository = {

}
const appHandler = new AppHandler({userRepositoryMysql, securityHandler, bookRepository, readedBookRepository})
const app = appHandler.createApp()
describe('Login tests', () => {
    it('Should return 400 bad request No body parameters', () => {
        return request(app).post('/api/auth/login').expect(400)
    })
    it('Should return 400 bad request wrong email', () => {
        return request(app).post('/api/auth/login')
            .send(
                {'email': 'wrong_email@hotmail.com', 'password': 'PasswordPruebaTesting123?*'}
            ).expect(400)
    })
    it('Should return 200 successful login', () => {
        return request(app).post('/api/auth/login')
            .send(
                {'email': 'email@hotmail.com', 'password': 'PasswordPruebaTesting123?*'}
            ).then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        token: expect.any(String),
                    })
                )
            })
    })
    it('Should return 400 wrong password', () => {
        return request(app).post('/api/auth/login')
            .send(
                {'email': 'email@hotmail.com', 'password': 'PasswordPruebaTesting123?'}
            ).expect(400)
    })
})

describe('Google tests', () => {
    it('Should return 400 bad request No body parameters', () => {
        return request(app).post('/api/auth/google').expect(400)
    })
    it('Should return 401 bad request wrong token', () => {
        return request(app).post('/api/auth/google')
            .send(
                {'token': 'mywrongtoken'}
            ).expect(401)
    })
    it('Should return 200 successful login', () => {
        return request(app).post('/api/auth/google')
            .send(
                {'token': 'mytoken'}
            ).then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        token: expect.any(String),
                    })
                )
            })
    })
    it('Should return 200 successful login with new user', () => {
        return request(app).post('/api/auth/google')
            .send(
                {'token': 'mytokennewuser'}
            ).then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        token: expect.any(String),
                    })
                )
            })
    })
})