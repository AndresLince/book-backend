const request = require('supertest')
const AppHandler = require('./app.handler')

getUserByEmail = jest.fn( email => {
    if (email[0] === 'wrong_email@hotmail.com') {
        return []
    }
    return [[{name: 'username', password: '$2a$10$cY3QThX9jhUO4kFbvSfnWuWLHnWRkD8uzORVhkQjB7FbKtQujnac2'}]]
})

const userRepositoryMysql = {
    getUserByEmail: getUserByEmail
}
const appHandler = new AppHandler({userRepositoryMysql})
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