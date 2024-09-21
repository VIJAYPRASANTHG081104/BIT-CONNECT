const express = require("express");
const dotenv = require("dotenv");
const app = express();
const { readdirSync } = require("fs");
const cors = require("cors");
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const options = {
  origin: "http://localhost:5173",
  useSuccessStatus: 200,
};
app.use(cors(options));
app.use(express.json({limit:"5mb"}));
app.use(
  fileUpload({
    useTempFiles: true
  })
)
dotenv.config();
const PORT = process.env.PORT || 5000;

 
try {
    mongoose.connect(process.env.DATABASE_URI);
    console.log("DB CONNECTED");
} catch (error) {
    console.log(`error:${error}`);
}

// console.log(readdirSync("./routes"))

readdirSync("./routes").map((e) => {
  app.use("/", require("./routes/" + e));
});

app.listen(PORT, () => {
  console.log(`The server is running the port ${PORT}`);
});
