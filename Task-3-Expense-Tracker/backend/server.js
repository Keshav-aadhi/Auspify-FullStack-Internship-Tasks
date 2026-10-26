const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// In-Memory Database
let transactions = [
  { id: "1", title: "Freelance Stipend", amount: 1200, type: "income", date: "2026-03-01" },
  { id: "2", title: "Internet Bill", amount: 50, type: "expense", date: "2026-03-05" }
];

// GET: Fetch all financial transactions & summary calculations
app.get("/api/transactions", (req, res) => {
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);
    
  const totalExpense = transactions
    .filter(t => t.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = totalIncome - totalExpense;

  res.json({
    summary: { totalIncome, totalExpense, balance },
    transactions
  });
});

// POST: Add new income or expense transaction
app.post("/api/transactions", (req, res) => {
  const { title, amount, type, date } = req.body;
  if (!title || !amount || !type || !date) {
    return res.status(400).json({ message: "Please provide all required fields." });
  }

  const newTransaction = {
    id: Date.now().toString(),
    title,
    amount: parseFloat(amount),
    type,
    date
  };

  transactions.unshift(newTransaction);
  res.status(201).json(newTransaction);
});

// DELETE: Remove a transaction record
app.delete("/api/transactions/:id", (req, res) => {
  const { id } = req.params;
  transactions = transactions.filter(t => t.id !== id);
  res.json({ message: "Transaction removed successfully." });
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Expense Tracker backend running on http://localhost:${PORT}`);
});