# SpendWise API Reference

## Base URL
```
http://localhost:5000/api
```

## Authentication
Currently, endpoints use userId in URL. Future versions will use JWT tokens.

## Health Check

### Check Server Status
```
GET /health
```

**Response:**
```json
{
  "message": "Server is running"
}
```

---

## Expenses Endpoints

### Add New Expense
```
POST /expenses
```

**Request Body:**
```json
{
  "userId": "507f1f77bcf86cd799439011",
  "merchant": "Starbucks",
  "amount": 5.50,
  "category": "Food & Dining",
  "description": "Morning coffee"
}
```

**Parameters:**
- `userId` (required): MongoDB user ID
- `merchant` (required): Merchant/store name
- `amount` (required): Transaction amount (number)
- `category` (optional): Pre-selected category. If omitted, AI will categorize
- `description` (optional): Additional notes

**Response:**
```json
{
  "success": true,
  "message": "Expense added successfully",
  "expense": {
    "_id": "507f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439011",
    "merchant": "Starbucks",
    "amount": 5.50,
    "category": "Food & Dining",
    "description": "Morning coffee",
    "aiCategorized": false,
    "date": "2024-10-25T10:30:00.000Z",
    "createdAt": "2024-10-25T10:30:00.000Z",
    "updatedAt": "2024-10-25T10:30:00.000Z"
  }
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:5000/api/expenses \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "507f1f77bcf86cd799439011",
    "merchant": "Starbucks",
    "amount": 5.50
  }'
```

---

### Get All Expenses
```
GET /expenses/:userId
```

**Query Parameters:**
- `month` (optional): Month (1-12)
- `year` (optional): Year (e.g., 2024)
- `category` (optional): Filter by category

**Response:**
```json
{
  "success": true,
  "count": 15,
  "expenses": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "merchant": "Starbucks",
      "amount": 5.50,
      "category": "Food & Dining",
      "date": "2024-10-25T10:30:00.000Z"
    },
    // ... more expenses
  ]
}
```

**cURL Example:**
```bash
# Get all expenses
curl http://localhost:5000/api/expenses/507f1f77bcf86cd799439011

# Get expenses for October 2024
curl "http://localhost:5000/api/expenses/507f1f77bcf86cd799439011?month=10&year=2024"

# Get only Food & Dining expenses
curl "http://localhost:5000/api/expenses/507f1f77bcf86cd799439011?category=Food%20%26%20Dining"
```

---

### Update Expense
```
PUT /expenses/:id
```

**Request Body:**
```json
{
  "merchant": "Starbucks Reserve",
  "amount": 7.50,
  "category": "Food & Dining",
  "description": "Updated coffee order"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Expense updated successfully",
  "expense": {
    "_id": "507f1f77bcf86cd799439012",
    "merchant": "Starbucks Reserve",
    "amount": 7.50,
    // ... updated fields
  }
}
```

**cURL Example:**
```bash
curl -X PUT http://localhost:5000/api/expenses/507f1f77bcf86cd799439012 \
  -H "Content-Type: application/json" \
  -d '{
    "merchant": "Starbucks Reserve",
    "amount": 7.50
  }'
```

---

### Delete Expense
```
DELETE /expenses/:id
```

**Response:**
```json
{
  "success": true,
  "message": "Expense deleted successfully"
}
```

**cURL Example:**
```bash
curl -X DELETE http://localhost:5000/api/expenses/507f1f77bcf86cd799439012
```

---

### Get Category Breakdown
```
GET /expenses/:userId/categories
```

**Query Parameters:**
- `month` (optional): Month (1-12)
- `year` (optional): Year

**Response:**
```json
{
  "success": true,
  "totalSpent": 1550.25,
  "breakdown": [
    {
      "category": "Food & Dining",
      "amount": 520.10,
      "percentage": "33.55",
      "count": 8
    },
    {
      "category": "Transport",
      "amount": 310.50,
      "percentage": "20.03",
      "count": 5
    }
  ]
}
```

**cURL Example:**
```bash
curl "http://localhost:5000/api/expenses/507f1f77bcf86cd799439011/categories?month=10&year=2024"
```

---

## Analytics Endpoints

### Get Spending Trends
```
GET /analytics/:userId/trends
```

**Query Parameters:**
- `months` (optional): Number of months to retrieve (default: 6)

