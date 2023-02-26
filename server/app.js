require('dotenv').config()
const express = require('express')
const db = require('./config/db.config')
const userRouter = require('./routers/userRouter')
const adminRouter = require('./routers/adminRouter')
const cors = require('cors')

const app = express()

const PORT = process.env.PORT || 4000

app.use(express.static('./public'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server listening to port ${PORT}`)
  })
})

app.use('/admin', adminRouter)
app.use('/', userRouter)