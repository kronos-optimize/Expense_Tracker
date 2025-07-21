import "./model/index.js"; // Import associations
import express from "express";
import cors from "cors";
import sequelize from "./db/database.js";
import seedDatabase from "./db/seeder.js";
import expenseRouter from "./routes/expenseRoutes.js"; 
import userRouter from "./routes/userRoutes.js";
import expenseCategoryRouter from "./routes/expenseCategoryRoutes.js";
import incomeRouter from "./routes/incomeRoutes.js";
import incomeCategoryRouter from "./routes/incomeCategoryRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:3000", // our frontend source
}));
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/expenses", expenseRouter); 
app.use("/api/categories", expenseCategoryRouter);
app.use("/api/incomes", incomeRouter);
app.use("/api/income-categories", incomeCategoryRouter);

const PORT = 4000;
sequelize.sync().then( async() => {
  await seedDatabase(); // clone some data for demo
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});