import express from "express";
import {
  getAllIncomeCategories,
  createIncomeCategory,
  getIncomeCategoryById,
  updateIncomeCategory,
  deleteIncomeCategory,
} from "../controllers/incomeCategoryController.js";

const incomeCategoryRouter = express.Router();

incomeCategoryRouter.get("/", getAllIncomeCategories);
incomeCategoryRouter.post("/", createIncomeCategory);
incomeCategoryRouter.get("/:id", getIncomeCategoryById);
incomeCategoryRouter.put("/:id", updateIncomeCategory);
incomeCategoryRouter.delete("/:id", deleteIncomeCategory);

export default incomeCategoryRouter; 