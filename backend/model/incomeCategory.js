import { DataTypes } from "sequelize";
import sequelize from "../db/database.js";

const IncomeCategory = sequelize.define("IncomeCategory", {
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

export default IncomeCategory; 