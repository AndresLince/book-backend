const express = require('express')
const cors = require('cors')
require('dotenv').config()

class AppHandler {
    constructor({userRepositoryMysql, securityHandler, bookRepository, readedBookRepository, authorRepository}) {
        const AuthRoute = require('../routes/auth.route')
        const ReadedBookRoute = require('../routes/readed-book.route')
        const ReadedBooksRoute = require('../routes/readed-books.route')
        const ReadedBooksHandler = require('../handlers/readed-books.handler')
        const HttpUtilsHandler   = require('../handlers/http-utils.handler')
        this.httpUtilsHandler    = new HttpUtilsHandler()
        const readedBooksHandler  = new ReadedBooksHandler({
            bookRepository: bookRepository,
            httpUtilsHandler: this.httpUtilsHandler,
            securityHandler: securityHandler,
            readedBookRepository: readedBookRepository,
            authorRepository: authorRepository
        })
        this.authRoutes = new AuthRoute({userRepositoryMysql, securityHandler})
        this.readedBookRoutes = new ReadedBookRoute({securityHandler, readedBooksHandler})
        this.readedBooksRoutes = new ReadedBooksRoute({securityHandler, readedBooksHandler})
    }

    createApp() {

        //Create express server
        const app = express()

        //Configure cors
        app.use(cors())

        //Body read and parse
        app.use(express.json())

        //Routes
        app.use('/api/auth', this.authRoutes.createRoutes())
        app.use('/api/readed-book', this.readedBookRoutes.createRoutes())
        app.use('/api/readed-books', this.readedBooksRoutes.createRoutes())

        return app
    }
}

module.exports = AppHandler