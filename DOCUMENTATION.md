# SpendWise AI - Complete Documentation Index

Welcome to SpendWise! This document is your central hub for all project documentation.

## Quick Links

### Getting Started (Start Here!)
1. **[README.md](./README.md)** - Project overview, features, tech stack, and quick start
2. **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Step-by-step installation and configuration

### For Developers
3. **[API_REFERENCE.md](./API_REFERENCE.md)** - Complete REST API documentation with examples
4. **[DESIGN_GUIDE.md](./DESIGN_GUIDE.md)** - Design system, components, and styling guidelines
5. **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** - Architecture overview and what was built

### Configuration Templates
6. **[server/.env.example](./server/.env.example)** - Backend environment variables template
7. **[client/.env.example](./client/.env.example)** - Frontend environment variables template

---

## Documentation by Use Case

### "I want to get started quickly"
→ Read **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** (5-10 minutes)

### "I need to understand the project structure"
→ Read **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** then explore files

### "I'm implementing a new API feature"
→ Check **[API_REFERENCE.md](./API_REFERENCE.md)** for patterns and examples

### "I need to add a new component"
→ Review **[DESIGN_GUIDE.md](./DESIGN_GUIDE.md)** and existing components

### "I need to deploy this to production"
→ Read **[README.md](./README.md)** deployment section

### "Something isn't working"
→ Check **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** troubleshooting section

### "I want to understand the color scheme"
→ See **[DESIGN_GUIDE.md](./DESIGN_GUIDE.md)** - Color Palette section

---

## File Structure Reference

```
spendwise-ai/
├── README.md                          # Start here!
├── SETUP_GUIDE.md                     # Setup instructions
├── API_REFERENCE.md                   # API documentation
├── PROJECT_SUMMARY.md                 # Project overview
├── DESIGN_GUIDE.md                    # Design system
├── DOCUMENTATION.md                   # This file
│
├── server/                            # Backend
│   ├── config/db.js
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   ├── package.json
│   ├── .env                           # ← Create from .env.example
│   └── .env.example
│
├── client/                            # Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   └── App.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   ├── .env                           # ← Create from .env.example
│   └── .env.example
```

---

## Quick Reference Commands

### Backend (Node.js + Express)
```bash
cd server
npm install              # Install dependencies
npm run dev             # Start with hot reload
npm start               # Start production server
```

### Frontend (React + Vite)
```bash
cd client
npm install             # Install dependencies
npm run dev             # Start dev server with HMR
npm run build           # Build for production
npm run preview         # Preview production build
```

---

## Architecture Overview

### Backend Stack
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **AI**: OpenAI GPT-4 API
- **Auth**: bcryptjs (ready for JWT)

### Frontend Stack
- **Framework**: React 18
- **Build**: Vite
- **Visualization**: Recharts
- **HTTP**: Axios

### Data Flow
```
React Components
      ↓
API Service Layer (axios)
      ↓
Express REST API
      ↓
MongoDB Database
      ↓
OpenAI GPT-4 (for AI features)
```

---

## Core Features

### 1. Expense Management
- Add, update, delete expenses
- Auto-categorize using AI
- Filter by date and category
- View recent transactions

