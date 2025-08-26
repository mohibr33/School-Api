const express = require("express");
const db = require("./db");  // database connection
require("dotenv").config();

const schoolRoutes = require("./routes/schoolRoutes"); // import your school routes

const app = express();
app.use(express.json());

// Register Routes
app.use("/api/schools", schoolRoutes); 

// Root route (optional)
app.get("/", (req, res) => {
    res.send("School Management API is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
