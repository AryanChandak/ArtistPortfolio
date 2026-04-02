import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { addPortfolioItem, deletePortfolioItem } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export const dynamic = 'force-dynamic'

export default async function PortfolioPage() {
  const cookieStore = await cookies()
  const supabase = await createClient(cookieStore)
  const { data: items } = await supabase.from('portfolio_items').select('*').order('created_at', { ascending: false })

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Portfolio Items</h1>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-800 p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Add New Item</h2>
        <form action={addPortfolioItem} className="grid grid-cols-2 gap-4" encType="multipart/form-data">
          <Input name="title" placeholder="Title (e.g. Digital Dreams)" required />
          <select name="category" className="flex h-10 w-full rounded-md border border-gray-200 dark:border-zinc-800 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" required defaultValue="">
            <option value="" disabled>Select Category</option>
            <option value="Digital Art">Digital Art</option>
            <option value="Photography">Photography</option>
            <option value="Portrait">Portrait</option>
            <option value="Prints">Prints</option>
            <option value="Commission">Commission</option>
            <option value="Other">Other</option>
          </select>
          <Input name="image" type="file" accept="image/*" required />
          <Input name="description" placeholder="Description" required />
          <Input name="year" placeholder="Year" />
          <Input name="client" placeholder="Client" />
          <div className="col-span-2">
            <Button type="submit" className="w-full">Save Portfolio Item</Button>
          </div>
        </form>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-800 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 dark:bg-zinc-950/50 border-b border-gray-200 dark:border-zinc-800">
            <tr>
              <th className="p-4 font-medium text-gray-500">Image</th>
              <th className="p-4 font-medium text-gray-500">Title</th>
              <th className="p-4 font-medium text-gray-500">Category</th>
              <th className="p-4 font-medium text-gray-500">Year</th>
              <th className="p-4 font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
            {items?.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-zinc-900/50 transition">
                <td className="p-4">
                  <img src={item.image} alt={item.title} className="w-16 h-12 object-cover rounded" />
                </td>
                <td className="p-4 font-medium">{item.title}</td>
                <td className="p-4">{item.category}</td>
                <td className="p-4">{item.year}</td>
                <td className="p-4">
                  <form action={async () => {
                    "use server"
                    await deletePortfolioItem(item.id)
                  }}>
                    <Button variant="destructive" size="sm" type="submit">Delete</Button>
                  </form>
                </td>
              </tr>
            ))}
            {(!items || items.length === 0) && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">No portfolio items found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
