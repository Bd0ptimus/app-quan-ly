const { number } = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema({
    title: {
        type: String,
    },
    comment: {
        type: String,
        default: '',
    },
    progress: {
        type: Number,
        max: 100,
        min: 0,
        default: 0
    }
})
const projectSchema = new Schema({
    title: {
        type: String,
    },
    tasks: [
        taskSchema
    ],
    description: {
        type: String,
    },
    progress: {
        type: Number,
        max: 100,
        min: 0,
        default: 0,
    },
    spendings: {
        type: Number,
        min: 0,
    },
    created: {
        type: String,
    },
    deadline: {
        type: String,
    },
    leader: {
        type: mongoose.ObjectId,
        ref: 'Users'
    },
})

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;


