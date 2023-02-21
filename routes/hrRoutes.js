const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  checkCredentials,
  renderNewForm,
  createUser,
  renderProfile,
  renderEdit,
  pushEdit,
  showEmployees,
  editPw
} = require("../controllers/hr");

router.route("/").get(showEmployees);
router
  .route("/new")
  .get(checkCredentials, renderNewForm)
  .post(checkCredentials, createUser);
router.route("/:id/").get(renderProfile).put(checkCredentials, pushEdit);

router.route("/:id/edit").get(renderEdit);

router.post('/:id/pw', editPw);
module.exports = router;
