# SpendWise AI Expense Tracker - Complete Setup Guide

## Quick Start (5-10 minutes)

### Step 1: Get Your Credentials

#### MongoDB Atlas
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up or log in
3. Create a new cluster (free tier available)
4. Create a database user with password
5. Add your IP to the IP whitelist (or allow 0.0.0.0/0 for development)
6. Get your connection string: `mongodb+srv://username:password@cluster.mongodb.net/expensetracker`

#### OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com)
2. Sign in or create account
3. Navigate to API Keys
4. Create a new secret key
5. Copy and save it: `sk-...`

### Step 2: Setup Backend

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file with your credentials
cat > .env << EOF
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/expensetracker
OPENAI_API_KEY=sk-your-openai-key-here
PORT=5000
NODE_ENV=development
EOF

# Start the backend server
npm run dev
```

✅ Backend should now run on `http://localhost:5000`

### Step 3: Setup Frontend

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
VITE_API_BASE_URL=http://localhost:5000/api
EOF

# Start the frontend development server
npm run dev
```

✅ Frontend should now run on `http://localhost:3000`

## Detailed Setup Instructions

### MongoDB Atlas Setup (Detailed)

1. **Create Free Cluster**
   - Click "Create" button
   - Select Shared option (free)
   - Choose AWS, select region closest to you
   - Click "Create Cluster"

2. **Create Database User**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Username: `admin`
   - Password: Create strong password
   - Role: `Atlas Admin`
   - Click "Add User"

3. **Network Access**
   - Go to "Network Access"
   - Click "Add IP Address"
   - For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
   - For production: Add specific IP addresses

4. **Get Connection String**
   - Click "Connect" on your cluster
   - Select "Drivers"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `myFirstDatabase` with `expensetracker`

### OpenAI API Setup (Detailed)

1. **Create Account**
   - Go to openai.com
   - Click "Sign up"
   - Complete registration

2. **Add Payment Method**
   - Go to Billing > Overview
   - Add payment method (required for GPT-4)

3. **Create API Key**
   - Go to API Keys
   - Click "Create new secret key"
   - Name it: `SpendWise Development`
   - Copy the key immediately (you won't see it again)

4. **Monitor Usage**
   - Go to Billing > Usage
   - Set usage limits to avoid unexpected charges
   - Recommended: $5-10/month for development

## Environment Variables Reference

### Server (.env)
```env
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/expensetracker

# OpenAI
OPENAI_API_KEY=sk-your-key-here

# Server
PORT=5000
NODE_ENV=development  # or production
```

### Client (.env)
```env
# API Base URL
VITE_API_BASE_URL=http://localhost:5000/api
```

## Testing the Setup

### Backend Test
```bash
cd server

# Test health endpoint
curl http://localhost:5000/api/health

# Expected response:
# {"message":"Server is running"}
```

### Frontend Test
- Open browser to `http://localhost:3000`
- You should see the SpendWise dashboard
- Click "Add Transaction" to test the form

### End-to-End Test

1. **Add an Expense**
   - Go to http://localhost:3000
   - Click "Add Transaction"
   - Fill in: Merchant: "Starbucks", Amount: "5.50"
   - Leave Category empty (for auto-categorization)
   - Click "Add Transaction"

2. **Check Backend**
   ```bash
   # View MongoDB collections
   # Use MongoDB Atlas UI or MongoDB Compass
   ```

3. **Verify AI Integration**
   - Check browser console for API calls
   - Verify the expense was categorized as "Food & Dining"

## Troubleshooting

### MongoDB Connection Failed
```
Error: connect ENOTFOUND cluster.mongodb.net
```
**Solutions:**
- Check internet connection
- Verify connection string is correct
- Check IP whitelist in MongoDB Atlas (Network Access)
- Try whitelisting 0.0.0.0/0 temporarily

### OpenAI API Error
```
Error: 401 Unauthorized
```
**Solutions:**
- Verify API key is correct
- Check API key hasn't expired
- Ensure account has payment method
- Check API key starts with `sk-`

### Frontend Can't Connect to Backend
```
Error: POST http://localhost:5000/api/expenses 404
```
**Solutions:**
- Ensure backend is running: `npm run dev` in server directory
- Check VITE_API_BASE_URL in client/.env
- Check browser console for exact error
- Verify port 5000 isn't used by another app

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solutions:**
```bash
# Find process using port
lsof -i :5000

# Kill the process
kill -9 <PID>

# Or use different port
PORT=5001 npm run dev
```

## Project Structure Reminder

```
/
├── server/          # Node.js + Express backend
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   ├── .env
│   └── package.json
│
├── client/          # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   └── App.jsx
│   ├── .env
│   └── package.json
│
└── README.md        # Full documentation
```

## Running the Application

### Development Mode (Recommended)

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

Open http://localhost:3000 in your browser.

### Production Build

**Backend:**
```bash
cd server
npm start
```

**Frontend:**
```bash
cd client
npm run build
npm run preview
```

## Key Commands

```bash
# Backend
cd server
npm install        # Install dependencies
npm run dev        # Start dev server with hot reload
npm start          # Start production server

# Frontend
cd client
npm install        # Install dependencies
npm run dev        # Start dev server with HMR
npm run build      # Build for production
npm run preview    # Preview production build
```

## Next Steps

1. ✅ **Complete Setup** - Follow steps above
2. **Test the Application** - Add a few expenses
3. **Explore the Code** - Understand the architecture
4. **Add Authentication** - Implement user sign-up/login (future)
5. **Deploy** - Use Vercel, Heroku, or AWS

## Security Notes (Important!)

### Development
- Using `0.0.0.0/0` for MongoDB is OK for development only
- Store .env files locally (never commit to git)
- Use weak passwords OK for development

### Production
- Restrict MongoDB IP whitelist to your server IP only
- Use strong, unique passwords
- Store API keys in environment variables (never in code)
- Use HTTPS/SSL certificates
- Enable database authentication
- Add rate limiting
- Use JWT for API authentication

## Getting Help

- Check browser console for errors (F12)
- Check server logs (terminal output)
- Review MongoDB Atlas error logs
- Check OpenAI platform for API status
- Read the main README.md for more details

## Quick Reference

| Component | Port | URL |
|-----------|------|-----|
| MongoDB | N/A | MongoDB Atlas Cloud |
| Backend | 5000 | http://localhost:5000 |
| Frontend | 3000 | http://localhost:3000 |
| API Base | 5000 | http://localhost:5000/api |

## File Checklist

Before starting, ensure you have:
- [ ] MongoDB Atlas account and connection string
- [ ] OpenAI API key
- [ ] Node.js installed (v16+)
- [ ] Code editor (VS Code recommended)
- [ ] Terminal access
- [ ] Two terminal windows ready

Good luck! 🚀
