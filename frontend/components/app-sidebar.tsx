"use client"

import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { LayoutDashboard, Plus, LogOut, DollarSign, User, X, TrendingUp, List, Folder, FolderOpen } from "lucide-react"
import Link from "next/link"

const menuItems = [
	{
		title: "Dashboard",
		url: "/dashboard",
		icon: LayoutDashboard,
	},
	{
		title: "Add Expense",
		url: "/dashboard/add-expense",
		icon: Plus,
	},
	{
		title: "Add Income",
		url: "/dashboard/incomes",
		icon: TrendingUp,
	},
	{
		title: "Manage Incomes",
		url: "/dashboard/incomes",
		icon: List,
	},
	{
		title: "Expense Categories",
		url: "/dashboard/categories",
		icon: Folder,
	},
	{
		title: "Income Categories",
		url: "/dashboard/income-categories",
		icon: FolderOpen,
	},
]

interface AppSidebarProps {
	isOpen: boolean
	onClose: () => void
}

export function AppSidebar({ isOpen, onClose }: AppSidebarProps) {
	const router = useRouter()
	const pathname = usePathname()
	const { toast } = useToast()

	const handleLogout = () => {
		localStorage.removeItem("token")
		toast({
			title: "Logged out successfully",
			description: "You have been logged out of your account.",
		})
		router.push("/login")
	}

	// Get user email from localStorage
	let userEmail = "user@example.com"
	if (typeof window !== "undefined") {
		const user = localStorage.getItem("user")
		console.log("User data:", user) // Debugging line to check user data
		if (user) {
			try {
				userEmail = JSON.parse(user).email || userEmail
			} catch {
				// fallback to default
			}
		}
	}

	if (!isOpen) return null

	return (
		<div className="flex min-h-screen h-full w-64 flex-col bg-sidebar border-r fixed left-0 top-0 z-40">
			{/* Header */}
			<div className="flex items-center justify-between p-4 border-b">
				<div className="flex items-center gap-2">
					<div className="bg-primary rounded-lg p-2">
						<DollarSign className="h-5 w-5 text-primary-foreground" />
					</div>
					<div>
						<h2 className="text-lg font-semibold">Expense Tracker</h2>
						<p className="text-xs text-muted-foreground">Manage your finances</p>
					</div>
				</div>
				<Button variant="ghost" size="icon" onClick={onClose} className="md:hidden h-6 w-6">
					<X className="h-4 w-4" />
				</Button>
			</div>

			{/* Navigation (scrollable area) */}
			<div className="flex-1 p-4 overflow-y-auto min-h-0">
				<div className="space-y-2">
					<h3 className="text-sm font-medium text-muted-foreground px-2 mb-2">Navigation</h3>
					{menuItems.map((item) => (
						<Link
							key={item.title}
							href={item.url}
							className={`
                flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors
                ${
									pathname === item.url
										? "bg-primary text-primary-foreground"
										: "text-foreground hover:bg-accent hover:text-accent-foreground"
								}
              `}
							onClick={() => {
								if (window.innerWidth < 768) {
									onClose()
								}
							}}
						>
							<item.icon className="h-4 w-4" />
							<span>{item.title}</span>
						</Link>
					))}

					{/* Move user info and logout button here */}
					<div className="mt-6 border-t pt-4">
						<div className="flex items-center gap-2 px-2 py-2 text-sm mb-2">
							<User className="h-4 w-4" />
							<span>{userEmail}</span>
						</div>
						<Button variant="ghost" className="w-full justify-start text-sm" onClick={handleLogout}>
							<LogOut className="h-4 w-4 mr-2" />
							Logout
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
