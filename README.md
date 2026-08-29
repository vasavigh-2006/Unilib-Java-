# 🏛️ UniLib — Enterprise University Integrated Library System (ILS)

[![Live Frontend](https://img.shields.io/badge/Frontend-Vercel-black?style=for-the-badge&logo=vercel)](https://unilib-java.vercel.app/)
[![Live Backend](https://img.shields.io/badge/Backend-Railway-0B0D0E?style=for-the-badge&logo=railway)](https://unilib-java-production.up.railway.app)
[![Java](https://img.shields.io/badge/Java-17%2B-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)

**UniLib** is an enterprise-grade, production-ready **University Library Management & Circulation System** designed specifically around real-world higher education academic workflows. Built with a distributed microservices-style cloud architecture using **Spring Boot 3**, **React 18**, and **Cloud MySQL 8.0**.

---

## 🌐 Live Production Deployments

- **🌐 Live Web Application:** [https://unilib-java.vercel.app/](https://unilib-java.vercel.app/)
- **⚙️ Live Backend API:** [https://unilib-java-production.up.railway.app](https://unilib-java-production.up.railway.app)
- **📦 Cloud Database:** Managed MySQL 8.0 instance on Railway Private Network

---

## 🏗️ System Architecture

```
                                  ┌───────────────────────────┐
                                  │   University Students /   │
                                  │      Library Staff        │
                                  └─────────────┬─────────────┘
                                                │ HTTPS
                                                ▼
                        ┌───────────────────────────────────────────────┐
                        │      React 18 Single Page Application        │
                        │       (Hosted on Vercel Global CDN)          │
                        │   - Smart API Base Auto-Discovery             │
                        │   - Amber Academic UI & Responsive Dashboard │
                        └───────────────────────┬───────────────────────┘
                                                │ REST API (JSON)
                                                ▼
                        ┌───────────────────────────────────────────────┐
                        │       Spring Boot 3 RESTful Microservice     │
                        │         (Hosted on Railway Container)        │
                        │   - Role-Based Access Control (RBAC)         │
                        │   - Temporal Loan & Fine Calculation Engine  │
                        │   - Transactional Concurrency Management     │
                        └───────────────────────┬───────────────────────┘
                                                │ JDBC / Hibernate ORM
                                                ▼
                        ┌───────────────────────────────────────────────┐
                        │        Managed Cloud MySQL 8.0 Engine         │
                        │            (Railway Private Network)          │
                        │   - Relational Schema (Users, Books, Borrows) │
                        │   - Foreign Key Integrity & Indexed Queries   │
                        └───────────────────────────────────────────────┘
```

---

## 🌟 Core System Capabilities

### 1. 🎓 Institutional Authentication & Identity
- **No Self-Registration:** Public sign-up is disabled to preserve institutional data integrity; only authenticated Admins (Librarians) can register student profiles.
- **USN as Primary Login Identifier:** Students log in using their official University Seat Number (e.g. `1BM24CS387`).
- **Library Card Number as Password:** Password defaults to the student's physical Library Card Number (e.g. `LIB-94820`), eliminating password loss issues.
- **Academic Profiling:** Students are categorized by **Full Name**, **USN**, **Academic Department**, and **Section (A–Z)**.
- **Password Security:** Salted SHA-256 password hashing.

### 2. 📚 Academic Catalog & Inventory Control
- **60+ Pre-Seeded Academic Titles:** Curated textbooks across 13 disciplines (Computer Science, AI & ML, Mechanical, Civil, Mathematics, Literature, Economics, etc.).
- **Atomic Stock Management:** Available copies decrement when borrowed and increment when returned.
- **Out of Stock Protection:** Borrowing is locked when stock is 0.
- **Safe Delete Policy:** Books with active unreturned student loans cannot be deleted until all copies are returned.
- **Real-Time Live Search & Categorization:** Fast search by title, author, or discipline with quick-filter pills.

### 3. ⏱️ Circulation Lifecycle & Loan Extension (Renewals)
- **7-Day Standard Lending Period:** Due date automatically calculated as `Borrow Date + 7 Days`.
- **Anti-Hoarding Rule:** Prevents a student from borrowing multiple copies of the exact same title simultaneously.
- **Live Countdown Timers:** Real-time badges indicating `✓ X days left` vs `⚠️ Overdue by X days`.
- **Book Renewal (+7 Days Extension):**
  - Allows students to extend their loan duration by +7 days.
  - **On-time rule:** Strictly blocks renewals on overdue books.
  - **Max limit:** Capped at **2 renewals per loan** to ensure fair access for other students.

### 4. 💵 Financial Ledger & Counter Fine Settlement
- **Automated Fine Algorithm:** Accurately charges **₹10 / day** starting from Day 8 overdue.
- **Multi-State Fine Lifecycle:**
  $$\text{Active Loan} \xrightarrow{\text{Return Late}} \text{⚠️ Due at Counter (Unpaid)} \xrightarrow{\text{Cash Settled}} \text{✓ Paid \& Cleared}$$
- **Counter Payment Settlement:** Librarian can verify cash payments at the issue desk and click **`[✓ Mark Paid]`** to record the transaction with an immutable timestamp.
- **Live Financial Ledger:** Real-time aggregate metric cards for **💵 Fines Collected** and **⚠️ Pending Dues**.

---

## 📡 REST API Reference

### 🔐 Authentication (`/auth`)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/login` | Authenticates User (Admin or Student via USN + Card No) |
| `POST` | `/auth/register` | Registers a new Admin or Student profile |
| `POST` | `/auth/change-password` | Updates user password |
| `GET` | `/auth/users` | Retrieves all registered user accounts (Admin only) |

### 📚 Catalog Management (`/books`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/books/all` | Retrieves complete book catalog |
| `GET` | `/books/search?query={q}` | Searches books by title, author, or category |
| `GET` | `/books/stats` | Retrieves live library statistics & fine ledger metrics |
| `POST` | `/books/add` | Adds a new book title to catalog |
| `PUT` | `/books/update/{id}` | Updates book details and stock |
| `DELETE` | `/books/delete/{id}` | Deletes book (validates no active loans exist) |

### 📖 Circulation & Lending (`/borrow`)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/borrow/take?studentId={sId}&bookId={bId}` | Borrows a book copy (decrements stock) |
| `POST` | `/borrow/return/{borrowId}` | Returns a book copy (increments stock & computes fine) |
| `POST` | `/borrow/renew/{borrowId}` | Extends loan by +7 days (max 2x, on-time only) |
| `POST` | `/borrow/settle-fine/{borrowId}` | Marks counter fine payment as Paid & Cleared |
| `GET` | `/borrow/student/{studentId}` | Retrieves borrow history for a specific student |
| `GET` | `/borrow/all` | Retrieves university-wide borrow logs (Admin only) |

---

## 💻 Tech Stack

- **Backend:** Java 17, Spring Boot 3, Spring Data JPA, Hibernate ORM, Maven
- **Frontend:** React 18, Tailwind CSS, Lucide Icons, Fetch API
- **Database:** MySQL 8.0 (InnoDB, Foreign Key Constraints, Connection Pooling)
- **Deployment:** Vercel (Frontend CDN), Railway (Backend Container + Cloud MySQL)

---

## 🚀 Local Development Setup

### 1. Prerequisites
- [JDK 17+](https://www.oracle.com/java/technologies/downloads/)
- [Node.js (v18+) & npm](https://nodejs.org/)
- [MySQL Server (v8.0+)](https://dev.mysql.com/downloads/installer/)

---

### 2. Database Configuration
1. Open MySQL terminal and create the database:
   ```sql
   CREATE DATABASE library_db;
   ```
2. Verify credentials in `library/src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/library_db
   spring.datasource.username=root
   spring.datasource.password=YOUR_MYSQL_PASSWORD
   spring.jpa.hibernate.ddl-auto=update
   ```

---

### 3. Running the Backend
```bash
cd library
mvn clean spring-boot:run
```
*Backend runs on `http://localhost:8080`.*

---

### 4. Running the Frontend
```bash
cd frontend
npm install
npm start
```
*Frontend runs on `http://localhost:3000` and automatically connects to local backend.*

---

## 🔑 Default Credentials & Quick Testing

| Role | Username / Identifier | Password | Access Level |
|---|---|---|---|
| 👑 **Administrator** | `admin` | `admin123` | Full Catalogue, User Registration, Counter Fine Clearance |
| 🎓 **Student Sample** | *USN* (e.g. `1BM24CS387`) | *Card No* (e.g. `LIB94820`) | Browse, Borrow, Loan Countdown, Renew (+7 Days) |

---

## 📄 License
This project is open-source and licensed under the [MIT License](LICENSE).
