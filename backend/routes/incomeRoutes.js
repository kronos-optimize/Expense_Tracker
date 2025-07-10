import express from "express";
import {
  getAllIncomes,
  createIncome,
  getIncomeById,
  updateIncome,
  deleteIncome,
} from "../controllers/incomeController.js";

const incomeRouter = express.Router();

incomeRouter.get("/", getAllIncomes);
incomeRouter.post("/", createIncome);
incomeRouter.get("/:id", getIncomeById);
incomeRouter.put("/:id", updateIncome);
incomeRouter.delete("/:id", deleteIncome);

export default incomeRouter; 