**Response:**
```json
{
  "success": true,
  "trends": [
    {
      "month": "2024-05",
      "total": 800.00,
      "count": 12
    },
    {
      "month": "2024-06",
      "total": 1200.00,
      "count": 18
    }
  ]
}
```

**cURL Example:**
```bash
curl "http://localhost:5000/api/analytics/507f1f77bcf86cd799439011/trends?months=12"
```

---

### Get Monthly Summary
```
GET /analytics/:userId/summary
```

**Query Parameters:**
- `month` (optional): Month (default: current month)
- `year` (optional): Year (default: current year)

**Response:**
```json
{
  "success": true,
  "summary": {
    "currentMonth": "2024-10",
    "totalSpent": 1550.25,
    "lastMonthTotal": 1236.48,
    "changePercentage": 25.38,
    "transactionCount": 32,
    "categoryBreakdown": {
      "Food & Dining": 520.10,
      "Transport": 310.50,
      "Entertainment": 190.75
    }
  }
}
```

**cURL Example:**
```bash
curl "http://localhost:5000/api/analytics/507f1f77bcf86cd799439011/summary"
```

---

### Get Financial Insights
```
GET /analytics/:userId/insights
```

**Query Parameters:**
- `month` (optional): Month
- `year` (optional): Year
- `budget` (optional): Monthly budget (default: 5000)

**Response:**
```json
{
  "success": true,
  "insights": "• Your spending is 23% lower than last month, great job!\n• Food & Dining is your top category at 34% of total spending\n• Consider setting a budget for Entertainment to control discretionary spending"
}
```

**cURL Example:**
```bash
curl "http://localhost:5000/api/analytics/507f1f77bcf86cd799439011/insights?budget=3000"
```

---

### Get Budget Risk Prediction
```
GET /analytics/:userId/risk
```

**Query Parameters:**
- `budget` (optional): Monthly budget (default: 5000)
- `month` (optional): Month
- `year` (optional): Year

**Response:**
```json
{
  "success": true,
  "riskData": {
    "riskScore": 45,
    "riskLevel": "medium",
    "assessment": "You're currently on track. At your current spending pace ($1,550/month), you'll spend 31% of your monthly budget."
  }
}
```

**Risk Levels:**
- `low`: 0-49% of budget
- `medium`: 50-79% of budget
- `high`: 80-100%+ of budget

**cURL Example:**
```bash
curl "http://localhost:5000/api/analytics/507f1f77bcf86cd799439011/risk?budget=5000"
```

---

### Get Recent Transactions
```
GET /analytics/:userId/recent
```

**Query Parameters:**
- `limit` (optional): Number of transactions (default: 10)

**Response:**
```json
{
  "success": true,
  "count": 10,
  "transactions": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "merchant": "Starbucks",
      "amount": 5.50,
      "category": "Food & Dining",
      "date": "2024-10-25T10:30:00.000Z"
    }
  ]
}
```

**cURL Example:**
```bash
curl "http://localhost:5000/api/analytics/507f1f77bcf86cd799439011/recent?limit=20"
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Missing required fields: userId, merchant, amount"
}
```

### 404 Not Found
```json
{
  "error": "Expense not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Error message describing what went wrong"
}
```

---

## Categories

Valid expense categories:
- `Food & Dining`
- `Transport`
- `Entertainment`
- `Utilities`
- `Shopping`
- `Health`
- `Education`
- `Other`

---

## Testing with cURL

### Test Health
```bash
curl http://localhost:5000/api/health
```

### Add Test Expense (with auto-categorization)
```bash
curl -X POST http://localhost:5000/api/expenses \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "507f1f77bcf86cd799439011",
    "merchant": "Target",
    "amount": 45.99,
    "description": "Weekly shopping"
  }'
```

### Add Test Expense (with category)
```bash
curl -X POST http://localhost:5000/api/expenses \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "507f1f77bcf86cd799439011",
    "merchant": "Uber",
    "amount": 15.50,
    "category": "Transport"
  }'
```

### Get Insights
```bash
curl "http://localhost:5000/api/analytics/507f1f77bcf86cd799439011/insights?budget=2000"
```

---

## Rate Limiting
Currently no rate limiting. Will be added in production.

## Pagination
Currently no pagination. Will be added in future versions.

## WebSocket Support
Currently not implemented. Will add for real-time updates in future.

## Versioning
API v1 - Current version: `2024-10`
