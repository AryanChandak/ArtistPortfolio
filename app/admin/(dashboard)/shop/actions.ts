"use server"

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export async function addShopItem(formData: FormData) {
  const cookieStore = await cookies()
  const supabase = await createClient(cookieStore)
  
  const title = formData.get('title') as string
  const category = formData.get('category') as string
  const imageFile = formData.get('image') as File
  const description = formData.get('description') as string
  const price = formData.get('price') as string
  const external_link = formData.get('external_link') as string
  
  let imageUrl = ""
  if (imageFile && imageFile.size > 0) {
    const ext = imageFile.name.split('.').pop()
    const cleanName = imageFile.name.replace(`.${ext}`, '').replace(/[^a-zA-Z0-9]/g, '')
    const filename = `${Date.now()}-${cleanName}.${ext}`
    
    const { error: uploadError } = await supabase.storage.from('portfolio-images').upload(filename, imageFile)
    if (uploadError) {
      console.error("Storage upload error:", uploadError)
      return
    }

    const { data: { publicUrl } } = supabase.storage.from('portfolio-images').getPublicUrl(filename)
    imageUrl = publicUrl
  }

  const { error } = await supabase.from('shop_items').insert({
    title,
    category,
    image: imageUrl,
    description,
    price,
    external_link
  })

  if (error) {
    console.error("Database insert error:", error)
    return
  }

  revalidatePath('/admin/shop')
  revalidatePath('/')
}

export async function deleteShopItem(id: string) {
  const cookieStore = await cookies()
  const supabase = await createClient(cookieStore)
  
  const { data: item } = await supabase.from('shop_items').select('image').eq('id', id).single()
  if (item?.image && item.image.includes('/storage/v1/object/public/portfolio-images/')) {
    const filename = item.image.split('/').pop()
    if (filename) {
      await supabase.storage.from('portfolio-images').remove([filename])
    }
  }

  const { error } = await supabase.from('shop_items').delete().eq('id', id)

  if (error) return

  revalidatePath('/admin/shop')
  revalidatePath('/')
}
