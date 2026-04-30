# Expense Intelligence AI 💰🤖

A **Full Stack MERN + AI Smart Expense Tracker** that helps users manage expenses, track income, analyze spending patterns, and receive AI-powered financial insights.

---

# 🚀 Features

## Dashboard

* Total Spent tracking
* Editable Total Income
* Savings calculation
* Savings Goal monitoring
* Spending Trends Graph
* Category Breakdown
* Budget Risk Score

## Expense Management

* Add transactions
* Delete expenses
* Filter and search transactions
* Categorize expenses automatically

## Analytics

* Monthly spending trends
* Category distribution charts
* Weekly spending analysis
* Financial insights summary

## AI Intelligence

* AI expense categorization
* AI financial insight generation
* Budget risk prediction

## Profile

* User profile dropdown
* Editable profile details
* Stored locally

### 🖼️ Project Preview
<img width="1873" height="906" alt="image" src="https://github.com/user-attachments/assets/7fff863f-fbf1-4233-8e7a-a1980f765ca0" />
<img width="1878" height="908" alt="image" src="https://github.com/user-attachments/assets/bd2ad6af-dc8d-43db-90dc-1eb3c290c686" />
<img width="1876" height="904" alt="image" src="https://github.com/user-attachments/assets/98acd49f-411e-4ba9-9146-252ec6c7c1ab" />
<img width="1877" height="912" alt="image" src="https://github.com/user-attachments/assets/2f6d0430-ad72-403f-aa58-6e5fef94813d" />
<img width="1878" height="906" alt="image" src="https://github.com/user-attachments/assets/f428e2a8-5602-4e53-a60b-9c6c7647dbeb" />
<img width="1884" height="905" alt="image" src="https://github.com/user-attachments/assets/8a5b630c-7581-483a-8675-c675b4c40a71" />

---
# Architecture Diagram
<img width="1440" height="1320" alt="image" src="https://github.com/user-attachments/assets/f71f6ae3-c670-4f09-a165-d8655877db07" />


# 🧰 Tech Stack

## Frontend

* React.js
* Vite
* React Router
* Recharts (Charts)
* CSS

## Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose

## AI

* OpenAI API

## Tools

* Axios
* Nodemon
* Dotenv

---

# 📁 Project Folder Structure

```
Expense_Intelligence_AI
│
├── client (Frontend - React)
│   ├── public
│   ├── src
│   │   ├── components
│   │   │   ├── Header.jsx
│   │   │   ├── SummaryCard.jsx
│   │   │   ├── SpendingChart.jsx
│   │   │   ├── CategoryBreakdown.jsx
│   │   │   ├── TransactionList.jsx
│   │   │   ├── RiskScoreCard.jsx
│   │   │   ├── AddExpenseForm.jsx
│   │   │
│   │   ├── pages
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Expenses.jsx
│   │   │   ├── Analytics.jsx
│   │   │   ├── Profile.jsx
│   │   │
│   │   ├── styles
│   │   │   ├── Dashboard.css
│   │   │   ├── Analytics.css
│   │   │   ├── Expenses.css
│   │   │   ├── Profile.css
│   │   │
│   │   ├── api
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │
│   └── package.json
│
├── server (Backend)
│   ├── config
│   │   └── db.js
│   │
│   ├── controllers
│   │   ├── expenseController.js
│   │   ├── analyticsController.js
│   │
│   ├── models
│   │   ├── Expense.js
│   │   ├── User.js
│   │
│   ├── routes
│   │   ├── expenseRoutes.js
│   │   ├── analyticsRoutes.js
│   │
│   ├── utils
│   │   └── aiCategorizer.js
│   │
│   ├── server.js
│   └── package.json
│
├── README.md
```

---

# ⚙️ Installation

## Clone Repository

```
git clone https://github.com/yourusername/expense-intelligence-ai.git
cd expense-intelligence-ai
```

---

# 🖥 Backend Setup

Navigate to server

```
cd server
```

Install dependencies

```
npm install
```

Create `.env` file

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
```

Start backend

```
npm run dev
```

Server runs at

```
http://localhost:5000
```

---

# 🌐 Frontend Setup

Navigate to client

```
cd client
```

Install dependencies

```
npm install
```

Run frontend

```
npm run dev
```

Frontend runs at

```
http://localhost:5173
```

---

# 🧠 AI Features

The application uses **OpenAI API** for:

### Expense Categorization

Automatically categorizes transactions into:

* Food & Dining
* Transport
* Entertainment
* Utilities
* Shopping
* Health
* Education
* Other

### Financial Insights

AI analyzes spending patterns and generates:

* Savings advice
* Budget recommendations
* Spending optimization suggestions

### Budget Risk Prediction

Risk score calculated using:

* Total Spending
* Monthly Budget
* Remaining Days
* Spending Rate

---

# 📊 API Endpoints

### Expense Routes

```
POST /api/expenses
GET /api/expenses/:userId
PUT /api/expenses/:id
DELETE /api/expenses/:id
```

### Analytics Routes

```
GET /api/analytics/:userId/trends
GET /api/analytics/:userId/summary
GET /api/analytics/:userId/insights
GET /api/analytics/:userId/risk
```

---

# 💾 Database Schema

### Expense Model

```
{
 userId: ObjectId,
 merchant: String,
 amount: Number,
 category: String,
 type: "expense | income",
 date: Date
}
```

---

# 📈 Dashboard Calculations

```
Total Spent = Sum of all expense transactions

Total Income = User defined monthly income

Savings = Income - Expenses
```

---

# 🔐 Environment Variables

```
PORT=5000
MONGO_URI=MongoDB Atlas URL
OPENAI_API_KEY=OpenAI API Key
```

---

# 🧪 How to Test

1. Start Backend
2. Start Frontend
3. Add Expense Transactions
4. Check Dashboard Updates
5. View Analytics Charts
6. Observe AI Financial Insights

---

# 🎯 Future Improvements

* User Authentication (JWT)
* Multi-user accounts
* Income transaction support
* Export reports (PDF)
* Notifications for budget limits
* Mobile responsive improvements

---

# 👨‍💻 Author

**Swayam Sankar Nayak**

---

# ⭐ Support

If you like this project, consider giving it a **star ⭐ on GitHub**.
