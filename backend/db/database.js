import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,  // Database name
  process.env.DB_USER,  // Database user
  process.env.DB_PASS,  // Database password
  {
      host: process.env.DB_HOST,  // Database host
      dialect: "mysql",  // Database dialect
  }
);

export default sequelize;