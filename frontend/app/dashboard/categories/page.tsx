"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { categoriesApi } from "@/lib/api-example"
import { useToast } from "@/hooks/use-toast"

interface Category {
  id: number
  name: string
  description?: string
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [editId, setEditId] = useState<number | null>(null)
  const [editName, setEditName] = useState("")
  const [editDescription, setEditDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const fetchCategories = async () => {
    try {
      const data = await categoriesApi.getAll()
      setCategories(data)
    } catch {
      setCategories([])
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    if (!name) {
      toast({ title: "Category name is required", variant: "destructive" })
      setIsLoading(false)
      return
    }
    try {
      await categoriesApi.create({ name, description })
      setName("")
      setDescription("")
      toast({ title: "Category added successfully!" })
      fetchCategories()
    } catch (error: any) {
      toast({
        title: "Failed to add category",
        description: error?.message || "Something went wrong.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (cat: Category) => {
    setEditId(cat.id)
    setEditName(cat.name)
    setEditDescription(cat.description || "")
  }

  const handleUpdate = async (id: number) => {
    setIsLoading(true)
    try {
      await categoriesApi.update(id, { name: editName, description: editDescription })
      toast({ title: "Category updated successfully!" })
      setEditId(null)
      fetchCategories()
    } catch (error: any) {
      toast({
        title: "Failed to update category",
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
      await categoriesApi.delete(id)
      toast({ title: "Category deleted successfully!" })
      fetchCategories()
    } catch (error: any) {
      toast({
        title: "Failed to delete category",
        description: error?.message || "Something went wrong.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Manage Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Groceries"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                placeholder="Add a description for this category..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
              />
            </div>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Adding..." : "Add Category"}
            </Button>
          </form>

          <div className="pt-6">
            <h3 className="font-semibold mb-2">Existing Categories</h3>
            <ul className="space-y-4">
              {categories.map((cat) => (
                <li key={cat.id} className="flex flex-col md:flex-row md:items-center md:gap-4 border-b pb-2">
                  {editId === cat.id ? (
                    <>
                      <Input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="mb-2 md:mb-0"
                      />
                      <Textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        rows={1}
                        className="mb-2 md:mb-0"
                      />
                      <Button size="sm" onClick={() => handleUpdate(cat.id)} disabled={isLoading} className="mr-2">
                        Save
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setEditId(null)}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <span className="font-medium">{cat.name}</span>
                      {cat.description && <span className="text-sm text-gray-500 ml-2">{cat.description}</span>}
                      <Button size="sm" variant="ghost" onClick={() => handleEdit(cat)} className="ml-auto">
                        Edit
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(cat.id)}>
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