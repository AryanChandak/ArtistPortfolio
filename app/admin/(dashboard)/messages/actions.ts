"use server"

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export async function markAsRead(id: string) {
  const cookieStore = await cookies()
  const supabase = await createClient(cookieStore)
  
  const { error } = await supabase.from('messages').update({ read: true }).eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/messages')
  return { success: true }
}

export async function deleteMessage(id: string) {
  const cookieStore = await cookies()
  const supabase = await createClient(cookieStore)
  
  const { error } = await supabase.from('messages').delete().eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/messages')
  return { success: true }
}
