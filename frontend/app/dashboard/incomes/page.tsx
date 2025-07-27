"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { incomesApi } from "@/lib/api-example"
import { categoriesApi } from "@/lib/api-example"
import { incomeCategoriesApi } from "@/lib/api-example"
import { useToast } from "@/hooks/use-toast"

interface Income {
  id: number
  amount: number
  date: string
  category: string
  notes?: string
}

export default function IncomesPage() {
  const [incomes, setIncomes] = useState<Income[]>([])
  const [amount, setAmount] = useState("")
  const [date, setDate] = useState("")
  const [notes, setNotes] = useState("")
  const [category, setCategory] = useState("")
  const [categories, setCategories] = useState<{ id: string, name: string }[]>([]);
  const [categoryId, setCategoryId] = useState("");
  const [editId, setEditId] = useState<number | null>(null)
  const [editAmount, setEditAmount] = useState("")
  const [editDate, setEditDate] = useState("")
  const [editNotes, setEditNotes] = useState("")
  const [editCategory, setEditCategory] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const fetchIncomes = async () => {
    try {
      const data = await incomesApi.getAll()
      setIncomes(data)
    } catch {
      setIncomes([])
    }
  }

  useEffect(() => {
    fetchIncomes()
    const fetchCategories = async () => {
      try {
        const data = await incomeCategoriesApi.getAll();
        setCategories(data.map((cat: any) => ({ id: String(cat.id), name: cat.name })));
      } catch {
        setCategories([]);
      }
    };
    fetchCategories();
  }, [])

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    if (!amount || !date || !categoryId) {
      toast({ title: "All fields except notes are required", variant: "destructive" })
      setIsLoading(false)
      return
    }
    try {
      await incomesApi.create({ amount: parseFloat(amount), date, categoryId: Number(categoryId), notes })
      setAmount("")
      setDate("")
      setNotes("")
      setCategoryId("")
      toast({ title: "Income added successfully!" })
      fetchIncomes()
    } catch (error: any) {
      toast({
        title: "Failed to add income",
        description: error?.message || "Something went wrong.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (inc: Income) => {
    setEditId(inc.id)
    setEditAmount(inc.amount.toString())
    setEditDate(inc.date)
    setEditNotes(inc.notes || "")
    setEditCategory(inc.category)
  }

  const handleUpdate = async (id: number) => {
    setIsLoading(true)
    try {
      await incomesApi.update(id, { amount: parseFloat(editAmount), date: editDate, categoryId: categories.find(cat => cat.name === editCategory)?.id || "", notes: editNotes })
      toast({ title: "Income updated successfully!" })
      setEditId(null)
      fetchIncomes()
    } catch (error: any) {
      toast({
        title: "Failed to update income",
        description: error?.message || "Something went wrong.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    setIsLoading(true)
    try {
      await incomesApi.delete(id)
      toast({ title: "Income deleted successfully!" })
      fetchIncomes()
    } catch (error: any) {
      toast({
        title: "Failed to delete income",
        description: error?.message || "Something went wrong.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const totalIncome = incomes.reduce((sum, inc) => sum + (inc.amount || 0), 0)

  return (
    <div className="space-y-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Manage Incomes</CardTitle>
          <div className="mt-2 font-semibold">Total Income: ${totalIncome.toFixed(2)}</div>
          <div className="mt-2">
            <a href="/dashboard/income-categories" className="text-blue-600 hover:underline text-sm">+ Manage Income Categories</a>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleAdd} className="space-y-4">
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
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <select
                id="category"
                value={categoryId}
                onChange={e => setCategoryId(e.target.value)}
                required
                className="border rounded px-2 py-1 w-full"
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any additional notes about this income..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
              />
            </div>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Adding..." : "Add Income"}
            </Button>
          </form>

          <div className="pt-6">
            <h3 className="font-semibold mb-2">Existing Incomes</h3>
            <ul className="space-y-4">
              {incomes.map((inc) => (
                <li key={inc.id} className="flex flex-col md:flex-row md:items-center md:gap-4 border-b pb-2">
                  {editId === inc.id ? (
                    <>
                      <Input
                        value={editAmount}
                        type="number"
                        step="0.01"
                        onChange={(e) => setEditAmount(e.target.value)}
                        className="mb-2 md:mb-0"
                      />
                      <Input
                        value={editDate}
                        type="date"
                        onChange={(e) => setEditDate(e.target.value)}
                        className="mb-2 md:mb-0"
                      />
                      <select
                        value={editCategory}
                        onChange={e => setEditCategory(e.target.value)}
                        required
                        className="border rounded px-2 py-1 mb-2 md:mb-0"
                      >
                        <option value="">Select a category</option>
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.name}>{cat.name}</option>
                        ))}
                      </select>
                      <Textarea
                        value={editNotes}
                        onChange={(e) => setEditNotes(e.target.value)}
                        rows={1}
                        className="mb-2 md:mb-0"
                      />
                      <Button size="sm" onClick={() => handleUpdate(inc.id)} disabled={isLoading} className="mr-2">
                        Save
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setEditId(null)}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <span className="font-medium">${inc.amount.toFixed(2)}</span>
                      <span className="ml-2 text-sm text-gray-500">{inc.date}</span>
                      {inc.notes && <span className="ml-2 text-sm text-gray-500">{inc.notes}</span>}
                      <Button size="sm" variant="ghost" onClick={() => handleEdit(inc)} className="ml-auto">
                        Edit
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(inc.id)}>
                        Delete
                      </Button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 