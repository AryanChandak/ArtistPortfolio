import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { markAsRead, deleteMessage } from './actions'
import { Button } from '@/components/ui/button'

export const dynamic = 'force-dynamic'

export default async function MessagesPage() {
  const cookieStore = await cookies()
  const supabase = await createClient(cookieStore)
  const { data: messages } = await supabase.from('messages').select('*').order('created_at', { ascending: false })

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Contact Messages</h1>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-800 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 dark:bg-zinc-950/50 border-b border-gray-200 dark:border-zinc-800">
            <tr>
              <th className="p-4 font-medium text-gray-500">Date</th>
              <th className="p-4 font-medium text-gray-500">From</th>
              <th className="p-4 font-medium text-gray-500">Subject</th>
              <th className="p-4 font-medium text-gray-500">Message</th>
              <th className="p-4 font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
            {messages?.map((msg) => (
              <tr key={msg.id} className={`hover:bg-gray-50 dark:hover:bg-zinc-900/50 transition ${msg.read ? 'opacity-60' : 'font-semibold'}`}>
                <td className="p-4 whitespace-nowrap">{new Date(msg.created_at).toLocaleDateString()}</td>
                <td className="p-4">
                  {msg.name} <br/>
                  <span className="text-gray-500 font-normal">{msg.email}</span>
                </td>
                <td className="p-4 max-w-[200px] truncate">{msg.subject}</td>
                <td className="p-4 max-w-[300px] truncate">{msg.message}</td>
                <td className="p-4 flex gap-2">
                  {!msg.read && (
                    <form action={async () => {
                      "use server"
                      await markAsRead(msg.id)
                    }}>
                      <Button variant="outline" size="sm" type="submit">Read</Button>
                    </form>
                  )}
                  <form action={async () => {
                    "use server"
                    await deleteMessage(msg.id)
                  }}>
                    <Button variant="destructive" size="sm" type="submit">Delete</Button>
                  </form>
                </td>
              </tr>
            ))}
            {(!messages || messages.length === 0) && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">No messages yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
