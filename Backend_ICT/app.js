const express = require('express')
const app = new express()
const morgan = require('morgan')
const cors = require('cors')
app.use(morgan('dev'))
require('dotenv').config()
require('./db/dbConnect')

app.use(morgan('dev'))
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const princyRoutes = require('./routes/princyRoutes')

app.use('/princy',princyRoutes)

app.listen(process.env.PORT,()=>{
    console.log(`Server is listening on PORT ${process.env.PORT}:`)
})