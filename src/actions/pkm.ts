'use server'

import { createClient } from '@/src/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addPenelitianPkm(formData: FormData) {
  const supabase = await createClient()

  const tipe = formData.get('tipe') as string
  const judul = formData.get('judul') as string
  const tahun = parseInt(formData.get('tahun') as string)
  const dosen_id = formData.get('dosen_id') as string

  const { error } = await supabase
    .from('pkm_penelitian')
    .insert([{ tipe, judul, tahun, dosen_id }])

  if (error) throw new Error(error.message)
  revalidatePath('/pkm-penelitian')
}