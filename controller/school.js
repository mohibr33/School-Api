const { addSchool, getAllSchools } = require("../model/schoolModel");

// Haversine formula for distance calculation
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

// ➤ Add School API
const createSchool = (req, res) => {
    addSchool(req.body, (err, result) => {
        if (err) return res.status(400).json({ error: err.message });
        res.status(201).json({ message: "School added successfully", id: result.insertId });
    });
};

// ➤ List Schools API
const listSchools = (req, res) => {
    const { latitude, longitude } = req.query;

    if (isNaN(latitude) || isNaN(longitude)) {
        return res.status(400).json({ error: "Invalid coordinates" });
    }

    getAllSchools((err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        const sorted = results.map((school) => {
            const distance = calculateDistance(
                parseFloat(latitude),
                parseFloat(longitude),
                school.latitude,
                school.longitude
            );
            return { ...school, distance };
        });

        sorted.sort((a, b) => a.distance - b.distance);

        res.json(sorted);
    });
};

module.exports = { createSchool, listSchools };
