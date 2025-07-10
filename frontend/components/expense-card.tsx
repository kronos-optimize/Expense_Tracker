"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DeleteConfirmationModal } from "@/components/delete-confirmation-modal"
import { Edit, Trash2, Calendar } from "lucide-react"
import Link from "next/link"
import { expensesApi } from "@/lib/api-example"

interface Expense {
  id: number
  title: string
  amount: number
  date: string
  category: string
  notes: string
}

interface ExpenseCardProps {
  expense: Expense
}

const categoryColors: Record<string, string> = {
  Groceries: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  Leisure: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  Electronics: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  Utilities: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  Clothing: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
  Health: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  Others: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
}

export function ExpenseCard({ expense, onDelete }: ExpenseCardProps & { onDelete?: (id: number) => void }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Handler for deleting the expense
  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await expensesApi.delete(expense.id)
      setShowDeleteModal(false)
      if (onDelete) onDelete(expense.id) // Optionally notify parent to remove from list
    } catch (error) {
      alert("Failed to delete expense.")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-lg">{expense.title}</h3>
                <Badge variant="secondary" className={categoryColors[expense.category?.name] || categoryColors.Others}>
                  {expense.category?.name}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(expense.date)}
                </div>
              </div>
              {expense.notes && <p className="text-sm text-muted-foreground">{expense.notes}</p>}
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary mb-2">${expense.amount.toFixed(2)}</div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/dashboard/edit-expense/${expense.id}`}>
                    <Edit className="h-3 w-3" />
                  </Link>
                </Button>
                <Button variant="outline" size="sm" onClick={() => setShowDeleteModal(true)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        expenseTitle={expense.title}
        expenseAmount={expense.amount}
        onConfirm={handleDelete}    
        isLoading={isDeleting}        
      />
    </>
  )
}
