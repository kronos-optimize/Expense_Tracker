import express from "express";
import { authenticate } from "../middleware/auth.js";
import {
  getAllIncomeCategories,
  createIncomeCategory,
  getIncomeCategoryById,
  updateIncomeCategory,
  deleteIncomeCategory,
} from "../controllers/incomeCategoryController.js";

const incomeCategoryRouter = express.Router();

// author to display only that user's category
incomeCategoryRouter.use(authenticate);

incomeCategoryRouter.get("/", getAllIncomeCategories);
incomeCategoryRouter.post("/", createIncomeCategory);
incomeCategoryRouter.get("/:id", getIncomeCategoryById);
incomeCategoryRouter.put("/:id", updateIncomeCategory);
incomeCategoryRouter.delete("/:id", deleteIncomeCategory);

export default incomeCategoryRouter; 