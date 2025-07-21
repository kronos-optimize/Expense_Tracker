import bcrypt from "bcrypt";
import {
  User,
  Income,
  Expense,
  IncomeCategory,
  ExpenseCategory,
} from "../model/index.js";
import sequelize from "./database.js";

export default async function seedDatabase() {
  await sequelize.sync();

  // Check if there are any users already
  // we will seed data only first time that you used our project to run
  const userCount = await User.count();
  if (userCount > 0) {
    console.log("Seed data already exists. Skipping seeding.");
    return;
  }

  // 2 - Seed users with hashed passwords
  const users = [
    { email: "vathanak@gmail.com", password: "nak123" },
    { email: "phalla@gmail.com", password: "phalla123" },
    { email: "sokchetra@gmail.com", password: "chetra123" },
  ];

  for (const user of users) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  await User.bulkCreate(users);
  // console.log("Users seeded");

  // 3 - Seed income categories (user-specific)
  await IncomeCategory.bulkCreate([
    // User 1
    { name: "Salary", description: "Monthly salary", userId: 1 },
    { name: "Freelancing", description: "Freelance gigs", userId: 1 },
    { name: "Investments", description: "Stock/crypto earnings", userId: 1 },
    { name: "Gift", description: "Received gifts", userId: 1 },
    // User 2
    { name: "Salary", description: "Monthly salary", userId: 2 },
    { name: "Freelancing", description: "Freelance gigs", userId: 2 },
    { name: "Investments", description: "Stock/crypto earnings", userId: 2 },
    { name: "Bonus", description: "Year-end bonus", userId: 2 },
    // User 3
    { name: "Salary", description: "Monthly salary", userId: 3 },
    { name: "Freelancing", description: "Freelance gigs", userId: 3 },
    { name: "Investments", description: "Stock/crypto earnings", userId: 3 },
    { name: "Allowance", description: "Monthly allowance", userId: 3 },
  ]);
  // console.log("Income categories seeded");

  // 4 - Seed expense categories (user-specific)
  await ExpenseCategory.bulkCreate([
    // User 1
    { name: "Food", description: "Meals and groceries", userId: 1 },
    { name: "Transport", description: "Commute and travel", userId: 1 },
    { name: "Entertainment", description: "Movies, games, fun", userId: 1 },
    { name: "Shopping", description: "Clothes and accessories", userId: 1 },
    // User 2
    { name: "Food", description: "Meals and groceries", userId: 2 },
    { name: "Transport", description: "Commute and travel", userId: 2 },
    { name: "Entertainment", description: "Movies, games, fun", userId: 2 },
    { name: "Bills", description: "Utilities and rent", userId: 2 },
    // User 3
    { name: "Food", description: "Meals and groceries", userId: 3 },
    { name: "Transport", description: "Commute and travel", userId: 3 },
    { name: "Entertainment", description: "Movies, games, fun", userId: 3 },
    { name: "Health", description: "Medical expenses", userId: 3 },
  ]);
  // console.log("Expense categories seeded");

  // 5 - Map categories by name
  const incomeCategories = await IncomeCategory.findAll();
  const incomeMap = {};
  incomeCategories.forEach((cat) => {
    incomeMap[cat.name] = cat.id;
  });

  const expenseCategories = await ExpenseCategory.findAll();
  const expenseMap = {};
  expenseCategories.forEach((cat) => {
    expenseMap[cat.name] = cat.id;
  });

  // 6 - Seed incomes
  await Income.bulkCreate([
    // User 1 (IncomeCategoryId: 1-4)
    {
      title: "July Salary",
      amount: 1200.00,
      date: "2025-07-01",
      notes: "Regular salary",
      userId: 1,
      categoryId: 1,
    },
    {
      title: "Website Project",
      amount: 600.00,
      date: "2025-07-05",
      notes: "Freelancing gig",
      userId: 1,
      categoryId: 2,
    },
    // User 2 (IncomeCategoryId: 5-8)
    {
      title: "Crypto Profit",
      amount: 200.00,
      date: "2025-07-07",
      notes: "Sold BTC",
      userId: 2,
      categoryId: 7,
    },
    {
      title: "Part-time Job",
      amount: 350.00,
      date: "2025-07-10",
      notes: "Weekend work",
      userId: 2,
      categoryId: 5,
    },
    // User 3 (IncomeCategoryId: 9-12)
    {
      title: "Stock Dividend",
      amount: 150.00,
      date: "2025-07-12",
      notes: "Quarterly dividend",
      userId: 3,
      categoryId: 11,
    },
    {
      title: "App Design",
      amount: 500.00,
      date: "2025-07-15",
      notes: "Freelance design",
      userId: 3,
      categoryId: 10,
    },
  ]);
  // console.log("Incomes seeded");

  // 7 - Seed expenses
  await Expense.bulkCreate([
    // User 1 (ExpenseCategoryId: 1-4)
    {
      title: "Grocery Shopping",
      amount: 80.00,
      date: "2025-07-03",
      notes: "Weekly groceries",
      userId: 1,
      categoryId: 1,
    },
    {
      title: "Bus Pass",
      amount: 15.00,
      date: "2025-07-04",
      notes: "Monthly bus card",
      userId: 1,
      categoryId: 2,
    },
    // User 2 (ExpenseCategoryId: 5-8)
    {
      title: "Netflix Subscription",
      amount: 12.99,
      date: "2025-07-06",
      notes: "Monthly entertainment",
      userId: 2,
      categoryId: 7,
    },
    {
      title: "Dinner Out",
      amount: 25.00,
      date: "2025-07-08",
      notes: "Dinner with friends",
      userId: 2,
      categoryId: 5,
    },
    // User 3 (ExpenseCategoryId: 9-12)
    {
      title: "Taxi Ride",
      amount: 18.00,
      date: "2025-07-09",
      notes: "Airport taxi",
      userId: 3,
      categoryId: 10,
    },
    {
      title: "Concert Ticket",
      amount: 40.00,
      date: "2025-07-11",
      notes: "Live music",
      userId: 3,
      categoryId: 9,
    },
  ]);
  // console.log(" Expenses seeded");

  // console.log("All data seeded successfully!");
}
