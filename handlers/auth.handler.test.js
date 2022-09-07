const request = require('supertest')
const AppHandler = require('./app.handler')
const { userRepositoryMysql } = require('../test-helpers/user.repository.mock')
const { securityHandler } = require('../test-helpers/security.handler.mock')
const { bookRepository } = require('../test-helpers/book.repository.mock')
const { readedBookRepository } = require('../test-helpers/book.repository.mock')

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
    it('Should return 200 successful login with new user', () => {
        return request(app).get('/api/auth/renew')
            .set(
                {'x-token': 'mytokennewuser'}
            ).then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        token: expect.any(String),
                    })
                )
                expect(response.status).toEqual(200)
            })
    })
})