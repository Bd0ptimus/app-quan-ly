const express = require("express");
const router = express.Router({ mergeParams: true });
const {checkCredentials, renderNewForm, createUser, renderProfile, renderEdit, pushEdit, showEmployees} = require("../controllers/hr");

router.route('/').get(showEmployees)
router.route('/new').get(checkCredentials, renderNewForm).post(checkCredentials, createUser);
router.route('/:id').get(renderProfile).put(pushEdit)

router.route('/:id/edit').get(checkCredentials, renderEdit);
module.exports = router;
