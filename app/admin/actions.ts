"use server"

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const cookieStore = await cookies()
  const supabase = await createClient(cookieStore)

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin')
  redirect('/admin')
}

export async function logout() {
  const cookieStore = await cookies()
  const supabase = await createClient(cookieStore)
  await supabase.auth.signOut()
  redirect('/admin/login')
}
