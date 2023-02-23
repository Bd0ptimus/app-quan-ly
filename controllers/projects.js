const Project = require("../models/project");
const Task = require("../models/tasks");
const {getCurrentDate} = require("../utils/helpers");
const wrapAsync = require("../utils/wrapAsync")
const appError = require("../utils/appError");


module.exports.renderNew = (req,res) => {
    res.render("projects/new", {created: getCurrentDate()});
}
module.exports.renderProject = wrapAsync(async (req,res) => {
    const {id} = req.params;
    const project = await Project.findById(id).populate('tasks').lean({ virtuals: true });
    console.log(project);
    const {tasks} = project;
    res.render("projects/show", {project, tasks});

})
module.exports.checkCredentials = (req,res,next) => {
    const {work} = req.user;
    if(work.position !== 'admin')
    {
        req.flash('error', "Bạn không có quyền thực hiện thao tác này");
        return res.redirect('/home');
    }
    else next();
}
module.exports.createProject = wrapAsync(async (req,res) => {
    const body = req.body;
    console.log(body);
    const project = new Project(body);
    console.log(project);
    await project.save();
    res.redirect(`/projects/${project._id}`);
})
module.exports.postTask = wrapAsync(async (req,res) => {
    const {id} = req.params;
    const body = req.body;
    const project = await Project.findById(id).populate('tasks');

    console.log(project);
    const task = new Task(body);
    task.project = id;
    task.created = getCurrentDate();
    console.log(task);
    await task.save();
    project.tasks.push(task._id);
    console.log(project);
    await project.save()
    
    res.redirect(`/projects/${id}`);
})

module.exports.deleteProject = wrapAsync(async(req,res) => {
    const {id} = req.params;
    const project = await Project.findByIdAndDelete(id);
    console.log(project);
    res.redirect("/manage");
})

module.exports.renderEdit = wrapAsync(async(req,res) => {
    const {id} = req.params;
    const project = await Project.findById(id);
    res.render("projects/edit", {project});
})

module.exports.editProject = wrapAsync(async(req,res) => {
    const {id} = req.params;
    const body = req.body;
    const project = await Project.findByIdAndUpdate(id, body);
    res.redirect(`/projects/${id}`);
})