const express = require("express");
const ApplicantModel = require("../Schemas/Applicants");
const TeachTeamModel = require("../Schemas/TechTeam");
const MarketingTeamModel = require("../Schemas/MarketingTeam");
const HrTeamModel = require("../Schemas/HrTeam");
const InterviewSchedule = require('../Schemas/Interviews');

const router = express.Router();

// Define a route handler for getting all applicants
router.get("/applicants", async (req, res) => {
  try {
    // Fetch all applicants from the database
    const applicants = await ApplicantModel.find();

    // Log the fetched applicants to the console
    // console.log("Applicants:", applicants);

    // Send the list of applicants in the response
    res.status(200).json(applicants);
  } catch (error) {
    console.error("Error fetching applicants:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/techTeam", async (req, res) => {
  try {
    // Fetch all applicants from the database
    const TechTeam = await TeachTeamModel.find();

    // Log the fetched applicants to the console
    // console.log("Applicants:", applicants);

    // Send the list of applicants in the response
    res.status(200).json(TechTeam);
  } catch (error) {
    console.error("Error fetching applicants:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/marketingTeam", async (req, res) => {
  try {
    // Fetch all applicants from the database
    const MarketingTeam = await MarketingTeamModel.find();

    // Log the fetched applicants to the console
    // console.log("Applicants:", applicants);

    // Send the list of applicants in the response
    res.status(200).json(MarketingTeam);
  } catch (error) {
    console.error("Error fetching applicants:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/hrTeam", async (req, res) => {
  try {
    // Fetch all applicants from the database
    const HrTeam = await HrTeamModel.find();

    // Log the fetched applicants to the console
    // console.log("Applicants:", applicants);

    // Send the list of applicants in the response
    res.status(200).json(HrTeam);
  } catch (error) {
    console.error("Error fetching applicants:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to save interview schedule
router.post('/interviews', async (req, res) => {
  try {
    const scheduleData = req.body;
    const newSchedule = new InterviewSchedule(scheduleData);
    await newSchedule.save();
    res.json({ success: true, message: 'Interview scheduled successfully' });
  } catch (error) {
    console.error('Error scheduling interview:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});
router.get('/getInterviews', async (req, res) => {
  try {
    // Fetch interviews from the database (replace with your actual query)
    const interviews = await InterviewSchedule.find();

    res.status(200).json(interviews);
  } catch (error) {
    console.error('Error fetching interviews:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
module.exports = router;
