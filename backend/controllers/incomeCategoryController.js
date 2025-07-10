import { IncomeCategory } from "../model/index.js";

export const getAllIncomeCategories = async (req, res) => {
  try {
    const categories = await IncomeCategory.findAll();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch income categories" });
  }
};

export const createIncomeCategory = async (req, res) => {
  try {
    const category = await IncomeCategory.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: "Failed to create income category" });
  }
};

export const getIncomeCategoryById = async (req, res) => {
  try {
    const category = await IncomeCategory.findByPk(req.params.id);
    if (!category) return res.status(404).json({ error: "Income category not found" });
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch income category" });
  }
};

export const updateIncomeCategory = async (req, res) => {
  try {
    const category = await IncomeCategory.findByPk(req.params.id);
    if (!category) return res.status(404).json({ error: "Income category not found" });
    await category.update(req.body);
    res.json(category);
  } catch (err) {
    res.status(400).json({ error: "Failed to update income category" });
  }
};

export const deleteIncomeCategory = async (req, res) => {
  try {
    const category = await IncomeCategory.findByPk(req.params.id);
    if (!category) return res.status(404).json({ error: "Income category not found" });
    await category.destroy();
    res.json({ message: "Income category deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete income category" });
  }
}; 