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
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  indexes: [
    {
      unique: true,
      fields: ['userId', 'name'], 
    },
  ],
});

export default ExpenseCategory;
