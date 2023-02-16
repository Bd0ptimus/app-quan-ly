const express = require("express");
const router = express.Router({ mergeParams: true });
const {checkCredentials, renderNewForm, createUser, renderProfile} = require("../controllers/hr");

router.route('/new').get(checkCredentials, renderNewForm).post(checkCredentials, createUser);
router.route('/:id').get(renderProfile)

module.exports = router;
