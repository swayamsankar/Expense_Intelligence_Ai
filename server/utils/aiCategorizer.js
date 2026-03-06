import OpenAI from "openai";

const CATEGORIES = [
  "Food & Dining",
  "Transport",
  "Entertainment",
  "Utilities",
  "Shopping",
  "Health",
  "Education",
  "Other",
];

// 1️⃣ Categorize Expense
export const categorizeExpense = async (merchant, amount, description = "") => {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = `Categorize this expense into one category only:
    ${CATEGORIES.join(", ")}

    Merchant: ${merchant}
    Amount: $${amount}
    Description: ${description}

    Respond ONLY with the category name.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
    });

    let category = response.choices[0].message.content.trim();

    if (!CATEGORIES.includes(category)) {
      category = "Other";
    }

    return category;
  } catch (error) {
    console.error("Categorization error:", error);
    return "Other";
  }
};

// 2️⃣ Generate Insights
export const generateFinancialInsights = async (expenses, monthlyBudget) => {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);

    const prompt = `
    Budget: $${monthlyBudget}
    Total Spent: $${totalSpent}

    Provide 3 short financial insights.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("Insight error:", error);
    return "Unable to generate insights.";
  }
};

// 3️⃣ Predict Budget Risk
export const predictBudgetRisk = async (expenses, monthlyBudget) => {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);

    const prompt = `
    Monthly Budget: $${monthlyBudget}
    Current Spending: $${totalSpent}

    Return JSON:
    {
      "riskScore": number (0-100),
      "riskLevel": "low|medium|high",
      "assessment": "short explanation"
    }
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.5,
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error("Risk error:", error);
    return {
      riskScore: 50,
      riskLevel: "medium",
      assessment: "Unable to calculate risk.",
    };
  }
};