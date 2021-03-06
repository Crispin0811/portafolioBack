const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017/portafolio",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  (e) => {
    if (e) throw e;
    console.log("Todo es correcto");
  }
);
module.exports = mongoose;
