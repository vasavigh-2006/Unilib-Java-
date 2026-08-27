# Quick Start Guide - Run Every Time

## 🚀 How to Run the Application

### Step 1: Start Backend (Spring Boot)

**Open Terminal/PowerShell:**

```bash
cd "C:\Users\vasav\OneDrive\Desktop\Final java project\library system\library"
mvn spring-boot:run
```

**Wait for:** `Started LibraryApplication` message

✅ **Backend is running on:** http://localhost:8080

**Keep this terminal open!**

---

### Step 2: Start Frontend (React)

**Open a NEW Terminal/PowerShell window:**

```bash
cd "C:\Users\vasav\OneDrive\Desktop\Final java project\library system\frontend"
npm start
```

**Wait for:** Browser to open automatically

✅ **Frontend is running on:** http://localhost:3000

---

## 📋 Quick Checklist

- [ ] MySQL is running
- [ ] Database `library_db` exists
- [ ] Backend terminal shows "Started LibraryApplication"
- [ ] Frontend terminal shows "Compiled successfully!"
- [ ] Browser opens to http://localhost:3000

---

## 🔑 Login Credentials

- **Username:** `admin`
- **Password:** `admin123`

---

## ⚠️ Important Notes

1. **Always start backend FIRST** (port 8080)
2. **Then start frontend** (port 3000)
3. **Keep both terminals open** while using the app
4. **Close terminals** to stop the application

---

## 🛑 To Stop the Application

1. **Stop Frontend:** Press `Ctrl+C` in frontend terminal
2. **Stop Backend:** Press `Ctrl+C` in backend terminal

---

## 💡 Tips

- **First time only:** Run `npm install` in frontend folder
- **If backend fails:** Check MySQL is running and database exists
- **If frontend fails:** Make sure backend is running first
- **Port already in use:** Close other applications using ports 8080 or 3000

---

## 📝 Summary

**Every time you want to use the app:**

1. Open Terminal 1 → `cd library` → `mvn spring-boot:run`
2. Open Terminal 2 → `cd frontend` → `npm start`
3. Wait for both to start
4. Browser opens automatically
5. Login and use the app!

That's it! 🎉

