const mongoose = require("mongoose");
const { Schema } = mongoose;
const memberSchema = new Schema({
    employee: {
        type: Schema.objectId,
        reference: "User",
        required: true,
    },
    level: {
        type: Number,
        required: true,
    }
})
const projectSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    }, 
    creator: {
        type: Schema.objectId,
        reference: "User",
        required: true,
    },
    type:{
        level: {
            type: Number,
            required: true,
        },
        parent: {
            type: Schema.objectId,
            reference: "Project"
        },
    },members: [memberSchema]
})

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;


