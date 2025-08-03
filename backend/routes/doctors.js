const express = require("express");
const router = express.Router();
const db = require("../db/connections");

// GET all doctors
router.get("/", (req, res) => {
  db.query("SELECT * FROM doctors", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// GET doctor by ID
router.get("/:id", (req, res) => {
  const doctorId = req.params.id;
  db.query("SELECT * FROM doctors WHERE id = ?", [doctorId], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send("Doctor not found");
    res.json(results[0]);
  });
});

module.exports = router;
