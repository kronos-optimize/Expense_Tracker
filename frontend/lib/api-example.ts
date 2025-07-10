import axios from "axios"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

// Error class for API errors
class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message)
    this.name = "ApiError"
  }
}

// Function to get the authentication token from localStorage
const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token")
  }
  return null
}

// Generic API request function using axios
const apiRequest = async (endpoint: string, options: any = {}) => {
  const token = getAuthToken()
  const headers: any = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  }
  try {
    const response = await axios({
      url: `${API_BASE_URL}${endpoint}`,
      method: options.method || "GET",
      headers,
      data: options.body ? JSON.parse(options.body) : undefined,
      params: options.params,
    })
    return response.data
  } catch (error: any) {
    if (error.response) {
      const status = error.response.status
      const errorMessage = error.response.data?.error || error.response.data?.message || error.message
      if (status === 401) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("token")
          localStorage.removeItem("user")
          window.location.href = "/login"
        }
        throw new ApiError(401, "Session expired. Please log in again.")
      }
      throw new ApiError(status, errorMessage)
    }
    throw new ApiError(0, "Network error. Please check your connection.")
  }
}

// Authentication API
export const authApi = {
  // Login with email and password
  login: async (email: string, password: string) => {
    return apiRequest("/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
  },

  // Register a new user
  register: async (email: string, password: string) => {
    return apiRequest("/users/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
  },

  // Forgot password - reset with email and new password
  forgotPassword: async (email: string, newPassword: string) => {
    return apiRequest("/users/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email, newPassword }),
    })
  },
}

// Expenses API
export const expensesApi = {
  // Get all expenses with optional filters
  getAll: async (filter?: string, startDate?: string, endDate?: string) => {
    const params: any = {}
    if (filter) params.filter = filter
    if (startDate) params.startDate = startDate
    if (endDate) params.endDate = endDate
    return apiRequest(`/expenses`, { params })
  },

  // Get a single expense by ID
  getById: async (id: number) => {
    return apiRequest(`/expenses/${id}`)
  },

  // Create a new expense
  create: async (expense: {
    title: string
    amount: number
    date: string
    categoryId: number | string
    notes?: string
  }) => {
    return apiRequest("/expenses", {
      method: "POST",
      body: JSON.stringify(expense),
    })
  },

  // Update an existing expense
  update: async (
    id: number,
    expense: {
      title: string
      amount: number
      date: string
      categoryId: number | string
      notes?: string
    },
  ) => {
    return apiRequest(`/expenses/${id}`, {
      method: "PUT",
      body: JSON.stringify(expense),
    })
  },

  // Delete an expense by ID
  delete: async (id: number) => {
    return apiRequest(`/expenses/${id}`, {
      method: "DELETE",
    })
  },

  // Get summary statistics for expenses
  getSummary: async () => {
    return apiRequest("/expenses/summary/stats")
  },
}

// Categories API
export const categoriesApi = {
  // Get all categories
  getAll: async () => {
    return apiRequest("/categories")
  },

  // Create a new category
  create: async (category: { name: string; description?: string }) => {
    return apiRequest("/categories", {
      method: "POST",
      body: JSON.stringify(category),
    })
  },

  // Update a category
  update: async (id: number, category: { name: string; description?: string }) => {
    return apiRequest(`/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(category),
    })
  },

  // Delete a category
  delete: async (id: number) => {
    return apiRequest(`/categories/${id}`, {
      method: "DELETE",
    })
  },
};

export const incomesApi = {
  getAll: async (startDate?: string, endDate?: string) => {
    const params: any = {}
    if (startDate) params.startDate = startDate
    if (endDate) params.endDate = endDate
    return apiRequest(`/incomes`, { params })
  },
  getById: async (id: number) => {
    return apiRequest(`/incomes/${id}`)
  },
  create: async (income: { amount: number; date: string; categoryId: number | string; notes?: string }) => {
    return apiRequest("/incomes", {
      method: "POST",
      body: JSON.stringify(income),
    })
  },
  update: async (
    id: number,
    income: { amount: number; date: string; categoryId: number | string; notes?: string },
  ) => {
    return apiRequest(`/incomes/${id}`, {
      method: "PUT",
      body: JSON.stringify(income),
    })
  },
  delete: async (id: number) => {
    return apiRequest(`/incomes/${id}`, {
      method: "DELETE" })
  },
}

export const incomeCategoriesApi = {
  getAll: async () => {
    return apiRequest("/income-categories")
  },
  create: async (category: { name: string; description?: string }) => {
    return apiRequest("/income-categories", {
      method: "POST",
      body: JSON.stringify(category),
    })
  },
  update: async (id: number, category: { name: string; description?: string }) => {
    return apiRequest(`/income-categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(category),
    })
  },
  delete: async (id: number) => {
    return apiRequest(`/income-categories/${id}`, {
      method: "DELETE" })
  },
}

export { ApiError }