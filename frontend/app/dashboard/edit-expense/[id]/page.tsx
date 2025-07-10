"use client"

import React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { expensesApi } from "@/lib/api-example"
import { categoriesApi } from "@/lib/api-example"

const categories = ["Groceries", "Leisure", "Electronics", "Utilities", "Clothing", "Health", "Others"]

export default function EditExpensePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params)
  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState("")
  const [date, setDate] = useState("")
  const [category, setCategory] = useState("")
  const [notes, setNotes] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const expense = await expensesApi.getById(Number(id))
        setTitle(expense.title)
        setAmount(expense.amount.toString())
        setDate(expense.date)
        setCategory(expense.category)
        setNotes(expense.notes || "")
      } catch (error: any) {
        toast({
          title: "Failed to load expense",
          description: error?.message || "Could not fetch expense data.",
          variant: "destructive",
        })
        router.push("/dashboard")
      }
    }
    const fetchCategories = async () => {
      try {
        const data = await categoriesApi.getAll()
        setCategories(data.map((cat: any) => cat.name))
      } catch {
        setCategories([])
      }
    }
    fetchExpense()
    fetchCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (!title || !amount || !date || !category) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    try {
      await expensesApi.update(Number((await params).id), {
        title,
        amount: parseFloat(amount),
        date,
        category,
        notes,
      })
      toast({
        title: "Expense updated successfully!",
        description: `${title} has been updated.`,
      })
      setTimeout(() => {
        router.push("/dashboard")
        setIsLoading(false)
      }, 1000)
    } catch (error: any) {
      toast({
        title: "Failed to update expense",
        description: error?.message || "Something went wrong.",
        variant: "destructive",
      })
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Edit Expense</CardTitle>
          <CardDescription>Update the details of your expense</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Grocery Shopping"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount *</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date *</Label>
                <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="pt-2">
                  <Link href="/dashboard/add-category" className="text-sm text-blue-600 hover:underline">+ Add new category</Link>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any additional notes about this expense..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading ? "Updating..." : "Update Expense"}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/dashboard">Cancel</Link>
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  )
}
