const express = require("express");
const router = express.Router({ mergeParams: true });
const {renderTask, assessTask, checkCredentials, deleteTask, renderEdit, editTask} = require("../controllers/tasks")

router.route("/:id").get(renderTask).post(checkCredentials,assessTask).delete(checkCredentials, deleteTask).put(checkCredentials, editTask);
router.route("/:id/edit").get(checkCredentials, renderEdit)
module.exports = router;