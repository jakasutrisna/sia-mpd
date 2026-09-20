'use server'

import { createClient } from '@/src/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addDosen(formData: FormData) {
  const supabase = await createClient()

  const nip = formData.get('nip') as string
  const nidn = formData.get('nidn') as string
  const nama = formData.get('nama') as string
  const jenis_kelamin = formData.get('jenis_kelamin') as string
  const link_sinta = formData.get('link_sinta') as string
  const link_scholar = formData.get('link_scholar') as string
  const link_pddikti = formData.get('link_pddikti') as string
  const fotoFile = formData.get('foto') as File

  let foto_url = ''

  if (fotoFile && fotoFile.size > 0) {
    const fileExt = fotoFile.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random()}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from('dosen-foto')
      .upload(fileName, fotoFile)

    if (uploadError) throw new Error(uploadError.message)

    const { data: publicUrlData } = supabase.storage
      .from('dosen-foto')
      .getPublicUrl(fileName)

    foto_url = publicUrlData.publicUrl
  }

  const { error } = await supabase.from('dosen').insert([
    { nip, nidn, nama, jenis_kelamin, foto_url, link_sinta, link_scholar, link_pddikti }
  ])

  if (error) throw new Error(error.message)

  revalidatePath('/admin/dosen')
  revalidatePath('/dosen')
}

export async function updateDosen(formData: FormData) {
  const supabase = await createClient()

  const id = formData.get('id') as string
  const nip = formData.get('nip') as string
  const nidn = formData.get('nidn') as string
  const nama = formData.get('nama') as string
  const jenis_kelamin = formData.get('jenis_kelamin') as string
  const link_sinta = formData.get('link_sinta') as string
  const link_scholar = formData.get('link_scholar') as string
  const link_pddikti = formData.get('link_pddikti') as string
  const fotoFile = formData.get('foto') as File
  const currentFotoUrl = formData.get('current_foto_url') as string

  let foto_url = currentFotoUrl

  if (fotoFile && fotoFile.size > 0) {
    const fileExt = fotoFile.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random()}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from('dosen-foto')
      .upload(fileName, fotoFile)

    if (uploadError) throw new Error(uploadError.message)

    const { data: publicUrlData } = supabase.storage
      .from('dosen-foto')
      .getPublicUrl(fileName)

    foto_url = publicUrlData.publicUrl
  }

  const { error } = await supabase
    .from('dosen')
    .update({ nip, nidn, nama, jenis_kelamin, foto_url, link_sinta, link_scholar, link_pddikti })
    .eq('id', id)

  if (error) throw new Error(error.message)

  revalidatePath('/admin/dosen')
  revalidatePath('/dosen')
}

export async function deleteDosen(id: string) {
  const supabase = await createClient()

  const { error } = await supabase.from('dosen').delete().eq('id', id)

  if (error) throw new Error(error.message)

  revalidatePath('/admin/dosen')
  revalidatePath('/dosen')
}