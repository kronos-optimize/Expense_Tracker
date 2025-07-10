import express from "express";
import {
  getAllExpenses,
  createExpense,
  getExpenseById,
  updateExpense,
  deleteExpense,
  getExpenseStats
} from "../controllers/expenseController.js";
import { authenticate } from "../middleware/auth.js";

const expenseRouter = express.Router();

// All routes below require authentication
expenseRouter.use(authenticate);

expenseRouter.get("/", getAllExpenses); // Get all expenses (with optional filtering)
expenseRouter.post("/", createExpense); // Create a new expense
expenseRouter.get("/:id", getExpenseById); // Get a single expense by ID
expenseRouter.put("/:id", updateExpense); // Update an expense
expenseRouter.delete("/:id", deleteExpense); // Delete an expense
expenseRouter.get("/summary/stats", getExpenseStats); // sum for dashboard

export default expenseRouter;