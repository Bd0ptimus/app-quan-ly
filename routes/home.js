const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const Strat = require("../models/strat");

const {renderHome, isAuthorized, updateStrat} = require("../controllers/home");
router.get('/', renderHome);
router.post('/', isAuthorized, updateStrat)

module.exports = router;