**Related Docs**: [API_REFERENCE.md - Expenses](./API_REFERENCE.md#expenses-endpoints)

### 2. Analytics & Insights
- 6-month spending trends
- Monthly summaries
- AI-generated insights
- Budget risk prediction

**Related Docs**: [API_REFERENCE.md - Analytics](./API_REFERENCE.md#analytics-endpoints)

### 3. Visualization
- Line charts for trends
- Category breakdown
- Budget progress bars
- Risk indicators

**Related Docs**: [DESIGN_GUIDE.md - Components](./DESIGN_GUIDE.md#component-library)

### 4. Dashboard
- KPI summary cards
- Interactive charts
- Recent activity
- Quick add form

**Related Docs**: [PROJECT_SUMMARY.md - Features](./PROJECT_SUMMARY.md#what-was-built)

---

## Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://...
OPENAI_API_KEY=sk-...
PORT=5000
NODE_ENV=development
```

**Where to get:**
- MongoDB: [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- OpenAI: [platform.openai.com/api-keys](https://platform.openai.com/api-keys)

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

See **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** for detailed setup.

---

## Common Tasks

### Add a New Expense Category
1. Update `CATEGORIES` array in `server/utils/aiCategorizer.js`
2. Add color in `getCategoryColor()` in `client/src/components/TransactionList.jsx`
3. Add emoji icon in components
4. Update design guide

### Create New API Endpoint
1. Create controller function
2. Add route in routes file
3. Test with cURL (see [API_REFERENCE.md](./API_REFERENCE.md))
4. Document in [API_REFERENCE.md](./API_REFERENCE.md)

### Add New Dashboard Component
1. Create component in `client/src/components/`
2. Add associated CSS file
3. Follow patterns in [DESIGN_GUIDE.md](./DESIGN_GUIDE.md)
4. Import and use in Dashboard page

### Deploy to Production
1. Follow deployment section in [README.md](./README.md)
2. Use environment variables
3. Update API URLs
4. Test thoroughly

---

## API Quick Reference

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/health` | GET | Check server status |
| `/expenses` | POST | Add expense |
| `/expenses/:userId` | GET | Get expenses |
| `/expenses/:id` | PUT | Update expense |
| `/expenses/:id` | DELETE | Delete expense |
| `/expenses/:userId/categories` | GET | Category breakdown |
| `/analytics/:userId/trends` | GET | 6-month trends |
| `/analytics/:userId/summary` | GET | Monthly summary |
| `/analytics/:userId/insights` | GET | AI insights |
| `/analytics/:userId/risk` | GET | Budget risk |
| `/analytics/:userId/recent` | GET | Recent transactions |

Full details: [API_REFERENCE.md](./API_REFERENCE.md)

---

## Color Palette Quick Reference

| Name | Hex | Use |
|------|-----|-----|
| Primary | `#1a9b8e` | Main brand, buttons |
| Success | `#27ae60` | Positive metrics |
| Warning | `#f39c12` | Medium risk |
| Danger | `#e74c3c` | High risk, errors |
| Food & Dining | `#f5a623` | Category color |
| Transport | `#4a90e2` | Category color |
| Entertainment | `#9b59b6` | Category color |
| Utilities | `#27ae60` | Category color |

Full guide: [DESIGN_GUIDE.md - Color Palette](./DESIGN_GUIDE.md#color-palette)

---

## Project Statistics

- **Backend Files**: 7+ (models, controllers, routes, utils)
- **Frontend Components**: 8 (reusable)
- **API Endpoints**: 11
- **Database Collections**: 2 (Users, Expenses)
- **Lines of Code**: 3,500+
- **Documentation Pages**: 6

---

## Performance Tips

1. **Database**: Uses indexes on userId and date for fast queries
2. **Frontend**: Component-based architecture for reusability
3. **API**: Efficient aggregation queries
4. **Build**: Vite for fast development and optimized builds

---

## Security Checklist

- [ ] Environment variables configured
- [ ] MongoDB whitelist set
- [ ] OpenAI key stored securely
- [ ] CORS configured
- [ ] Input validation enabled
- [ ] Error handling implemented

---

## Testing Checklist

- [ ] Server starts on port 5000
- [ ] Frontend loads on port 3000
- [ ] Add expense works
- [ ] Auto-categorization works
- [ ] Dashboard updates correctly
- [ ] Charts render
- [ ] API returns valid responses
- [ ] Error handling works

---

## Troubleshooting

### Setup Issues
→ See **[SETUP_GUIDE.md - Troubleshooting](./SETUP_GUIDE.md#troubleshooting)**

### API Issues
→ See **[API_REFERENCE.md - Error Responses](./API_REFERENCE.md#error-responses)**

### Design Questions
→ See **[DESIGN_GUIDE.md](./DESIGN_GUIDE.md)**

### General Questions
→ See **[README.md - FAQ](./README.md#troubleshooting)**

---

## Getting Help

1. **Check the relevant documentation** - Listed above
2. **Search for similar issues** - In code comments
3. **Check error messages** - Browser console (F12) and terminal
4. **Review API responses** - Use Network tab in DevTools
5. **Check environment variables** - Ensure .env files are correct

---

## Next Steps

1. ✅ **Read README.md** - Understand the project
2. ✅ **Follow SETUP_GUIDE.md** - Get it running locally
3. ✅ **Test with API_REFERENCE.md** - Verify API works
4. ✅ **Explore the code** - Understand the implementation
5. → **Start developing** - Add features or customize

---

## Document Versions

- **README.md**: Comprehensive guide (308 lines)
- **SETUP_GUIDE.md**: Step-by-step setup (353 lines)
- **API_REFERENCE.md**: Complete API docs (476 lines)
- **PROJECT_SUMMARY.md**: Project overview (330 lines)
- **DESIGN_GUIDE.md**: Design system (319 lines)
- **DOCUMENTATION.md**: This file

---

## Additional Resources

### External Links
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [OpenAI API](https://platform.openai.com/)
- [Vite Documentation](https://vitejs.dev/)
- [Recharts](https://recharts.org/)

### Recommended Tools
- **Code Editor**: VS Code with ES7+ extensions
- **API Testing**: Postman or cURL
- **Database**: MongoDB Compass (local)
- **Version Control**: Git + GitHub

---

## Support

For issues not covered in documentation:
1. Check browser console for errors
2. Check server terminal for logs
3. Review MongoDB Atlas dashboard
4. Check OpenAI API status and usage
5. Refer to relevant documentation sections

---

## License

MIT License - See LICENSE file (if available)

---

## Quick Start (TL;DR)

```bash
# 1. Setup Backend
cd server
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev

# 2. Setup Frontend (new terminal)
cd client
npm install
npm run dev

# 3. Open http://localhost:3000
```

That's it! For detailed setup, see **[SETUP_GUIDE.md](./SETUP_GUIDE.md)**

---

**Last Updated**: October 2024
**Status**: ✅ Complete & Ready to Use
