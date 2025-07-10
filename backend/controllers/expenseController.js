import { Op } from "sequelize";
import { Expense, ExpenseCategory } from "../model/index.js";

// Get all expenses for the logged-in user with date filtering
export const getAllExpenses = async (req, res) => {
  try {
    console.log("User in getAllExpenses:", req.user);
    const { filter, startDate, endDate } = req.query;
    const today = new Date();
    const where = { userId: req.user.id };

    if (filter === "week") {
      const lastWeek = new Date(today);
      lastWeek.setDate(today.getDate() - 7);
      where.date = { [Op.gte]: lastWeek.toISOString().slice(0, 10) };
    } 
    else if (filter === "month") {
      const lastMonth = new Date(today);
      lastMonth.setMonth(today.getMonth() - 1);
      where.date = { [Op.gte]: lastMonth.toISOString().slice(0, 10) };
    } 
    else if (filter === "3months") {
      const last3Months = new Date(today);
      last3Months.setMonth(today.getMonth() - 3);
      where.date = { [Op.gte]: last3Months.toISOString().slice(0, 10) };
    } 
    else if (startDate && endDate) {
      where.date = { [Op.gte]: startDate, [Op.lte]: endDate };
    }

    console.log("Fetching expenses for user:", req.user);
    const expenses = await Expense.findAll({
      where,
      include: [{ model: ExpenseCategory, as: 'category' }],
    });
    res.json(expenses);
  } catch (err) {
    console.error("Error in getAllExpenses:", err);
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
};

// Create a new expense for the logged-in user
export const createExpense = async (req, res) => {
  try {
    console.log('req.user:', req.user); // Add this line
    const expense = await Expense.create({
      ...req.body,
      userId: req.user.id,
    });
    res.status(201).json(expense);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message || "Failed to create expense" });
  }
};

// Get a single expense by ID for the logged-in user
export const getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findOne({
      where: { id: req.params.id, userId: req.user.id },
      include: [{ model: ExpenseCategory, as: 'category' }],
    });
    if (!expense) return res.status(404).json({ error: "Expense not found" });
    res.json(expense);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch expense" });
  }
};

// Update an expense for the logged-in user
export const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!expense) return res.status(404).json({ error: "Expense not found" });
    await expense.update(req.body);
    const updatedExpense = await Expense.findOne({
      where: { id: expense.id },
      include: [{ model: ExpenseCategory, as: 'category' }],
    });
    res.json(updatedExpense);
  } catch (err) {
    res.status(400).json({ error: "Failed to update expense" });
  }
};

// Delete an expense for the logged-in user
export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!expense) return res.status(404).json({ error: "Expense not found" });
    await expense.destroy();
    res.json({ message: "Expense deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete expense" });
  }
};

export const getExpenseStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const today = new Date();

    // Last 7 days (week)
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);
    const weekSum = await Expense.sum("amount", {
      where: {
        userId,
        date: { [Op.gte]: lastWeek.toISOString().slice(0, 10) }
      }
    });

    // Last 30 days (month)
    const lastMonth = new Date(today);
    lastMonth.setMonth(today.getMonth() - 1);
    const monthSum = await Expense.sum("amount", {
      where: {
        userId,
        date: { [Op.gte]: lastMonth.toISOString().slice(0, 10) }
      }
    });

    // Last 3 months
    const last3Months = new Date(today);
    last3Months.setMonth(today.getMonth() - 3);
    const threeMonthsSum = await Expense.sum("amount", {
      where: {
        userId,
        date: { [Op.gte]: last3Months.toISOString().slice(0, 10) }
      }
    });

    res.json({
      week: weekSum || 0,
      month: monthSum || 0,
      threeMonths: threeMonthsSum || 0
    });
  } catch (err) {
    console.error("Error in getExpenseStats:", err);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
};