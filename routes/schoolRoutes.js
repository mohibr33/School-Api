const express = require("express");
const router = express.Router();
const { createSchool, listSchools } = require("../controller/school")

// Add School
router.post("/addSchool", createSchool);

// List Schools
router.get("/listSchools", listSchools);

module.exports = router;
