# SpendWise - AI-Powered Expense Tracker

An intelligent expense tracking system that uses OpenAI's GPT-4 API to automatically categorize transactions, generate financial insights, predict budget risks, and visualize spending trends.

## Features

- **Auto-Categorization**: Uses OpenAI GPT-4 to intelligently categorize expenses
- **Monthly Financial Insights**: AI-generated analysis of spending patterns
- **Budget Risk Prediction**: ML-powered predictions of budget overruns
- **Spending Visualization**: Interactive charts and trend analysis
- **Category Breakdown**: Visual representation of spending by category
- **Budget Progress Tracking**: Monitor budget usage per category
- **Real-time Dashboard**: Live updates of financial metrics

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **AI Integration**: OpenAI GPT-4 API
- **Authentication**: bcryptjs for password hashing
- **HTTP**: axios for API calls

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router
- **Data Visualization**: Recharts
- **HTTP Client**: axios
- **Styling**: CSS3 with custom design system

## Project Structure

```
spendwise-ai/
├── server/                          # Backend (Node.js + Express)
│   ├── config/
│   │   └── db.js                   # MongoDB connection
│   ├── controllers/
│   │   ├── expenseController.js    # Expense CRUD operations
│   │   └── analyticsController.js  # Analytics endpoints
│   ├── models/
│   │   ├── Expense.js              # Expense schema
│   │   └── User.js                 # User schema
│   ├── routes/
│   │   ├── expenseRoutes.js        # Expense API routes
│   │   └── analyticsRoutes.js      # Analytics API routes
│   ├── utils/
│   │   └── aiCategorizer.js        # OpenAI integration
│   ├── server.js                   # Express server setup
│   ├── .env                        # Environment variables
│   └── package.json
│
└── client/                          # Frontend (React + Vite)
    ├── src/
    │   ├── components/
    │   │   ├── Header.jsx          # Navigation header
    │   │   ├── SummaryCard.jsx     # Summary cards (Spent, Income, Goal)
    │   │   ├── SpendingChart.jsx   # Line chart visualization
    │   │   ├── RiskScoreCard.jsx   # Budget risk indicator
    │   │   ├── TransactionList.jsx # Recent transactions table
    │   │   ├── CategoryBreakdown.jsx # Category distribution
    │   │   └── AddExpenseForm.jsx  # Expense form
    │   ├── pages/
    │   │   └── Dashboard.jsx       # Main dashboard page
    │   ├── services/
    │   │   └── api.js              # API service layer
    │   ├── styles/
    │   │   └── Dashboard.css       # Dashboard styles
    │   ├── App.jsx                 # Root component
    │   ├── App.css
    │   ├── index.css               # Global styles
    │   └── main.jsx                # Entry point
    ├── index.html
    ├── vite.config.js
    ├── .env
    └── package.json
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- OpenAI API key

### Backend Setup

1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables** (`.env`)
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   OPENAI_API_KEY=your_openai_api_key
   PORT=5000
   NODE_ENV=development
   ```

4. **Start the server**
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:5000`

### Frontend Setup

1. **Navigate to client directory**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables** (`.env`)
   ```
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   Frontend runs on `http://localhost:3000`

## API Endpoints

### Expenses
- `POST /api/expenses` - Add new expense
- `GET /api/expenses/:userId` - Get all expenses
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense
- `GET /api/expenses/:userId/categories` - Get category breakdown

### Analytics
- `GET /api/analytics/:userId/trends` - Get spending trends (6 months)
- `GET /api/analytics/:userId/summary` - Get monthly summary
- `GET /api/analytics/:userId/insights` - Get AI-generated insights
- `GET /api/analytics/:userId/risk` - Get budget risk prediction
- `GET /api/analytics/:userId/recent` - Get recent transactions

## Environment Variables

### Server (.env)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
OPENAI_API_KEY=sk-your-openai-key
PORT=5000
NODE_ENV=development
```

### Client (.env)
```
VITE_API_BASE_URL=http://localhost:5000/api
```

## Key Features Explained

### AI Auto-Categorization
The system uses OpenAI GPT-4 to analyze merchant names, amounts, and descriptions to automatically assign appropriate categories:
- Food & Dining
- Transport
- Entertainment
- Utilities
- Shopping
- Health
- Education
- Other

### Financial Insights
GPT-4 analyzes spending patterns to generate actionable insights about budget usage, spending trends, and recommendations.

### Budget Risk Prediction
Based on current spending rate and days into the month, the system:
- Calculates projected monthly spending
- Determines risk level (low/medium/high)
- Provides recommendations

### Data Visualization
Interactive Recharts visualizations include:
- 6-month spending trend line chart
- Category breakdown with progress bars
- Budget progress tracking

## Development

### Run Backend in Dev Mode
```bash
cd server
npm run dev  # Uses nodemon for auto-restart
```

### Run Frontend in Dev Mode
```bash
cd client
npm run dev  # Uses Vite with HMR
```

### Build for Production

Backend:
```bash
cd server
npm start
```

Frontend:
```bash
cd client
npm run build
npm run preview
```

## Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  monthlyBudget: Number,
  savingsGoal: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Expense Model
```javascript
{
  userId: ObjectId (ref: User),
  merchant: String,
  amount: Number,
  category: String,
  description: String,
  date: Date,
  aiCategorized: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## Authentication (Future Implementation)
- JWT token-based authentication
- Secure password hashing with bcryptjs
- User sessions

## Error Handling
- Try-catch blocks in all routes
- Validation of required fields
- Meaningful error messages
- Graceful fallbacks for AI categorization

## Performance Optimization
- MongoDB indexing on userId and category
- Cached API responses
- Debounced form submissions
- Lazy loading of components

## Future Enhancements
- User authentication and sign-up
- Multiple account management
- Custom budget categories
- Recurring expense tracking
- Export to CSV/PDF
- Mobile app version
- Real-time notifications
- Machine learning for better predictions
- Integration with banking APIs

## Troubleshooting

### MongoDB Connection Error
- Verify MongoDB Atlas connection string
- Check IP whitelist in MongoDB Atlas
- Ensure network connectivity

### OpenAI API Errors
- Verify API key is correct
- Check account has sufficient credits
- Monitor rate limits

### CORS Issues
- Ensure backend CORS middleware is configured
- Check frontend API URL in .env
- Verify servers are running on correct ports

## Support
For issues or questions, please open an issue in the repository.

## License
MIT

## Author
SpendWise Development Team
