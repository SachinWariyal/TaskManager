# 📋 Task Manager App (React)

This is a simple task management application built using **React** and **Bootstrap**, with support for:

* ✅ User registration & login (localStorage-based)
* ✅ Create, update, delete tasks
* ✅ Export tasks to Excel (.xlsx)
* ✅ Import tasks from Excel/CSV



## 🚀 Tech Stack

* **Frontend:** React, React Bootstrap, Formik, Yup
* **Storage:** LocalStorage
* **Excel Support:** xlsx, file-saver

---

## 📦 Installation

1. **Clone the repo**

   ```bash
   git clone https://github.com/your-username/task-manager-localstorage.git
   cd task-manager-localstorage
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

---

## 📝 Features

### ✅ Authentication (LocalStorage)

* Registers new users
* Stores logged in user data in `localStorage`

### ✅ Task CRUD

* Create, edit, delete personal tasks
* Each task has: title, description, effort (in days), due date

### 📤 Export Tasks to Excel

* Click **"Export to Excel"** to download all your tasks

### 📥 Import Tasks from Excel/CSV

* Upload `.xlsx` or `.csv` file to bulk insert tasks
* Required columns:

  * `title`
  * `description`
  * `effort_days`
  * `due_date`

---

## 📁 Folder Structure

```
src/
├── components/         # Reusable components (Navbar, FormGroup, etc)
├── context/            # AuthContext for local auth handling
├── pages/              # Register, Login, TaskList, TaskForm
├── services/           # taskService.js (localStorage CRUD)
├── App.jsx             # Routes and layout
├── index.js            # Entry point
```

---

## 📌 Notes

* No backend setup needed, just run and use.
* LocalStorage resets when browser cache is cleared.

---

## 📷 Screenshots


## 🤝 Contributing


## 📄 License


## ✨ Author

Made by Sachin Wariyal
