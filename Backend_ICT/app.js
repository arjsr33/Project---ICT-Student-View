const express = require('express')
const app = new express()
const morgan = require('morgan')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const projectData = require('./model/projectData')
const studentCourseData = require('./model/studentCourseData')
app.use(morgan('dev'))
require('dotenv').config()
require('./db/dbConnect')

app.use(morgan('dev'))
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/studentCourse',async(req,res)=>{
    try{
        const data = await studentCourseData.find()
        res.status(200).send(data[0])
        console.log(data[0])
    } catch (error) {
        res.status(404).send(err)
    }
})
app.get('/projects',async(req,res)=>{
    try{
        const data = await projectData.find()
        res.status(200).send(data)
        console.log(data)
    } catch (error) {
        res.status(404).send(err)
    }
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is listening on PORT ${process.env.PORT}:`)
})