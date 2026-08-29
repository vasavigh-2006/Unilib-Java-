# 🏛️ UniLib — University Library Portal

A clean, modern University Library Management System built with **React**, **Spring Boot**, and **MySQL**.

---

## 🌐 Live Application

- **Frontend:** [https://unilib-java.vercel.app/](https://unilib-java.vercel.app/)
- **Backend API:** [https://unilib-java-production.up.railway.app](https://unilib-java-production.up.railway.app)

---

## ✨ Features

- **🔐 Simple & Realistic Authentication**:
  - **Students:** Log in using their **USN** as Username and physical **Library Card Number** as Password.
  - **Admins:** Manage the library catalogue, register new student profiles, and track loans.
  - Role-based security with salted password hashing.

- **📚 Catalog & Search**:
  - Browse books across various academic departments (Computer Science, Mathematics, Science, Literature, Engineering, etc.).
  - Real-time search by title, author, or category.
  - Live stock tracking (*Available* / *Out of Stock*).

- **⏱️ Circulation & Loan Policy**:
  - **7-Day Lending Period:** Free book borrowing for 7 days with live countdown badges.
  - **Book Renewal:** Extend active loans by +7 days (up to 2 times).
  - **Late Fee Calculation:** Automated ₹10/day fine calculation for overdue returns.

- **💵 Counter Fine Settlement**:
  - Students settle overdue fines in person at the library desk.
  - Admin marks late fees as paid, updating real-time library financial stats.

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Java 17, Spring Boot 3, Spring Data JPA, Hibernate
- **Database:** MySQL 8.0
- **Deployment:** Vercel (Frontend), Railway (Backend & Cloud Database)

---

## 🚀 Local Setup

### 1. Prerequisites
- Java 17+ & Maven
- Node.js (v18+) & npm
- MySQL Server

### 2. Backend Setup
1. Create a MySQL database named `library_db`.
2. Configure credentials in `library/src/main/resources/application.properties`.
3. Run the Spring Boot app:
   ```bash
   cd library
   mvn spring-boot:run
   ```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```
The React app will launch at `http://localhost:3000`.

---

## 📄 License
This project is open-source under the [MIT License](LICENSE).
