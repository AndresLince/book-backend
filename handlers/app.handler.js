const express = require('express')
const cors = require('cors')
require('dotenv').config()

class AppHandler {
    constructor({userRepositoryMysql}) {
        const AuthRoute = require('../routes/auth.route')
        this.authRoutes = new AuthRoute({userRepositoryMysql})
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

        return app
    }
}

module.exports = AppHandler