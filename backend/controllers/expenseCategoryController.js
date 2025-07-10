import { ExpenseCategory } from "../model/index.js";

export const getAllCategories = async (req, res) => {
  try {
    const categories = await ExpenseCategory.findAll();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

export const createCategory = async (req, res) => {
  try {
    const category = await ExpenseCategory.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message || "Failed to create category" });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const category = await ExpenseCategory.findByPk(req.params.id);
    if (!category) return res.status(404).json({ error: "Category not found" });
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch category" });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const category = await ExpenseCategory.findByPk(req.params.id);
    if (!category) return res.status(404).json({ error: "Category not found" });
    await category.update(req.body);
    res.json(category);
  } catch (err) {
    res.status(400).json({ error: "Failed to update category" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await ExpenseCategory.findByPk(req.params.id);
    if (!category) return res.status(404).json({ error: "Category not found" });
    await category.destroy();
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete category" });
  }
};
