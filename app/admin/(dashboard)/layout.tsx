import Link from "next/link"
import { LayoutDashboard, Image as ImageIcon, ShoppingBag, MessageSquare, LogOut, BookOpen } from "lucide-react"
import { logout } from "../actions"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-zinc-950">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-gray-200 dark:border-zinc-800">
          <Link href="/admin">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Admin Panel
            </h2>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition">
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link href="/admin/portfolio" className="flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition">
            <ImageIcon size={20} /> Portfolio
          </Link>
          <Link href="/admin/shop" className="flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition">
            <ShoppingBag size={20} /> Shop
          </Link>
          <Link href="/admin/messages" className="flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition">
            <MessageSquare size={20} /> Messages
          </Link>
          <Link href="/admin/visual-journey" className="flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition">
            <BookOpen size={20} /> Visual Journey
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-zinc-800">
          <form action={logout}>
            <button type="submit" className="flex w-full items-center gap-3 px-3 py-2 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 transition">
              <LogOut size={20} /> Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
