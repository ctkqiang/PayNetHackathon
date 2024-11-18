-- Define variables for database configuration
SET @db_host = 'localhost'; 
SET @db_user = 'PAYNET_HACKATHON';
SET @db_password = 'M3z!pXw@q9L7'; 
SET @db_name = 'PFM';

-- Create the new user dynamically
SET @create_user_query = CONCAT(
    'CREATE USER IF NOT EXISTS \'',
    @db_user, 
    '\'@\'%\' IDENTIFIED BY \'', 
    @db_password, 
    '\';'
);

PREPARE stmt FROM @create_user_query;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Grant all privileges on the specified database to the new user dynamically
SET @grant_privileges_query = CONCAT(
    'GRANT ALL PRIVILEGES ON ', 
    @db_name, 
    '.* TO \'', 
    @db_user, 
    '\'@\'%\';'
);

PREPARE stmt FROM @grant_privileges_query;

EXECUTE stmt;

DEALLOCATE PREPARE stmt;

-- Ensure the changes take effect
FLUSH PRIVILEGES;

-- Output a confirmation message
SELECT 
    CONCAT(
        'User "', 
        @db_user, 
        '" has been created and granted access to the database "', 
        @db_name, 
        '".'
    );
