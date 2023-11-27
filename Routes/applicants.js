const express = require("express");
const getApplicants = require("../Controller/applicants");
// authRoute

const router = express.Router();

router.get("/applicants", getApplicants);

module.exports = router;
