"use server"

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export async function addJournalEntry(formData: FormData) {
  const cookieStore = await cookies()
  const supabase = await createClient(cookieStore)

  const title = formData.get('title') as string
  const excerpt = formData.get('excerpt') as string
  const date = formData.get('date') as string
  const read_time = formData.get('read_time') as string
  const category = formData.get('category') as string
  const featured = formData.get('featured') === 'true'
  const imageFile = formData.get('image') as File

  let imageUrl = ""
  if (imageFile && imageFile.size > 0) {
    const ext = imageFile.name.split('.').pop()
    const cleanName = imageFile.name.replace(`.${ext}`, '').replace(/[^a-zA-Z0-9]/g, '')
    const filename = `journal-${Date.now()}-${cleanName}.${ext}`

    const { error: uploadError } = await supabase.storage.from('portfolio-images').upload(filename, imageFile)
    if (uploadError) {
      console.error("Storage upload error:", uploadError)
      return
    }

    const { data: { publicUrl } } = supabase.storage.from('portfolio-images').getPublicUrl(filename)
    imageUrl = publicUrl
  }

  const { error } = await supabase.from('journal_entries').insert({
    title,
    excerpt,
    date,
    read_time,
    category,
    featured,
    image: imageUrl || null,
  })

  if (error) {
    console.error("Database insert error:", error)
    return
  }

  revalidatePath('/admin/visual-journey')
  revalidatePath('/')
}

export async function deleteJournalEntry(id: string) {
  const cookieStore = await cookies()
  const supabase = await createClient(cookieStore)

  const { data: item } = await supabase.from('journal_entries').select('image').eq('id', id).single()
  if (item?.image && item.image.includes('/storage/v1/object/public/portfolio-images/')) {
    const filename = item.image.split('/').pop()
    if (filename) {
      await supabase.storage.from('portfolio-images').remove([filename])
    }
  }

  const { error } = await supabase.from('journal_entries').delete().eq('id', id)
  if (error) return

  revalidatePath('/admin/visual-journey')
  revalidatePath('/')
}

export async function toggleFeatured(id: string, currentValue: boolean) {
  const cookieStore = await cookies()
  const supabase = await createClient(cookieStore)

  const { error } = await supabase.from('journal_entries').update({ featured: !currentValue }).eq('id', id)
  if (error) return

  revalidatePath('/admin/visual-journey')
  revalidatePath('/')
}
