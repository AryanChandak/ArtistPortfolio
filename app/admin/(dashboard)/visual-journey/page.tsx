import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { addJournalEntry, deleteJournalEntry, toggleFeatured } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export const dynamic = 'force-dynamic'

export default async function VisualJourneyPage() {
  const cookieStore = await cookies()
  const supabase = await createClient(cookieStore)
  const { data: entries } = await supabase
    .from('journal_entries')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Visual Journey</h1>
      </div>

      {/* Add Form */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-800 p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Add New Entry</h2>
        <form action={addJournalEntry} className="grid grid-cols-2 gap-4" encType="multipart/form-data">
          <Input name="title" placeholder="Title" required />
          <select
            name="category"
            className="flex h-10 w-full rounded-md border border-gray-200 dark:border-zinc-800 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
            defaultValue=""
          >
            <option value="" disabled>Select Category</option>
            <option value="Digital Art">Digital Art</option>
            <option value="Photography">Photography</option>
            <option value="Theory">Theory</option>
            <option value="Personal">Personal</option>
            <option value="Technology">Technology</option>
            <option value="Inspiration">Inspiration</option>
          </select>
          <Input name="excerpt" placeholder="Short excerpt / description" required />
          <Input name="date" type="date" required />
          <Input name="read_time" placeholder="Read time (e.g. 8 min read)" />
          <Input name="image" type="file" accept="image/*" />
          <div className="col-span-2 flex items-center gap-3">
            <label className="text-sm text-gray-600 dark:text-gray-400 w-20">Featured?</label>
            <select
              name="featured"
              className="h-10 rounded-md border border-gray-200 dark:border-zinc-800 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="false">No</option>
              <option value="true">Yes — show as hero article</option>
            </select>
          </div>
          <div className="col-span-2">
            <Button type="submit" className="w-full">Save Entry</Button>
          </div>
        </form>
      </div>

      {/* Entries table */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-800 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 dark:bg-zinc-950/50 border-b border-gray-200 dark:border-zinc-800">
            <tr>
              <th className="p-4 font-medium text-gray-500">Image</th>
              <th className="p-4 font-medium text-gray-500">Title</th>
              <th className="p-4 font-medium text-gray-500">Category</th>
              <th className="p-4 font-medium text-gray-500">Date</th>
              <th className="p-4 font-medium text-gray-500">Featured</th>
              <th className="p-4 font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
            {entries?.map((entry) => (
              <tr key={entry.id} className="hover:bg-gray-50 dark:hover:bg-zinc-900/50 transition">
                <td className="p-4">
                  <img
                    src={entry.image || '/placeholder.svg?height=48&width=64'}
                    alt={entry.title}
                    className="w-16 h-12 object-cover rounded"
                  />
                </td>
                <td className="p-4 font-medium max-w-[200px] truncate">{entry.title}</td>
                <td className="p-4">{entry.category}</td>
                <td className="p-4">{entry.date}</td>
                <td className="p-4">
                  <form
                    action={async () => {
                      'use server'
                      await toggleFeatured(entry.id, entry.featured)
                    }}
                  >
                    <button
                      type="submit"
                      className={`px-2 py-1 rounded text-xs font-medium transition ${
                        entry.featured
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                          : 'bg-gray-100 text-gray-600 dark:bg-zinc-800 dark:text-gray-400'
                      }`}
                    >
                      {entry.featured ? 'Featured' : 'Normal'}
                    </button>
                  </form>
                </td>
                <td className="p-4">
                  <form
                    action={async () => {
                      'use server'
                      await deleteJournalEntry(entry.id)
                    }}
                  >
                    <Button variant="destructive" size="sm" type="submit">Delete</Button>
                  </form>
                </td>
              </tr>
            ))}
            {(!entries || entries.length === 0) && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-500">No journal entries yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
