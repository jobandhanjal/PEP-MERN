const mongoose = require('mongoose');

const MONGO_DB_URL = process.env.MONGO_DB_URL;
const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;

const MONGO_DB_CONNECT_URL = MONGO_DB_URL.replace(
  '<db_password>',
  MONGO_DB_PASSWORD
);

const MONGO_DB_CONNECT_URL_NAME = MONGO_DB_CONNECT_URL.replace(
  '/?',
  `/${MONGO_DB_NAME}?`
);

const ConnetDb = async () => {
  try {
    await mongoose.connect(MONGO_DB_CONNECT_URL_NAME);
    console.log('Connected sucessfully');
  } catch (error) {
    console.log('Database not connected');
    console.log(error.message);
  }
};

ConnetDb();
