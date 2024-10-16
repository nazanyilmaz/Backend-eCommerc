const mongoose = require("mongoose");

const db = () => {
  mongoose
    .connect(
      "mongodb+srv://nazan:nazan@cluster0.cdetd.mongodb.net/ecommerc?retryWrites=true&w=majority&appName=Cluster0",
      {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log("mongoDB connnected");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = db;
