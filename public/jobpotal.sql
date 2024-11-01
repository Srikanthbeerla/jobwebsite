CREATE TABLE jobseekers (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    father_name VARCHAR(255) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    date_of_birth DATE NOT NULL,
    qualification VARCHAR(255) NOT NULL,
    skills TEXT,
    email VARCHAR(100) NOT NULL,
    contact_number VARCHAR(15) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE employers (
    id SERIAL PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    contact_person VARCHAR(100) NOT NULL,
    company_address VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL,
    mobile_no VARCHAR(15) NOT NULL,
    work_place VARCHAR(255) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);


CREATE TABLE admins (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE jobs (
    id SERIAL PRIMARY KEY,
    job_title VARCHAR(255) NOT NULL,
    total_vacancy INTEGER NOT NULL,
    salary VARCHAR(100) NOT NULL,
    qualification VARCHAR(255) NOT NULL,
    skills TEXT NOT NULL
);

CREATE TABLE applications (
    id SERIAL PRIMARY KEY,
    fullName VARCHAR(255) NOT NULL,
    fatherName VARCHAR(255) NOT NULL,
    dob DATE NOT NULL,
    gender VARCHAR(10) NOT NULL,
 resume_path VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    contactNumber VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE feedback
      (
        id SERIAL PRIMARY KEY,
        feedback  VARCHAR(500) NOT NULL
      );
