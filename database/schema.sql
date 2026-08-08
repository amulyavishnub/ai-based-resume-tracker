CREATE DATABASE IF NOT EXISTS resume_analyzer;

USE resume_analyzer;


CREATE TABLE IF NOT EXISTS analyses (

    id INT AUTO_INCREMENT PRIMARY KEY,

    resume TEXT NOT NULL,

    job_description TEXT NOT NULL,

    match_score INT NOT NULL,

    matching_skills TEXT,

    missing_skills TEXT,

    suggestions TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);