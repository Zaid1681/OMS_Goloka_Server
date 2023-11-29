const multer = require("multer");
const xlsx = require("xlsx");
const ApplicantModel = require("../Schemas/Appi.js");

const uploadData = async (req, res, next) => {
  const filePath = req.file.path;
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const excelData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

  try {
    const emailsToCheck = excelData.map((data) => data.Email);

    // Find all existing emails in the database
    const existingEmails = await ApplicantModel.find({
      Email: { $in: emailsToCheck },
    });
    const existingEmailSet = new Set(existingEmails.map((data) => data.Email));

    // Filter out the data that has unique emails not present in the database
    const filteredData = excelData.filter(
      (data) => !existingEmailSet.has(data.Email)
    );

    console.log("Filtered Data:", filteredData);

    if (filteredData.length > 0) {
      await ApplicantModel.insertMany(filteredData);
      res.json({ message: "File data saved to MongoDB" });
    } else {
      res.json({ message: "No new data to insert" });
    }
  } catch (error) {
    console.error("Error saving data to MongoDB:", error);
    res.status(500).json({ error: "Internal server error" });
  }
  // });
};

module.exports = uploadData;
