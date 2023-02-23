
const mongoose = require("mongoose");
const { Schema } = mongoose;
const Task = require("./tasks");
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');

const projectSchema = new Schema({
    title: {
        type: String,
    },
    tasks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Task'
        }    
    ],
    description: {
        type: String,
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
}, { toJSON: { virtuals: true } })

projectSchema.plugin(mongooseLeanVirtuals);

projectSchema.virtual('progress').get(function() {
    if (this.tasks.length === 0) {
      return 0;
    }
    const totalProgress = this.tasks.reduce((total, task) => total + task.progress, 0);
    return Math.round(totalProgress / this.tasks.length);
  });

projectSchema.post("findOneAndDelete", async function (doc) {
    if (doc) {
      await Task.deleteMany({
        _id: {
          $in: doc.tasks,
        },
      });
    }
  });

const Project = mongoose.model("Project", projectSchema)
module.exports = Project;



