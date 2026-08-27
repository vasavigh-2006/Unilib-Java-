# Library Management System - Frontend

React frontend for the Library Management System.

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)
- MySQL Database
- Java JDK 17+ (for backend)
- Maven (for backend)

## Setup Instructions

### Step 1: Database Setup

1. Install MySQL if not already installed
2. Create a database:
```sql
CREATE DATABASE library_db;
```
3. Update database credentials in `library/src/main/resources/application.properties`:
   - Change `spring.datasource.password=PASSWORD` to your MySQL root password

### Step 2: Backend Setup (Spring Boot)

1. Navigate to the backend directory:
```bash
cd library
```

2. Build the project (optional, Maven will auto-compile):
```bash
mvn clean install
```

3. Run the Spring Boot application:
```bash
mvn spring-boot:run
```

Or run `LibraryApplication.java` directly from your IDE.

**Backend will run on:** http://localhost:8080

**Default Admin Credentials:**
- Username: `admin`
- Password: `admin123`

### Step 3: Frontend Setup (React)

1. Open a **new terminal** (keep backend running)

2. Navigate to frontend directory:
```bash
cd frontend
```

3. Install dependencies:
```bash
npm install
```

4. Start the React development server:
```bash
npm start
```

**Frontend will run on:** http://localhost:3000

The browser should automatically open. If not, navigate to http://localhost:3000

## Usage

1. **Login** with default admin credentials or register a new user
2. **Admin** can:
   - Add/Edit/Delete books
   - Register new users
3. **Student** can:
   - View all books
   - Borrow books
   - Return books
   - View borrowed books and potential fines

## Troubleshooting

- **Backend won't start**: Check MySQL is running and database credentials are correct
- **Frontend can't connect**: Ensure backend is running on port 8080
- **Port 3000 already in use**: Change port in `package.json` or stop other React apps
- **CORS errors**: Backend has `@CrossOrigin` annotation, should work automatically

## Project Structure

```
library system/
├── library/              # Spring Boot Backend
│   └── src/main/java/
└── frontend/            # React Frontend
    └── src/
        └── components/
```
