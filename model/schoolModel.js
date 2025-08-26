const connection = require("../db");
class School {
    constructor(name, address, latitude, longitude) {
        this.name = name;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    check() {
        if (!this.name || !this.address || isNaN(this.latitude) || isNaN(this.longitude)) {
            throw new Error("Please fill all fields with correct values");
        }
    }
}

const addSchool = (schoolData, callback) => {
    const school = new School(
        schoolData.name,
        schoolData.address,
        schoolData.latitude,
        schoolData.longitude
    );

    try {
        school.check();
    } catch (error) {
        return callback(error, null);
    }

    const query = `INSERT INTO schooltable (name, address, latitude, longitude) VALUES (?, ?, ?, ?)`;
    connection.query(
        query,
        [school.name, school.address, school.latitude, school.longitude],
        (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result);
        }
    );
};

const getAllSchools = (callback) => {
    const query = `SELECT * FROM schooltable`;
    connection.query(query, (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
};

module.exports = { addSchool, getAllSchools };
