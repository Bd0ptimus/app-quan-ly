const Project = require("../models/project");
const wrapAsync = require("../utils/wrapAsync")
const appError = require("../utils/appError");

module.exports.renderNew = (req,res) => {
    res.render("projects/new");
}
module.exports.renderProject = wrapAsync(async (req,res) => {
    const {id} = req.params;
    const project = await Project.findById(id);
    console.log(project);
    if(!project){
        throw new appError(404, "Đường dẫn không tồn tại");
    }
    res.render("projects/show", {project});

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