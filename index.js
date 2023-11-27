const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./Routes/auth");
const applicants = require("./Routes/applicants");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const xlsx = require("xlsx");
const app = express();
// const UserData = require("./Schemas/User"); // Define your model schema
const Applicants = require("./Schemas/Applicants"); // Define your model schema

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
    const uniqueEmails = await Promise.all(
      excelData.map(async (data) => {
        const existingData = await Applicants.findOne({ email: data.email });
        return existingData ? null : data;
      })
    );

    const filteredData = uniqueEmails.filter((data) => data !== null);

    await Applicants.insertMany(filteredData);
    // await Applicants.updateMany(excelData);
    res.json({ message: "File data saved to MongoDB" });
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
