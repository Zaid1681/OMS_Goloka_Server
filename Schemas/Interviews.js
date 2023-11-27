// models/InterviewSchedule.js

const mongoose = require("mongoose");
const { Schema } = mongoose;

const ApplicantSchema = new mongoose.Schema(
    {
        candidateName: { 
            type: String, 
            required: true 
        },
        interviewType: { 
            type: String, 
            required: true 
        },
        interviewerName: { 
            type: String, 
            required: true 
        },
        date: { 
            type: Date, 
            required: true 
        },
        startTime: { 
            type: String, 
            required: true 
        },
        endTime: { 
            type: String, 
            required: true 
        },
        candidateEmail: { 
            type: String, 
            required: true 
        },
        interviewerEmail: { 
            type: String, 
            required: true 
        },
});

const InterviewSchedule = mongoose.model("InterviewSchedule",ApplicantSchema);

module.exports = InterviewSchedule;
