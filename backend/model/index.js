import User from "./user.js";
import Expense from "./expense.js";
import ExpenseCategory from "./expenseCategory.js";
import Income from "./income.js";
import IncomeCategory from "./incomeCategory.js";

// Define associations
User.hasMany(Expense, { foreignKey: "userId" });
Expense.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Income, { foreignKey: "userId" });
Income.belongsTo(User, { foreignKey: "userId" });
Expense.belongsTo(ExpenseCategory, { foreignKey: 'categoryId', as: 'category'});
ExpenseCategory.hasMany(Expense, { foreignKey: 'categoryId'});
Income.belongsTo(IncomeCategory, { foreignKey: 'categoryId', as: 'category'});
IncomeCategory.hasMany(Income, { foreignKey: 'categoryId' });

export { User, Expense, ExpenseCategory, Income, IncomeCategory };