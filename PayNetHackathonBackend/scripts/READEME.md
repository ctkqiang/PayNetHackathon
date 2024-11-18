# MySQL User Setup for PAYNET_HACKATHON

This guide provides the steps to create a MySQL user for the PAYNET_HACKATHON project and test the connection to the database. Follow the instructions below to ensure proper setup.

---

## Prerequisites

1. **MySQL installed** on your system.
2. **`create_user.sql` script**: A SQL file that defines the creation of the required user and permissions.
3. **Database credentials**:
   - **Root User**: The administrator account for MySQL.
   - **New User**: Credentials for the project user (`PAYNET_HACKATHON`).
   - **Database**: The database to be accessed (`PFM`).

---

## Steps

### 1. Create the User and Grant Privileges

Run the following command to execute the `create_user.sql` script. This will create the user and grant the necessary permissions:

```bash
mysql -u root -p < create_user.sql
```

- **`-u root`**: Specifies the MySQL root user.
- **`-p`**: Prompts for the root user password.
- **`< create_user.sql`**: Executes the SQL script to set up the user.

### 2. Verify User Access

Log in with the newly created user to confirm it has the correct permissions for the database:

```bash
mysql -u PAYNET_HACKATHON -p -h localhost -D PFM
```

- **`-u PAYNET_HACKATHON`**: Specifies the new MySQL user.
- **`-p`**: Prompts for the password of the new user.
- **`-h localhost`**: Connects to the local MySQL server.
- **`-D PFM`**: Connects directly to the specified database.

### 3. Expected Output

After logging in, you should see the MySQL prompt (`mysql>`), confirming that the user has been set up correctly. You can then test queries to verify database access.

Example:

```sql
SHOW TABLES;
```

---

## Sample `create_user.sql` Script

Here’s the `create_user.sql` file for reference:

```sql
SET @db_user = 'PAYNET_HACKATHON';
SET @db_password = 'YourSecurePasswordHere';
SET @db_name = 'PFM';

CREATE USER IF NOT EXISTS @db_user@'%' IDENTIFIED BY @db_password;
GRANT ALL PRIVILEGES ON @db_name.* TO @db_user@'%';
FLUSH PRIVILEGES;

SELECT CONCAT('User "', @db_user, '" created with access to database "', @db_name, '".');
```

---

## Troubleshooting

1. **Access Denied for User:**

   - Ensure the username and password match those in the `create_user.sql` script.
   - Verify that the database exists (`PFM`) and is accessible.

2. **User Already Exists:**

   - Use the `DROP USER 'PAYNET_HACKATHON'@'%'` command before rerunning the script.

3. **Missing Permissions:**
   - Double-check that the `GRANT` statement in `create_user.sql` covers all required privileges.
