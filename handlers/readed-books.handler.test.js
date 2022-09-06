const request = require('supertest')
const AppHandler = require('./app.handler')
const { userRepositoryMysql } = require('../test-helpers/user.repository.mock')
const { securityHandler } = require('../test-helpers/security.handler.mock')
const { bookRepository } = require('../test-helpers/book.repository.mock')
const { readedBookRepository } = require('../test-helpers/readed-book.repository.mock')
const { authorRepository } = require('../test-helpers/author.repository.mock')

const appHandler = new AppHandler({userRepositoryMysql, securityHandler, bookRepository, readedBookRepository, authorRepository})
const app = appHandler.createApp()
describe('Readed book tests', () => {
    it('Should return 400 bad request No body parameters', () => {
        return request(app).post('/api/readed-book').expect(400)
    })
    it('Should return 200 create a readed book', () => {
        return request(app).post('/api/readed-book/').send(
            {
                'title': 'title',
                'id': '1',
                'pageCount': 'pageCount',
                'author': 'author1',
                'thumbnail': 'thumbnail',
            }
        ).expect(200)
    })
    it('Should return 409 create a readed book', () => {
        return request(app).post('/api/readed-book/').send(
            {
                'title': 'title',
                'id': '2',
                'pageCount': 'pageCount',
                'author': 'author2',
                'thumbnail': 'thumbnail',
            }
        ).expect(409)
    })
})