# Library Management System - Complete Setup Guide

## Quick Start

### Prerequisites Checklist
- [ ] MySQL installed and running
- [ ] Java JDK 17+ installed
- [ ] Maven installed (or use IDE Maven)
- [ ] Node.js and npm installed

---

## Step-by-Step Setup

### 1. Database Setup

**Create MySQL Database:**
```sql
CREATE DATABASE library_db;
```

**Update Database Password:**
Edit `library/src/main/resources/application.properties`:
```properties
spring.datasource.password=YOUR_MYSQL_PASSWORD
```
Replace `PASSWORD` with your actual MySQL root password.

---

### 2. Start Backend (Spring Boot)

**Option A: Using Maven (Command Line)**
```bash
cd library
mvn spring-boot:run
```

**Option B: Using IDE**
1. Open `library` folder in your IDE (IntelliJ IDEA, Eclipse, VS Code)
2. Open `LibraryApplication.java`
3. Run the main method

**Backend URL:** http://localhost:8080

✅ **Verify Backend is Running:**
- Check console for "Started LibraryApplication"
- No errors about database connection

---

### 3. Start Frontend (React)

**Open a NEW terminal window** (keep backend running)

```bash
cd frontend
npm install
npm start
```

**Frontend URL:** http://localhost:3000

✅ **Verify Frontend is Running:**
- Browser opens automatically
- No console errors
- Login page appears

---

## Login Credentials

**Default Admin:**
- Username: `admin`
- Password: `admin123`

---

## Testing the Application

### Admin Features:
1. Login as admin
2. Click "+ Add Book" to add a book
3. Click "Edit" to modify a book
4. Click "Delete" to remove a book
5. Click "+ Register User" to create new users

### Student Features:
1. Register a new student user (as admin)
2. Logout and login as student
3. View all books
4. Click "Borrow" on available books
5. View "My Borrowed Books" section
6. Click "Return" to return books

---

## Common Issues & Solutions

### Issue: Backend won't start
**Solution:**
- Check MySQL is running: `mysql -u root -p`
- Verify database exists: `SHOW DATABASES;`
- Check password in `application.properties`

### Issue: Frontend shows connection error
**Solution:**
- Ensure backend is running on port 8080
- Check browser console for CORS errors
- Verify API_BASE in `App.js` is `http://localhost:8080`

### Issue: Port 3000 already in use
**Solution:**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill
```

### Issue: npm install fails
**Solution:**
```bash
# Clear cache and retry
npm cache clean --force
npm install
```

### Issue: Student can't borrow books
**Solution:**
- Ensure student was registered (creates Student entity)
- Check browser console for errors
- Verify user.student.id exists in localStorage

---

## Development Notes

- **Backend Port:** 8080 (configured in `application.properties`)
- **Frontend Port:** 3000 (default React port)
- **Database:** MySQL on localhost:3306
- **Auto-reload:** Both backend and frontend support hot-reload

---

## Stopping the Application

1. **Stop Frontend:** Press `Ctrl+C` in frontend terminal
2. **Stop Backend:** Press `Ctrl+C` in backend terminal or stop in IDE

---

## Production Build

**Frontend Production Build:**
```bash
cd frontend
npm run build
```
Output will be in `frontend/build/` folder.

**Backend Production:**
```bash
cd library
mvn clean package
java -jar target/library-0.0.1-SNAPSHOT.jar
```


