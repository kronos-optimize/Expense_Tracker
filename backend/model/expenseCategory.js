import { DataTypes } from "sequelize";
import sequelize from "../db/database.js";

const ExpenseCategory = sequelize.define("ExpenseCategory", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

export default ExpenseCategory; 