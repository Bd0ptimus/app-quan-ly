const Project = require("../models/project");
const Task = require("../models/tasks");
const {getCurrentDate} = require("../utils/helpers");
const wrapAsync = require("../utils/wrapAsync")
const appError = require("../utils/appError");

module.exports.renderTask = wrapAsync(async(req,res) => {
    const {id} = req.params;
    const task = await Task.findById(id).populate({
        path: 'project', select: 'title' 
    });
    console.log(task);
    res.render('tasks/task', {task});
})
module.exports.renderEdit = wrapAsync(async(req,res) => {
    const {id} = req.params;
    const task = await Task.findById(id).populate({
        path: 'project', select: 'title' 
    });
    res.render("tasks/edit", {task});
})
module.exports.assessTask = wrapAsync(async(req,res) => {
    const {id} = req.params;
    const task = await Task.findByIdAndUpdate(id, req.body);
    res.redirect(`/tasks/${id}`);
})
module.exports.checkCredentials = wrapAsync(async (req,res,next) => {
    const {work} = req.user;
    const {id} = req.params;
    if(work.position !== 'admin')
    {
        req.flash('error', "Bạn không có quyền thực hiện thao tác này");
        return res.redirect(`/tasks/${id}`);
    }
    else next();
})
module.exports.deleteTask =  wrapAsync(async (req,res,next) => {
    const {id} = req.params;
    const task = await Task.findByIdAndDelete(id);
    res.redirect(`/projects/${task.project.toString()}`);
})
module.exports.editTask = wrapAsync(async(req,res) => {
    const {id} = req.params;
    const body = req.body;
    const task = await Task.findByIdAndUpdate(id,body);
    res.redirect(`/tasks/${id}`);
})