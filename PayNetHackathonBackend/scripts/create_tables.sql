-- Create the 'PFM' database if it doesn't already exist
CREATE DATABASE IF NOT EXISTS `PFM`;

USE `PFM`;

-- Create the 'USERS' table if it doesn't already exist
CREATE TABLE IF NOT EXISTS `USERS` (
    -- Define 'ID' as an auto-incrementing integer and set it as the primary key
    -- The primary key ensures that the ID is unique for each user in the table
    -- The auto-increment feature automatically assigns a unique ID to each new user
    `ID` INT AUTO_INCREMENT PRIMARY KEY,                        -- Auto-incrementing primary key for user ID
    
    -- Define 'NAME' as a string (VARCHAR) with a maximum length of 255 characters
    -- The NOT NULL constraint ensures that this column cannot be empty when creating a user
    `NAME` VARCHAR(255) NOT NULL,                               -- User's name (255 characters max)
    
    -- Define 'EMAIL' as a string (VARCHAR) with a maximum length of 255 characters
    -- The NOT NULL constraint ensures that an email must be provided
    -- The UNIQUE constraint ensures that no two users can share the same email address
    `EMAIL` VARCHAR(255) NOT NULL UNIQUE,                       -- User's email, must be unique
    
    -- Define 'PASSWORD' as a string (VARCHAR) with a maximum length of 255 characters
    -- The NOT NULL constraint ensures that a password must be provided for each user
    `PASSWORD` VARCHAR(255) NOT NULL,                           -- User's password
    
    -- Define 'CREATEDAT' as a timestamp column
    -- The DEFAULT CURRENT_TIMESTAMP ensures that this field is automatically populated with the current time when the record is inserted
    `CREATEDAT` TIMESTAMP DEFAULT CURRENT_TIMESTAMP             -- Automatically set the creation timestamp
);
