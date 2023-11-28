const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./Routes/auth");
const applicants = require("./Routes/applicants");
const routes = require("./Routes/routes");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const xlsx = require("xlsx");
const app = express();
// const UserData = require("./Schemas/User"); // Define your model schema
const ApplicantModel = require("./Schemas/Appi"); // Define your model schema

dotenv.config();

const connect = async () => {
  try {
    //trying  to connect to the mongoURI
    await mongoose.connect(`${process.env.MONGO_DB}`);
    // await mongoose.connect('mongodb://127.0.0.1:27017/oms');
    console.log("Connected to MongoDb");
  } catch (error) {
    console.log("ERROR :", error);
    // throw error;
  }
};

// Routes and middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api", applicants);
app.use("/api", routes);

//call back value of mongoose,connect
//if there is problem in mongodb itself it will try to connected
mongoose.connection.on("connected", () => {
  console.log("Mongodb connected");
});
mongoose.connection.on("disconnected", () => {
  console.log("Mongodb disconnected");
});

app.post("/upload", upload.single("file"), async (req, res) => {
  const filePath = req.file.path;
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const excelData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

  try {
    // console.log("Excel Data:", excelData);

    // Collect all emails from the Excel data
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
});

app.use(express.json());
app.use(express.urlencoded());
app.get("/", (req, res) => {
  res.status(201).json({
    message: "Landing page!!",
  });
});
app.listen(process.env.PORT || 8000, () => {
  connect();
  console.log(`Connection sucessfull!! `);
});
