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
const nodemailer = require("nodemailer"); // Add nodemailer

// const UserData = require("./Schemas/User"); // Define your model schema
const ApplicantModel = require("./Schemas/Appi"); // Define your model schema
const uploadData = require("./Routes/upload");

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


// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'abc@gmail.com', // Replace with your email
//     pass: 'password', // Replace with your email password
//   },
// });

// const sendEmail = async (to, subject, text) => {
//   const mailOptions = {
//     from: 'abc@gmail.com', // Replace with your email
//     to,
//     subject,
//     text,
//   };

//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log('Email sent:', info.response);
//   } catch (error) {
//     console.error('Error sending email:', error);
//   }
// };

// Routes and middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api", applicants);
app.use("/api", routes);
app.use("/api", uploadData);

//call back value of mongoose,connect
//if there is problem in mongodb itself it will try to connected
mongoose.connection.on("connected", () => {
  console.log("Mongodb connected");
});
mongoose.connection.on("disconnected", () => {
  console.log("Mongodb disconnected");
});

app.post("/api/scheduleInterview", async (req, res) => {
  const { candidateEmail, interviewerEmail, interviewDetails } = req.body;

  try {
    // Save the interview details to MongoDB
    // (Assuming you have a model/schema for interviews)
    // await InterviewModel.create(interviewDetails);

    // Send email to the candidate
    await sendEmail(candidateEmail, 'Interview Scheduled', 'Your interview has been scheduled.');

    // Send email to the interviewer
    await sendEmail(interviewerEmail, 'Interview Scheduled', 'An interview has been scheduled.');

    res.json({ message: 'Interview scheduled successfully' });
  } catch (error) {
    console.error('Error scheduling interview:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post("/upload", upload.single("file"), async (req, res) => {
  const filePath = req.file.path;
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];

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
