const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const doctorsRoute = require("./routes/doctors");
const appointmentsRoute = require("./routes/appointment");

const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = [process.env.FRONTEND_URL, 'http://localhost:5173'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));
app.use(bodyParser.json());
app.use(express.json());

app.use("/api/doctors", doctorsRoute);
app.use("/api/appointments", appointmentsRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
