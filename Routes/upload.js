// const ApplicantModel = require("../Schemas/Appi");

const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const uploadData = require("../Controller/uploadData");
// authRoute

const router = express.Router();

router.post("/upload", upload.single("file"), uploadData);

module.exports = router;
