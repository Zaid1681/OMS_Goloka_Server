const ApplicantModel = require("../Schemas/Appi.js");

const getApplicants = async (req, res, next) => {
  const { Name, Email, ...others } = req.query;
  try {
    const applicants = await ApplicantModel.find({
      ...others,
    });
    res.status(200).json({ applicants });
    console.log("Data fetch in progress");
    console.log("User Data fetched successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = getApplicants;
