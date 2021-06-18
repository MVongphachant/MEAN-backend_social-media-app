const path = require('path')
const express = require('express')
const cors = require('cors')

require('./database/mongoose')

const postsRoutes = require('./routes/posts')
const userRoutes = require('./routes/user')

const app = express()

const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
// __dirname = path to this file, path.join concats path, static method serves static files
app.use("/images", express.static(path.join(__dirname, "./images")))

app.use('/api/posts', postsRoutes)
app.use('/api/user', userRoutes)

app.set('port', port)
// const server = http.createServer(app)

app.listen(port, () => console.log('Listening on port: ' + port))