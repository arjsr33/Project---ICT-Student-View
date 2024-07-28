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
const salmanRoutes2 = require('./routes/salmanRoutes2')
const fathimaRoutes = require('./routes/fathimaRoutes')

app.use('/princy',princyRoutes)
app.use('/salman',salmanRoutes2)
app.use('/fathima',fathimaRoutes)


app.listen(process.env.PORT,()=>{
    console.log(`Server is listening on PORT ${process.env.PORT}:`)
})