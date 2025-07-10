"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"

interface DeleteConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  expenseTitle: string
  expenseAmount: number
  onConfirm: () => void // <-- Add this prop
  isLoading?: boolean   // <-- Optional, for loading state
}

export function DeleteConfirmationModal({
  isOpen,
  onClose,
  expenseTitle,
  expenseAmount,
  onConfirm,
  isLoading,
}: DeleteConfirmationModalProps) {
  const { toast } = useToast()

  const handleDelete = async () => {
    await onConfirm()
    toast({
      title: "Expense deleted",
      description: `${expenseTitle} has been deleted successfully.`,
    })
    onClose()
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Expense</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete "{expenseTitle}" (${expenseAmount.toFixed(2)})? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
