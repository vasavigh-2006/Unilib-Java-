# 🏛️ UniLib — University Library Portal

A modern, full-stack University Library Management System built with **Spring Boot**, **MySQL**, and **React**.

---

## ✨ Features

- 🔐 **Role-Based Authentication**:
  - Secure Salted SHA-256 password hashing.
  - Dedicated **Admin** and **Student** portals.
  - Admin-only user registration for faculty and student accounts.
  - Built-in Self-Service Password Change.

- 🗂️ **Academic Section Explorer**:
  - 13 pre-categorized academic departments (Computer Science, Mathematics, Science & Nature, Literature, Engineering, etc.).
  - Interactive category cards & quick-filter tabs.
  - Real-time live search by title, author, or section.
  - Stock availability filter (*Available in Stock* / *Out of Stock*).

- 📖 **Book Loan & Return Management**:
  - 1-click book borrowing with auto stock decrement.
  - Duplicate borrow prevention per student.
  - Transparent **7-day return policy** with automated overdue calculation & daily fine tracking.
  - Transactional database stability.

- 📊 **Admin Dashboard & Analytics**:
  - Live metric counters (Total Books, Total Copies, Available Copies, Active Loans, Overdue Books, Total Users).
  - Full CRUD operations on the catalogue.
  - Complete university-wide loan history logs with return timestamps and fines collected.

- 🎨 **Modern & Responsive UI**:
  - Ambient blurred dynamic library background.
  - Warm amber academic theme.
  - Non-intrusive interactive Toast notifications.

---

## 🛠️ Tech Stack

### Backend
- **Java 17+**
- **Spring Boot 3** (Spring Web, Spring Data JPA)
- **MySQL 8.0**
- **Hibernate ORM**
- **Maven**

### Frontend
- **React.js 18**
- **Tailwind CSS**
- **Lucide / Emoji Icons**

---

## 🚀 Getting Started

### 1. Prerequisites
- [Java Development Kit (JDK 17+)](https://www.oracle.com/java/technologies/downloads/)
- [Node.js (v18+) & npm](https://nodejs.org/)
- [MySQL Server (v8.0+)](https://dev.mysql.com/downloads/installer/)

---

### 2. Database Setup
1. Start your MySQL Server.
2. Create the database:
```sql
CREATE DATABASE library_db;
```
3. Update database credentials in `library/src/main/resources/application.properties` if needed:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/library_db?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

---

### 3. Running the Backend (Spring Boot)
Open a terminal in the backend directory:
```bash
cd library
./mvnw spring-boot:run
```
*(Or use `mvn spring-boot:run`)*. The backend server runs at `http://localhost:8080`.

---

### 4. Running the Frontend (React)
Open a terminal in the frontend directory:
```bash
cd frontend
npm install
npm start
```
The application will launch automatically at `http://localhost:3000`.

---

## 🔑 Default Credentials

| Role | Username | Password |
|---|---|---|
| 👑 **Admin** | `admin` | `admin123` |
| 🎓 **Student** | `student` | `student123` |

*(Admins can create additional students or admins directly from the Admin Dashboard).*

---

## 📄 License
This project is open source and available under the [MIT License](LICENSE).
