const mongoose = require('mongoose')
const projectSchema = mongoose.Schema({
    id:String,
    name:String,
    course:String,
    company:String,
    details:String,
    overview:String
})
const projectData = mongoose.model('project',projectSchema)
module.exports = projectData