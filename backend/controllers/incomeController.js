import { Op } from "sequelize";
import { Income } from "../model/index.js";

export const getAllIncomes = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const where = { userId: req.user.id };
    if (startDate && endDate) {
      where.date = { [Op.gte]: startDate, [Op.lte]: endDate };
    }
    const incomes = await Income.findAll({ where });
    res.json(incomes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch incomes" });
  }
};

export const createIncome = async (req, res) => {
  try {
    const income = await Income.create({
      ...req.body,
      userId: req.user.id,
    });
    res.status(201).json(income);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message || "Failed to create income" });
  }
};

export const getIncomeById = async (req, res) => {
  try {
    const income = await Income.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!income) return res.status(404).json({ error: "Income not found" });
    res.json(income);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch income" });
  }
};

export const updateIncome = async (req, res) => {
  try {
    const income = await Income.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!income) return res.status(404).json({ error: "Income not found" });
    await income.update(req.body);
    res.json(income);
  } catch (err) {
    res.status(400).json({ error: "Failed to update income" });
  }
};

export const deleteIncome = async (req, res) => {
  try {
    const income = await Income.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!income) return res.status(404).json({ error: "Income not found" });
    await income.destroy();
    res.json({ message: "Income deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete income" });
  }
};
