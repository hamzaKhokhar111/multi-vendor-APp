const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose.connect(process.env.DB_URL)
    .then((data) => {
      console.log(`mongod connected with server: `);
    });
};

module.exports = connectDatabase;
