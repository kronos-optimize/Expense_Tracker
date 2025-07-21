# 💰 Expense Tracker App

A modern, responsive expense tracking application built with **Next.js 14** frontend and **Express.js** backend. Track your expenses efficiently with a beautiful green-themed UI and comprehensive features.

---

## 🌟 Features

### 🔐 Authentication System
- **User Registration** – Create new accounts with email and password (passwords securely hashed with bcrypt)
- **User Login** – Secure login with JWT token storage
- **Forgot Password** – Password reset with email and new password
- **Session Management** – Automatic logout and token handling

### 💸 Expense & Income Management
- **Add Expenses/Incomes** – Create new entries with title, amount, date, category, and notes
- **Edit & Delete** – Update or remove entries with confirmation
- **User-Specific Categories** – Each user has their own set of income and expense categories
- **Category Management** – Create, view, and manage categories filtered by logged-in user

### 📊 Dashboard & Analytics
- **Summary Cards** – View spending and income totals for week, month, and last 3 months
- **Filtering** – Filter by time periods and custom date ranges
- **Category Organization** – Color-coded categories per user

### 🎨 User Interface
- **Modern Design** – Clean, intuitive interface with green primary theme
- **Dark Mode Support** – Toggle between light and dark themes
- **Responsive Layout** – Works perfectly on desktop, tablet, and mobile
- **Toast Notifications** – User-friendly success and error messages

---


## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern UI component library
- **Lucide React** - Beautiful icons

### Backend
- **Express.js** – Node.js web framework
- **Sequelize ORM** – Database ORM
- **JWT Authentication** – Secure token-based auth
- **bcryptjs** – Password hashing
- **MySQL** – Database

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kronos-optimize/Expense_Tracker.git
   cd expense-tracker
   ```

2. **Configure environment variables**

   - **Backend:**  
     Create a `.env` file inside the `backend` folder with your database credentials:
     ```
     DB_HOST=localhost
     DB_USER=root
     DB_PASS=your_mysql_password
     DB_NAME=expense_tracker
     PORT=4000
     JWT_SECRET=your_jwt_secret
     ```

   - **Frontend:**  
     Create a `.env.local` file in the root of your frontend (Next.js) project:
     ```
     NEXT_PUBLIC_API_URL=http://localhost:4000
     ```

3. **Run the backend server**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

4. **Run the frontend server**
   ```bash
   cd ../
   npm install
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
expense-tracker/
├── backend/                    # Express.js backend
│   ├── controllers/            # Route controllers
│   ├── models/                 # Sequelize models
│   ├── routes/                 # API routes
│   ├── db/                     # Database config and seeders
│   ├── server.js               # Express app entry
│   └── ...                     # Other backend files
├── app/                        # Next.js App Router
│   ├── dashboard/              # Dashboard pages
│   ├── ...                     # Other frontend pages
├── components/                 # Reusable components
├── lib/                        # Utility functions
├── public/                     # Static assets
├── ...                         # Other config files
```

---

### 🔌 API Endpoints 

#### Authentication Endpoints
```
- POST /api/users/register – Register new user
- POST /api/users/login – Login, returns { token, user: { id, email } }
- POST /api/users/forgot-password – Reset password
```

#### Expense & Income Endpoints
```
- GET /api/expenses – Get all expenses (filtered by user)
- POST /api/expenses – Add new expense
- GET /api/expenses/:id – Get expense by ID
- PUT /api/expenses/:id – Update expense
- DELETE /api/expenses/:id – Delete expense

- GET /api/incomes – Get all incomes (filtered by user)
- POST /api/incomes – Add new income
- GET /api/incomes/:id – Get income by ID
- PUT /api/incomes/:id – Update income
- DELETE /api/incomes/:id – Delete income

- GET /api/categories/expenses – Get expense categories for logged-in user
- POST /api/categories/expenses – Create expense category for logged-in user
- GET /api/categories/incomes – Get income categories for logged-in user
- POST /api/categories/incomes – Create income category for logged-in user
```

---

### Database Schema (Simplified)

#### Users Table
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

#### IncomeCategory & ExpenseCategory Tables (user-specific)
```sql
CREATE TABLE income_categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  description VARCHAR(255),
  userId INT NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE expense_categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  description VARCHAR(255),
  userId INT NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);
```

#### Expenses & Incomes Table
```sql
CREATE TABLE expenses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  date DATE NOT NULL,
  notes TEXT,
  userId INT NOT NULL,
  categoryId INT NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (categoryId) REFERENCES expense_categories(id) ON DELETE CASCADE
);

CREATE TABLE incomes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  date DATE NOT NULL,
  notes TEXT,
  userId INT NOT NULL,
  categoryId INT NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (categoryId) REFERENCES income_categories(id) ON DELETE CASCADE
);
```

---

## 📝 Seeding Logic

- **Seed runs only once:** On first run, if no users exist, initial users and categories are created.
- **User-specific categories:** Each user gets their own set of income and expense categories.
- **Passwords are hashed** before saving users.

---

## 🎯 Current Status

- ✅ Backend and frontend are fully integrated
- ✅ All features are functional with real API and persistent data
- ✅ User-specific categories and data filtering
- ✅ Authentication and session management implemented
- ✅ Responsive, modern UI

---

**Happy expense tracking! 💚**

