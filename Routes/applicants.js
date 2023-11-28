const express = require("express");
const getApplicants = require("../Controller/applicants");
// authRoute

const router = express.Router();

router.get("/getapplicants", getApplicants);

module.exports = router;
