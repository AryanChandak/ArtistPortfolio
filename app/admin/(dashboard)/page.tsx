import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const cookieStore = await cookies()
  const supabase = await createClient(cookieStore)
  const { data: { user } } = await supabase.auth.getUser()

  // Get quick counts for dashboard stats
  const { count: portfolioCount } = await supabase.from('portfolio_items').select('*', { count: 'exact', head: true })
  const { count: shopCount } = await supabase.from('shop_items').select('*', { count: 'exact', head: true })
  const { count: messageCount } = await supabase.from('messages').select('*', { count: 'exact', head: true }).eq('read', false)
  const { count: journalCount } = await supabase.from('journal_entries').select('*', { count: 'exact', head: true })

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome back, Admin</h1>
        <p className="text-gray-500">Here's a quick overview of your portfolio.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 border rounded-xl bg-white dark:bg-zinc-900 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2">Portfolio Management</h2>
            <p className="text-gray-500 mb-4">Add, edit, or remove your portfolio items.</p>
            <div className="text-3xl font-bold text-purple-600 mb-4">{portfolioCount || 0} <span className="text-sm font-normal text-gray-400">items</span></div>
          </div>
          <Link href="/admin/portfolio"><Button className="w-full">Manage Portfolio</Button></Link>
        </div>
        
        <div className="p-6 border rounded-xl bg-white dark:bg-zinc-900 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2">Shop Items</h2>
            <p className="text-gray-500 mb-4">Manage products in your online shop.</p>
            <div className="text-3xl font-bold text-purple-600 mb-4">{shopCount || 0} <span className="text-sm font-normal text-gray-400">products</span></div>
          </div>
          <Link href="/admin/shop"><Button className="w-full">Manage Shop</Button></Link>
        </div>
        
        <div className="p-6 border rounded-xl bg-white dark:bg-zinc-900 shadow-sm flex flex-col justify-between">
           <div>
            <h2 className="text-xl font-semibold mb-2">Messages</h2>
            <p className="text-gray-500 mb-4">View contact form submissions.</p>
            <div className="text-3xl font-bold text-pink-600 mb-4">{messageCount || 0} <span className="text-sm font-normal text-gray-400">unread</span></div>
          </div>
          <Link href="/admin/messages"><Button className="w-full">View Messages</Button></Link>
        </div>

        <div className="p-6 border rounded-xl bg-white dark:bg-zinc-900 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2">Visual Journey</h2>
            <p className="text-gray-500 mb-4">Manage journal articles and stories.</p>
            <div className="text-3xl font-bold text-amber-600 mb-4">{journalCount || 0} <span className="text-sm font-normal text-gray-400">entries</span></div>
          </div>
          <Link href="/admin/visual-journey"><Button className="w-full">Manage Journal</Button></Link>
        </div>
      </div>
    </div>
  )
}
