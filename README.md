# 💰 Expense Tracker App

A modern, responsive expense tracking application built with **Next.js 14** frontend, designed to be integrated with an **Express.js** backend. Track your expenses efficiently with a beautiful green-themed UI and comprehensive features.

---

## 🌟 Features

### 🔐 Authentication System
- **User Registration** – Create new accounts with email and password
- **User Login** – Secure login with JWT token storage
- **Forgot Password** – Password reset with email and new password
- **Session Management** – Automatic logout and token handling

### 💸 Expense Management
- **Add Expenses** – Create new expense entries with title, amount, date, category, and notes
- **Edit Expenses** – Update existing expense details
- **Delete Expenses** – Remove expenses with confirmation modal
- **View Expenses** – Display expenses in an organized card layout

### 📊 Dashboard & Analytics
- **Summary Cards** – View spending totals for this week, month, and last 3 months (auto-updates on changes)
- **Expense Filtering** – Filter by time periods (week, month, 3 months, custom range)
- **Date Range Picker** – Custom date range selection for detailed filtering
- **Category Organization** – Color-coded expense categories

### 🎨 User Interface
- **Modern Design** – Clean, intuitive interface with green primary theme
- **Dark Mode Support** – Toggle between light and dark themes
- **Responsive Layout** – Works perfectly on desktop, tablet, and mobile
- **Loading States** – Smooth loading indicators and transitions
- **Toast Notifications** – User-friendly success and error messages

---


## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern UI component library
- **Lucide React** - Beautiful icons
- **React Hook Form** - Form handling
- **date-fns** - Date manipulation

### Backend
- **Express.js** – Node.js web framework
- **Sequelize ORM** – Database ORM
- **JWT Authentication** – Secure token-based auth
- **bcryptjs** – Password hashing
- **MySQL** – Database options

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
  ```bash
   git clone <your-repo-url>
   cd expense-tracker
  ```

2. **Run the backend server**
  ```bash
   cd backend
   npm install
   npm run dev
  ```

3. **Run the development server**
  ```bash
  cd ../
  npm install
  npm run dev
  # or
  yarn dev
  ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
expense-tracker/
├── backend/                    # Express.js backend
│   ├── controllers/            # Route controllers
│   ├── models/                 # Sequelize models
│   ├── routes/                 # API routes
│   ├── database.sqlite         # SQLite database (if used)
│   ├── app.js                  # Express app entry
│   └── ...                     # Other backend files
├── app/                        # Next.js App Router
│   ├── dashboard/              # Dashboard pages
│   ├── ...                     # Other frontend pages
├── components/                 # Reusable components
├── lib/                        # Utility functions
├── public/                     # Static assets
├── ...                         # Other config files
```

### 🔌API Endpoints 

#### Authentication Endpoints
```
- POST /api/users/register – Register new user
- POST /api/users/login – Login, returns { token, user: { id, email } }
- POST /api/users/forgot-password – Reset password
```

#### Expense Endpoints
```
- GET /api/expenses – Get all expenses (with filters)
- POST /api/expenses – Add new expense
- GET /api/expenses/:id – Get expense by ID
- PUT /api/expenses/:id – Update expense
- DELETE /api/expenses/:id – Delete expense
- GET /api/expenses/summary/stats – Get summary (week, month, 3 months)
```

### Database Schema

#### Users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

#### Expenses Table
```sql
CREATE TABLE expenses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title VARCHAR(255) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  date DATE NOT NULL,
  category VARCHAR(50) NOT NULL,
  notes TEXT,
  user_id INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## 🎯 Current Status##

- ✅ Backend and frontend are fully integrated
- ✅ All features are functional with real API and persistent data
- ✅ Summary cards auto-update when expenses are added/edited/deleted
- ✅ Authentication and session management implemented
- ✅ Responsive, modern UI

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎉 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Lucide](https://lucide.dev/) - Beautiful icons

---

**Happy expense tracking! 💚**
```

