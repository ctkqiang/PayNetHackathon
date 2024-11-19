-- Create the 'PFM' database if it doesn't already exist
CREATE DATABASE IF NOT EXISTS `PFM`
    DEFAULT CHARACTER SET utf8mb4           -- Use UTF-8 encoding with support for emojis and special characters
    COLLATE utf8mb4_unicode_ci;             -- Set collation for Unicode compatibility

-- Switch to the 'PFM' database
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
) ENGINE=InnoDB 
  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;          -- Set character set and collation for the table

-- Create the 'TRANSACTIONS' table if it doesn't already exist
CREATE TABLE IF NOT EXISTS `TRANSACTIONS` (
    -- Define 'ID' as an auto-incrementing integer and set it as the primary key
    `ID` INT AUTO_INCREMENT PRIMARY KEY,                         -- Auto-incrementing primary key for transaction ID
    
    -- Define 'USERS_EMAIL' as a string (VARCHAR) with a maximum length of 255 characters
    -- This will store the email of the user to link transactions to a specific user in the USERS table
    `USERS_EMAIL` VARCHAR(255) NOT NULL,                         -- User email, linked to USERS table (NOT UNIQUE for FK relation)
    
    -- Define 'TOTAL_MONTHLY_INCOME' as a decimal type with 2 decimal places
    -- To store the total income of the user for the given month
    `TOTAL_MONTHLY_INCOME` DECIMAL(10, 2) NOT NULL,              -- Total monthly income as a decimal
    
    -- Define 'TOTAL_MONTHLY_EXPENSES' as a decimal type with 2 decimal places
    -- To store the total expenses of the user for the given month
    `TOTAL_MONTHLY_EXPENSES` DECIMAL(10, 2) NOT NULL,            -- Total monthly expenses as a decimal
    
    -- Define 'CREATED_AT' as a timestamp column to store when the transaction was created
    -- The DEFAULT CURRENT_TIMESTAMP ensures this is automatically set to the current time when the transaction is inserted
    `CREATED_AT` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,            -- Automatically set the creation timestamp
    
    -- Define a foreign key relationship with the 'USERS' table
    -- This links each transaction to a specific user via the 'USERS_EMAIL' column
    FOREIGN KEY (`USERS_EMAIL`) REFERENCES `USERS`(`EMAIL`)      -- Foreign key linking to USERS table (REFERENCING 'EMAIL')
        ON DELETE CASCADE                                        -- Cascade delete if the user is deleted (delete transactions)
        ON UPDATE CASCADE                                        -- Cascade update if the user’s email is updated
) ENGINE=InnoDB 
  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;            -- Set character set and collation for the table


-- Display column definitions for the 'USERS' table to inspect the structure of 'EMAIL' column
SHOW FULL COLUMNS FROM `USERS` LIKE 'EMAIL';

-- Display column definitions for the 'TRANSACTIONS' table to inspect the structure of 'USERS_EMAIL' column
SHOW FULL COLUMNS FROM `TRANSACTIONS` LIKE 'USERS_EMAIL';