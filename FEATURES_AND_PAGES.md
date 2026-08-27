# Library Management System - Features & Pages

## 📄 PAGES IN THE WEBSITE

### 1. **LOGIN PAGE** (`/`)
**Access:** Public (before login)

**Features:**
- User login form (Username & Password)
- User registration form (Admin only)
- Toggle between Login and Register
- Default admin credentials hint
- Beautiful blurred library background

**What Users Can Do:**
- Login with username/password
- Register new users (Admin role required)
- Switch between login and registration forms

---

### 2. **ADMIN DASHBOARD** (`/admin`)
**Access:** Admin users only

**Features:**
- Navigation bar with "Library Management System" title
- Welcome message with username
- Logout button
- Book management section
- User registration section

**Admin Can:**
- ✅ View all books in a table
- ✅ Add new books (Title, Author, Total Copies)
- ✅ Edit existing books (Update title, author, copies)
- ✅ Delete books
- ✅ Register new users (Admin or Student)
- ✅ See book availability (Available copies badges)

**UI Components:**
- "+ Add Book" button
- "+ Register User" button
- Books table with Edit/Delete actions
- Book form (appears when adding/editing)
- User registration form (appears when registering)

---

### 3. **STUDENT DASHBOARD** (`/student`)
**Access:** Student users only

**Features:**
- Navigation bar with "Library Management System" title
- Welcome message with username
- Logout button
- "My Borrowed Books" section
- All Books section

**Student Can:**
- ✅ View all available books
- ✅ Borrow books (if available)
- ✅ View borrowed books list
- ✅ See borrow date and days borrowed
- ✅ See potential fine calculation
- ✅ Return borrowed books
- ✅ See fine amount after returning (if overdue)

**UI Components:**
- "My Borrowed Books" table (shows active borrows)
- Books table with Borrow button
- Fine calculation display
- Return button for each borrowed book

---

## 🔑 KEY FEATURES

### **Authentication Features**
1. **Login**
   - Username/password authentication
   - Role-based access (ADMIN/STUDENT)
   - Session persistence (localStorage)
   - Error handling for invalid credentials

2. **Registration** (Admin Only)
   - Create new users
   - Assign roles (ADMIN or STUDENT)
   - Auto-creates Student entity for STUDENT role
   - Username validation (no duplicates)

---

### **Book Management Features** (Admin Only)

1. **View All Books**
   - Display in clean table format
   - Shows: Title, Author, Total Copies, Available Copies
   - Color-coded availability badges (Green = Available, Red = Unavailable)

2. **Add Book**
   - Form fields: Title, Author, Total Copies
   - Auto-sets available copies = total copies
   - Validation for required fields

3. **Edit Book**
   - Update: Title, Author, Total Copies, Available Copies
   - Pre-filled form with existing data
   - Validation for required fields

4. **Delete Book**
   - Confirmation dialog before deletion
   - Removes book from database

---

### **Borrow/Return Features** (Student Only)

1. **Borrow Book**
   - Click "Borrow" button on available books
   - Checks book availability
   - Creates borrow record
   - Updates available copies automatically
   - Shows success message

2. **View Borrowed Books**
   - Table showing:
     - Book title
     - Borrow date
     - Days borrowed
     - Potential fine (if overdue)
   - Only shows active (not returned) borrows

3. **Return Book**
   - Click "Return" button
   - Calculates fine if overdue (>7 days)
   - Fine formula: (days - 7) × ₹10
   - Updates book availability
   - Shows fine amount in alert

4. **Fine Calculation**
   - Displayed before return (potential fine)
   - Calculated on return (actual fine)
   - No fine if returned within 7 days
   - Fine shown in red if applicable

---

### **User Management Features** (Admin Only)

1. **Register New User**
   - Form fields: Username, Password, Role
   - Role selection: ADMIN or STUDENT
   - Creates User entity
   - Auto-creates Student entity for STUDENT role

---

## 🎨 UI/UX FEATURES

### **Design Elements**
- ✅ Blurred library background image
- ✅ Warm amber/orange color scheme
- ✅ Card-based layout
- ✅ Clean, modern tables
- ✅ Responsive design
- ✅ Hover effects on buttons and rows
- ✅ Color-coded status badges
- ✅ Professional navigation bars

### **User Experience**
- ✅ Loading states on buttons
- ✅ Success/error alerts
- ✅ Confirmation dialogs for delete
- ✅ Form validation
- ✅ Auto-refresh after operations
- ✅ Session persistence (stays logged in)
- ✅ Clear error messages

---

## 📊 DATA DISPLAYED

### **Books Table Shows:**
- Title
- Author
- Total Copies
- Available Copies (with color badge)
- Actions (Edit/Delete for Admin, Borrow for Student)

### **Borrowed Books Table Shows:**
- Book Title
- Borrow Date
- Days Borrowed
- Potential Fine
- Return Button

---

## 🔐 ROLE-BASED ACCESS

### **ADMIN Role:**
- Full book management (CRUD)
- User registration
- View all books
- Cannot borrow/return books

### **STUDENT Role:**
- View all books
- Borrow books
- Return books
- View borrowed books
- Cannot manage books or users

---

## 🚀 TECHNICAL FEATURES

- **Frontend:** React with Hooks (useState, useEffect)
- **Styling:** Tailwind CSS
- **API Calls:** Fetch API
- **State Management:** React State (no Redux)
- **Data Persistence:** localStorage for session and borrows
- **Backend:** Spring Boot REST API
- **Database:** MySQL

---

## 📱 RESPONSIVE DESIGN

- Works on desktop
- Works on tablets
- Works on mobile devices
- Scrollable tables on small screens

---

## ✨ SPECIAL FEATURES

1. **Fine Calculation:** Automatic fine calculation for overdue books
2. **Availability Tracking:** Real-time book availability updates
3. **Borrow History:** Track borrowed books locally
4. **Role Separation:** Different UI for Admin and Student
5. **Session Management:** Auto-login on page refresh
6. **Error Handling:** User-friendly error messages
7. **Loading States:** Visual feedback during API calls

---

## 📋 SUMMARY

**Total Pages:** 3
- Login Page
- Admin Dashboard
- Student Dashboard

**Total Features:** 15+
- Authentication (Login/Register)
- Book Management (Add/Edit/Delete/View)
- Borrow/Return System
- Fine Calculation
- User Management
- Role-Based Access Control
- Session Persistence
- Real-time Updates

This is a complete, production-ready Library Management System! 🎉




