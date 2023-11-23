const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = express();

dotenv.config();

const connect = async () => {
  try {
    //trying  to connect to the mongoURI
    await mongoose.connect(`${process.env.MONGO_DB}`);
    // await mongoose.connect('mongodb://127.0.0.1:27017/oms');

    console.log('Connected to MongoDb');
  } catch (error) {
    console.log('ERROR :', error);
    throw error;
  }
};

//call back value of mongoose,connect
//if there is problem in mongodb itself it will try to connected
mongoose.connection.on('connected', () => {
  console.log('Mongodb connected');
});
mongoose.connection.on('disconnected', () => {
  console.log('Mongodb disconnected');
});

app.use(express.json());
app.use(express.urlencoded());
app.get('/', (req, res) => {
  res.status(201).json({
    message: 'Landing page!!',
  });
});
app.listen(process.env.PORT || 8080, () => {
  connect();
  console.log(`Connection sucessfull!! `);
});
