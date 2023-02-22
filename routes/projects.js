const express = require("express");
const router = express.Router({ mergeParams: true });

const {renderNew, renderProject, checkCredentials,createProject} = require("../controllers/projects");

router.get('/new', renderNew);
router.post('/', checkCredentials ,createProject)
router.get("/:id", renderProject);

module.exports = router;