const AppHandler = require('./handlers/app.handler')
const DatabaseHandler = require('./handlers/database/database.mysql.handler')
const databaseHandler = new DatabaseHandler()
const UserRepositoryMysql = require('./repositories/user.repository.mysql')
const userRepositoryMysql = new UserRepositoryMysql({databaseHandler})
const SecurityHandler = require('./handlers/security.handler')
const securityHandler = new SecurityHandler()

const appHandler = new AppHandler({userRepositoryMysql, securityHandler})
const app = appHandler.createApp()

app.listen(process.env.PORT, () => {
    console.log('Server runnin on port: ' + process.env.PORT)
});