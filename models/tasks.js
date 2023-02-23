const mongoose = require("mongoose");
const { Schema } = mongoose;
const Project = require("./project");
const taskSchema = new Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    comment: {
      type: String,
      default: "",
    },
    progress: {
      type: Number,
      max: 100,
      min: 0,
      default: 0,
    },
    project: {
      type: mongoose.ObjectId,
      ref: "Project",
      required: true,
    },
    created: {
      type: String,
    },
    deadline: {
      type: String,
    },
  },
  { toJSON: { virtuals: true } }
);

taskSchema.pre("findOneAndDelete", async function (next) {
  const Project = mongoose.model("Project");
  const project = await Project.findByIdAndUpdate(this.project, {
    $pull: { tasks: this._id },
  });
  next();
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
