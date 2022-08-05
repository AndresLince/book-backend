const express = require('express')
const cors = require('cors')
require('dotenv').config()

class AppHandler {
    constructor({userRepositoryMysql, securityHandler, bookRepository, readedBookRepository}) {
        const AuthRoute = require('../routes/auth.route')
        const ReadedBookRoute = require('../routes/readed-book.route')
        const ReadedBooksHandler = require('../handlers/readed-books.handler')
        const HttpUtilsHandler   = require('../handlers/http-utils.handler')
        this.httpUtilsHandler    = new HttpUtilsHandler()
        const readedBooksHandler  = new ReadedBooksHandler({
            bookRepository: bookRepository,
            httpUtilsHandler: this.httpUtilsHandler,
            securityHandler: securityHandler,
            readedBookRepository: readedBookRepository
        })
        this.authRoutes = new AuthRoute({userRepositoryMysql, securityHandler})
        this.readedBookRoutes = new ReadedBookRoute({securityHandler, readedBooksHandler})
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

        return app
    }
}

module.exports = AppHandler