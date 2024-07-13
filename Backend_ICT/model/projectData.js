const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    id: String,
    name: String,
    course: String,
    company: String,
    details: String,
    overview: String,
    referenceMaterials: [{ week: Number, material: String }],
    weeklySubmissionFormat: String,
    finalReportFormat: String,
    vivaVoceFormat: String,
    discussionForum: [String]
});

const projectData = mongoose.model('project', projectSchema);
module.exports = projectData;
