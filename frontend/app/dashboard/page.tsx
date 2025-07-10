"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ExpenseCard } from "@/components/expense-card"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { TrendingUp, DollarSign, Calendar, Plus } from "lucide-react"
import Link from "next/link"
import { expensesApi } from "@/lib/api-example"
import { categoriesApi } from "@/lib/api-example"
import { incomesApi } from "@/lib/api-example"

export default function DashboardPage() {
  type Expense = {
    id: string | number
    date: string
    amount: number
    category: string
    title: string
    notes?: string
  }

  const [filter, setFilter] = useState("all")
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([])
  const [totals, setTotals] = useState({ week: 0, month: 0, last3Months: 0 })
  const [categoryFilter, setCategoryFilter] = useState<string>("")
  const [categories, setCategories] = useState<string[]>([])
  const [incomes, setIncomes] = useState<any[]>([])

  const fetchSummary = async () => {
    try {
      const summary = await expensesApi.getSummary()
      setTotals({
        week: summary.week || 0,
        month: summary.month || 0,
        last3Months: summary.threeMonths || 0,
      })
    } catch (error) {
      console.error("Error fetching summary:", error)
    }
  }

  const fetchExpenses = async () => {
    try {
      const data = await expensesApi.getAll(filter === "all" ? undefined : filter)
      setFilteredExpenses(data)
      await fetchSummary()
    } catch (error) {
      console.error("Error fetching expenses:", error)
    }
  }

  useEffect(() => {
    fetchExpenses()
  }, [])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoriesApi.getAll()
        setCategories(data.map((cat: any) => cat.name))
      } catch {
        setCategories([])
      }
    }
    fetchCategories()
  }, [])

  useEffect(() => {
    const fetchIncomes = async () => {
      try {
        const data = await incomesApi.getAll()
        setIncomes(data)
      } catch {
        setIncomes([])
      }
    }
    fetchIncomes()
  }, [])

  const handleFilterChange = async (value: string) => {
    setFilter(value)
    try {
      // Only fetch expenses that match the filter from the backend
      const data = await expensesApi.getAll(value === "all" ? undefined : value)
      setFilteredExpenses(data)
    } catch (error) {
      console.error("Error fetching filtered expenses:", error)
    }
  }

  const totalIncome = incomes.reduce((sum, inc) => sum + (inc.amount || 0), 0)
  const totalExpense = filteredExpenses.reduce((sum, exp) => sum + (exp.amount || 0), 0)
  const balance = totalIncome - totalExpense

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Track and manage your expenses efficiently</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/add-expense">
            <Plus className="mr-2 h-4 w-4" />
            Add Expense
          </Link>
        </Button>
      </div>

      {/* Add a total section at the top */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:gap-8">
        <div className="font-semibold">Total Income: <span className="text-green-600">${totalIncome.toFixed(2)}</span></div>
        <div className="font-semibold">Total Expense: <span className="text-red-600">${totalExpense.toFixed(2)}</span></div>
        <div className="font-semibold">Balance: <span className={balance >= 0 ? "text-green-700" : "text-red-700"}>${balance.toFixed(2)}</span></div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totals.week.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Avg: ${(totals.week / 7).toFixed(2)}/day
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totals.month.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Avg: ${(totals.month / 4).toFixed(2)}/week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last 3 Months</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totals.last3Months.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Avg: ${(totals.last3Months / 3).toFixed(2)}/mo
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filter Bar */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Expenses</CardTitle>
          <CardDescription>Filter and view your recent expenses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Select value={filter} onValueChange={handleFilterChange}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Filter by time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="week">Past Week</SelectItem>
                <SelectItem value="month">Last Month</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            {filter === "custom" && <DatePickerWithRange />}
          </div>

          {/* Add a category filter dropdown above the expenses list */}
          <div className="mb-4">
            <label htmlFor="categoryFilter" className="mr-2 font-medium">Filter by Category:</label>
            <select
              id="categoryFilter"
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="">All</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Expenses List */}
          <div className="space-y-4">
            {filteredExpenses
              .filter(exp => !categoryFilter || exp.category === categoryFilter)
              .map((expense: any) => (
                <ExpenseCard
                  key={expense.id}
                  expense={expense}
                  onDelete={fetchExpenses}
                />
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
