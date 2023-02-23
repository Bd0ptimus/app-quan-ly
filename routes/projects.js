const express = require("express");
const router = express.Router({ mergeParams: true });

const {renderNew, renderProject, checkCredentials,createProject, postTask, deleteProject, editProject, renderEdit} = require("../controllers/projects");

router.get('/new', checkCredentials, renderNew);
router.post('/', checkCredentials ,createProject)
router.route("/:id").get(renderProject).delete(checkCredentials,deleteProject).put(checkCredentials,editProject)
router.post("/:id/tasks", postTask);
router.get("/:id/edit", checkCredentials, renderEdit)

module.exports = router;