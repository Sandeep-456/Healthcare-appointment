const express = require("express");
const router = express.Router();
const db = require("../db/connections");

// POST appointment
router.post("/", (req, res) => {
  const { doctor_id, patient_name, patient_email, appointment_date } = req.body;

  if (!doctor_id || !patient_name || !patient_email || !appointment_date) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const sql = `
    INSERT INTO appointments (doctor_id, patient_name, patient_email, appointment_date)
    VALUES (?, ?, ?, ?)
  `;
  db.query(
    sql,
    [doctor_id, patient_name, patient_email, appointment_date],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(201).json({ message: "Appointment booked successfully." });
    }
  );
});

module.exports = router;
