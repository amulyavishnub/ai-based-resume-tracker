const analyzeBtn = document.getElementById("analyzeBtn");


// ================= ANALYZE RESUME =================

analyzeBtn.addEventListener("click", analyzeResume);


function analyzeResume() {

    const resume = document
        .getElementById("resume")
        .value
        .toLowerCase()
        .trim();

    const jobDescription = document
        .getElementById("jobDescription")
        .value
        .toLowerCase()
        .trim();


    // Check inputs

    if (!resume || !jobDescription) {

        alert("Please enter both your resume and the job description.");

        return;
    }


    // Skills database

    const skills = [
        "javascript",
        "java",
        "python",
        "c++",
        "sql",
        "html",
        "css",
        "react",
        "node.js",
        "express",
        "mongodb",
        "mysql",
        "git",
        "github",
        "machine learning",
        "artificial intelligence",
        "data structures",
        "algorithms",
        "typescript",
        "angular",
        "vue",
        "docker",
        "aws",
        "azure",
        "rest api",
        "figma"
    ];


    const matchingSkills = [];
    const missingSkills = [];


    // Compare skills

    skills.forEach(skill => {

        if (jobDescription.includes(skill)) {

            if (resume.includes(skill)) {

                matchingSkills.push(skill);

            } else {

                missingSkills.push(skill);

            }

        }

    });


    // Calculate score

    const totalRequiredSkills =
        matchingSkills.length + missingSkills.length;


    let score = 0;


    if (totalRequiredSkills > 0) {

        score = Math.round(
            (matchingSkills.length / totalRequiredSkills) * 100
        );

    }


    // Display score

    document.getElementById("score").textContent = `${score}%`;


    // Score message

    let scoreMessage = "";


    if (score >= 80) {

        scoreMessage =
            "Excellent match! Your resume aligns strongly with this job.";

    } else if (score >= 60) {

        scoreMessage =
            "Good match! A few improvements could make your resume stronger.";

    } else if (score >= 40) {

        scoreMessage =
            "Moderate match. Consider improving your skills and resume.";

    } else {

        scoreMessage =
            "Low match. Review the missing skills and improve your resume.";

    }


    document.getElementById("scoreMessage").textContent =
        scoreMessage;


    // ================= MATCHING SKILLS =================

    const matchingList =
        document.getElementById("matchingSkills");

    matchingList.innerHTML = "";


    if (matchingSkills.length === 0) {

        const li = document.createElement("li");

        li.textContent = "No matching skills found.";

        matchingList.appendChild(li);

    } else {

        matchingSkills.forEach(skill => {

            const li = document.createElement("li");

            li.textContent = skill;

            matchingList.appendChild(li);

        });

    }


    // ================= MISSING SKILLS =================

    const missingList =
        document.getElementById("missingSkills");

    missingList.innerHTML = "";


    if (missingSkills.length === 0) {

        const li = document.createElement("li");

        li.textContent = "No major skill gaps found.";

        missingList.appendChild(li);

    } else {

        missingSkills.forEach(skill => {

            const li = document.createElement("li");

            li.textContent = skill;

            missingList.appendChild(li);

        });

    }


    // ================= SUGGESTIONS =================

    let suggestions = "";


    if (score >= 80) {

        suggestions =
            "Your resume is a strong match for this position. Make sure your strongest skills and relevant projects are clearly highlighted.";

    } else if (score >= 60) {

        suggestions =
            "Your resume is a good match. Consider adding some of the missing skills if you genuinely have experience with them.";

    } else {

        suggestions =
            "Your resume has several skill gaps. Consider learning the missing skills and highlighting relevant projects or coursework.";

    }


    document.getElementById("suggestionsText").textContent =
        suggestions;


    // Show results

    document.getElementById("results").style.display = "block";


    // ================= SEND DATA TO BACKEND =================

    fetch("http://localhost:5000/api/analyze", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            resume: resume,

            jobDescription: jobDescription,

            matchScore: score,

            matchingSkills: matchingSkills,

            missingSkills: missingSkills,

            suggestions: suggestions

        })

    })

    .then(response => {

        if (!response.ok) {
            throw new Error("Server returned an error.");
        }

        return response.json();

    })

    .then(data => {

        console.log("Backend response:", data);

    })

    .catch(error => {

        console.error("Backend error:", error);

    });

}