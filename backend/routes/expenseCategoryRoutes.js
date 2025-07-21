import express from "express";
import { authenticate } from "../middleware/auth.js";
import {
  getAllCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/expenseCategoryController.js";

const categoryRouter = express.Router();

// author to display only that user's category
categoryRouter.use(authenticate); 

categoryRouter.get("/", getAllCategories);
categoryRouter.post("/", createCategory);
categoryRouter.get("/:id", getCategoryById);
categoryRouter.put("/:id", updateCategory);
categoryRouter.delete("/:id", deleteCategory);

export default categoryRouter; 