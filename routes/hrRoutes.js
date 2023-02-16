const express = require("express");
const router = express.Router({ mergeParams: true });

router.route('new').get()

module.exports = router;
