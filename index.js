const express = require('express')
const cors = require('cors')
require('dotenv').config()

//Create express server
const app = express()

//Configure cors
app.use(cors())

//Body read and parse
app.use(express.json())

app.listen(process.env.PORT, () => {
    console.log('Server runnin on port: ' + process.env.PORT)
});