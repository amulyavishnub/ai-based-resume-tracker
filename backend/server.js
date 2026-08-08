const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const db = require("./db");


const app = express();


// Middleware

app.use(cors());

app.use(express.json());


// ================= TEST ROUTE =================

app.get("/", (req, res) => {

    res.json({

        message:
            "Smart Resume Analyzer API is running!"

    });

});


// ================= ANALYZE ROUTE =================

app.post("/api/analyze", (req, res) => {

    const {

        resume,

        jobDescription,

        matchScore,

        matchingSkills,

        missingSkills,

        suggestions

    } = req.body;


    // Basic validation

    if (
        !resume ||
        !jobDescription ||
        matchScore === undefined
    ) {

        return res.status(400).json({

            message:
                "Resume, job description and score are required."

        });

    }


    const sql = `

        INSERT INTO analyses

        (
            resume,
            job_description,
            match_score,
            matching_skills,
            missing_skills,
            suggestions
        )

        VALUES (?, ?, ?, ?, ?, ?)

    `;


    const values = [

        resume,

        jobDescription,

        matchScore,

        Array.isArray(matchingSkills)
            ? matchingSkills.join(", ")
            : "",

        Array.isArray(missingSkills)
            ? missingSkills.join(", ")
            : "",

        suggestions || ""

    ];


    db.query(
        sql,
        values,
        (err, result) => {

            if (err) {

                console.error(
                    "❌ Database error:",
                    err
                );

                return res.status(500).json({

                    message:
                        "Failed to save analysis."

                });

            }


            res.status(201).json({

                message:
                    "Analysis saved successfully!",

                id: result.insertId

            });

        }
    );

});


// ================= SERVER =================

const PORT =
    process.env.PORT || 5000;


app.listen(PORT, () => {

    console.log(
        `🚀 Server running on port ${PORT}`
    );

});