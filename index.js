const AppHandler = require('./handlers/app.handler')
const DatabaseHandler = require('./handlers/database/database.mysql.handler')
const databaseHandler = new DatabaseHandler()
const UserRepositoryMysql = require('./repositories/user.repository.mysql')
const userRepositoryMysql = new UserRepositoryMysql({databaseHandler})
const BookRepositoryMysql = require('./repositories/book.repository.mysql')
const bookRepository = new BookRepositoryMysql({databaseHandler})
const ReadedBookRepositoryMysql = require('./repositories/readed-book.repository.mysql')
const readedBookRepository = new ReadedBookRepositoryMysql({databaseHandler})
const SecurityHandler = require('./handlers/security.handler')
const securityHandler = new SecurityHandler()

const appHandler = new AppHandler({userRepositoryMysql, securityHandler, bookRepository, readedBookRepository})
const app = appHandler.createApp()

app.listen(process.env.PORT, () => {
    console.log('Server runnin on port: ' + process.env.PORT)
});