-- Script to clear all data from Library Management System
-- Run this in MySQL to get a fresh start

USE library_db;

-- Disable foreign key checks temporarily
SET FOREIGN_KEY_CHECKS = 0;

-- Delete all records from tables
TRUNCATE TABLE borrow;
TRUNCATE TABLE book;
TRUNCATE TABLE user;
TRUNCATE TABLE student;

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

-- Recreate default admin user
INSERT INTO user (username, password, role, student_id) 
VALUES ('admin', 'admin123', 'ADMIN', NULL);

SELECT 'Database cleared successfully! Default admin user created.' AS message;
SELECT 'Username: admin, Password: admin123' AS credentials;

