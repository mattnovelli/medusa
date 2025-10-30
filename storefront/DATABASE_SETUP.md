# Database Configuration

## PostgreSQL Setup

To use the repair request form, you need to configure PostgreSQL database connection details.

### Environment Variables

Add the following environment variables to your `.env.local` file:

```env
# PostgreSQL Connection Details
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DATABASE=your_database_name
POSTGRES_USER=your_username
POSTGRES_PASSWORD=your_password
```

### Database Schema

The repair request system requires a table called `repair_requests`. You can create it using the following SQL:

```sql
CREATE TABLE IF NOT EXISTS repair_requests (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  contact_method VARCHAR(10) NOT NULL CHECK (contact_method IN ('email', 'phone')),
  item VARCHAR(500) NOT NULL,
  issue TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_repair_requests_email ON repair_requests(email);
CREATE INDEX IF NOT EXISTS idx_repair_requests_created_at ON repair_requests(created_at);
```

### Setup Instructions

1. **Install PostgreSQL** (if not already installed)
   - For local development: Download from https://www.postgresql.org/download/
   - For production: Use a service like AWS RDS, Google Cloud SQL, or Digital Ocean Managed Databases

2. **Create a database**
   ```sql
   CREATE DATABASE your_database_name;
   ```

3. **Create the table** using the SQL schema above

4. **Update environment variables** in your `.env.local` file with your actual connection details

5. **Test the connection** (optional)
   - You can add a test function call in your code to verify the connection is working

### Error Handling

The system includes comprehensive error handling:
- Form validation (required fields, email format)
- Database connection errors
- SQL query errors
- User-friendly error messages

### Security Considerations

- Database credentials are stored in environment variables
- SQL queries use parameterized statements to prevent SQL injection
- Connection pooling is used for better performance
- Client connections are properly released after use

### Form Data Structure

The repair request form captures:
- `name`: Customer's full name
- `email`: Customer's email address
- `phone`: Customer's phone number
- `contact_method`: Preferred contact method ('email' or 'phone')
- `item`: Description of the item needing repair
- `issue`: Detailed description of the problem

All data is validated before being stored in the database.