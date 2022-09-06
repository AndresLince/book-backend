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
    it('Should return 400 create a readed book', () => {
        return request(app).post('/api/readed-book/').send(
            {
                'title': 'title',
                'id': '2',
                'pageCount': 'pageCount',
                'author': 'error',
                'thumbnail': 'thumbnail',
            }
        ).expect(400)
    })
})

describe('Readed books tests', () => {
    it('Get all readed books should work', () => {
        return request(app).get('/api/readed-books/?q=query')
            .set(
                {'x-token': 'mytokennewuser'}
            ).then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        totalItems: expect.any(Number),
                        last_id: expect.any(Number),
                        books: expect.any(Array)
                    })
                )
                expect(response.status).toEqual(200)
            })
    })
    it('Get all readed books should fail', () => {
        return request(app).get('/api/readed-books/?q=empty')
            .set(
                {'x-token': 'mytokennewuser'}
            ).then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        books: expect.any(Array),
                    })
                )
                expect(response.status).toEqual(200)
            })
    })
    it('Get all readed books Should return 400', () => {
        return request(app).get('/api/readed-books/?q=error')
            .set(
                {'x-token': 'mytokennewuser'}
            ).then((response) => {
                expect(response.status).toEqual(400)
            })
    })
})
