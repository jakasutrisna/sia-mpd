"use client"

import { useState, useEffect } from 'react'
import { createClient } from '@/src/utils/supabase/client'
import { addDosen, updateDosen, deleteDosen } from '@/src/actions/dosen'

// Avatar Bawaan (SVG) jika foto belum diunggah
const AvatarMale = () => (
  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center border border-blue-200">
    <svg className="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a5 5 0 100 10 5 5 0 000-10zM4 21v-1a7 7 0 0114 0v1H4z" />
    </svg>
  </div>
)

const AvatarFemale = () => (
  <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center border border-pink-200">
    <svg className="w-6 h-6 text-pink-500" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a5 5 0 100 10 5 5 0 000-10zM12 13a7 7 0 00-7 7v1h14v-1a7 7 0 00-7-7z" />
    </svg>
  </div>
)

export default function AdminDosenPage() {
  const [listDosen, setListDosen] = useState<any[]>([])
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [selectedDosen, setSelectedDosen] = useState<any | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const supabase = createClient()

  const loadData = async () => {
    const { data } = await supabase.from('dosen').select('*').order('created_at', { ascending: false })
    if (data) setListDosen(data)
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleDelete = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus data dosen ini?')) {
      await deleteDosen(id)
      loadData()
    }
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 text-black">
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-2xl font-bold">Admin Panel - Kelola Data Dosen</h1>
        <button
          onClick={() => setIsAddOpen(true)}
          className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 shadow"
        >
          + Tambah Dosen Baru
        </button>
      </div>

      {/* Tabel Data Dosen */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full border-collapse text-sm text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-3 text-center w-12">No</th>
              <th className="p-3">Foto</th>
              <th className="p-3">Nama</th>
              <th className="p-3">Gender</th>
              <th className="p-3">NIDOS / NIP</th>
              <th className="p-3">NIDN / NUPTK</th>
              <th className="p-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {listDosen.map((dosen, index) => (
              <tr key={dosen.id}>
                <td className="p-3 text-center font-medium text-gray-500">
                  {index + 1}
                </td>
                <td className="p-3">
                  {dosen.foto_url ? (
                    <img
                      src={dosen.foto_url}
                      alt={dosen.nama}
                      onError={(e) => {
                        // Jika URL gambar di database error/rusak, sembunyikan gambar
                        e.currentTarget.style.display = 'none'
                      }}
                      className="w-10 h-10 object-cover rounded-full border border-gray-200"
                    />
                  ) : dosen.jenis_kelamin === 'P' ? (
                    <AvatarFemale />
                  ) : (
                    <AvatarMale />
                  )}
                </td>
                <td className="p-3 font-semibold">{dosen.nama}</td>
                <td className="p-3">
                  {dosen.jenis_kelamin === 'P' ? 'Perempuan' : 'Laki-Laki'}
                </td>
                <td className="p-3 font-medium text-gray-700">{dosen.nip || '-'}</td>
                  <td className="p-3 font-medium text-gray-700">{dosen.nidn || '-'}</td> 
                  <td className="p-3 text-center space-x-2">
                  <button
                    onClick={() => setSelectedDosen(dosen)}
                    className="bg-amber-500 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-amber-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(dosen.id)}
                    className="bg-rose-600 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-rose-700"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 1. MODAL TAMBAH DOSEN */}
      {isAddOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full space-y-4 shadow-xl">
            <h2 className="text-xl font-bold border-b pb-2">Tambah Dosen Baru</h2>

            <form
              action={async (formData) => {
                setIsUploading(true)
                await addDosen(formData)
                setIsUploading(false)
                setIsAddOpen(false)
                loadData()
              }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="col-span-2">
                <label className="text-xs font-bold text-gray-600">Nama Lengkap & Gelar</label>
                <input name="nama" required className="w-full border p-2 rounded text-black bg-white" />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-600">NIDOS</label>
                <input name="nip" className="w-full border p-2 rounded text-black bg-white" />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-600">NIDN / NUPTK</label>
                <input name="nidn" className="w-full border p-2 rounded text-black bg-white" />
              </div>

              <div className="col-span-2">
                <label className="text-xs font-bold text-gray-600">Jenis Kelamin</label>
                <select name="jenis_kelamin" className="w-full border p-2 rounded text-black bg-white">
                  <option value="L">Laki-Laki</option>
                  <option value="P">Perempuan</option>
                </select>
              </div>

              <div className="col-span-2 border p-3 rounded bg-gray-50">
                <label className="block text-xs font-bold text-gray-700 mb-1">Upload Foto Dosen</label>
                <input name="foto" type="file" accept="image/*" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-600">Link Sinta</label>
                <input name="link_sinta" className="w-full border p-2 rounded text-black bg-white" />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-600">Link Scholar</label>
                <input name="link_scholar" className="w-full border p-2 rounded text-black bg-white" />
              </div>

              <div className="col-span-2">
                <label className="text-xs font-bold text-gray-600">Link PDDikti</label>
                <input name="link_pddikti" className="w-full border p-2 rounded text-black bg-white" />
              </div>

              <div className="col-span-2 flex justify-end gap-2 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="bg-gray-300 text-black px-4 py-2 rounded text-sm font-semibold hover:bg-gray-400"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {isUploading ? 'Menyimpan...' : 'Simpan Dosen'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. MODAL UBAH (EDIT) DOSEN */}
      {selectedDosen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full space-y-4 shadow-xl">
            <h2 className="text-xl font-bold border-b pb-2">Ubah Data Dosen</h2>

            <form
              action={async (formData) => {
                setIsUploading(true)
                await updateDosen(formData)
                setIsUploading(false)
                setSelectedDosen(null)
                loadData()
              }}
              className="grid grid-cols-2 gap-4"
            >
              <input type="hidden" name="id" value={selectedDosen.id} />
              <input type="hidden" name="current_foto_url" value={selectedDosen.foto_url || ''} />

              <div className="col-span-2">
                <label className="text-xs font-bold text-gray-600">Nama Lengkap & Gelar</label>
                <input name="nama" defaultValue={selectedDosen.nama} required className="w-full border p-2 rounded text-black bg-white" />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-600">NIDOS</label>
                <input name="nip" defaultValue={selectedDosen.nip} className="w-full border p-2 rounded text-black bg-white" />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-600">NIDN / NUPTK</label>
                <input name="nidn" defaultValue={selectedDosen.nidn} className="w-full border p-2 rounded text-black bg-white" />
              </div>

              {/* Input Select Jenis Kelamin saat Edit */}
              <div className="col-span-2">
                <label className="text-xs font-bold text-gray-600">Jenis Kelamin</label>
                <select 
                  name="jenis_kelamin" 
                  defaultValue={selectedDosen.jenis_kelamin || 'L'} 
                  className="w-full border p-2 rounded text-black bg-white"
                >
                  <option value="L">Laki-Laki</option>
                  <option value="P">Perempuan</option>
                </select>
              </div>

              <div className="col-span-2 border p-3 rounded bg-gray-50">
                <label className="block text-xs font-bold text-gray-700 mb-1">Ganti Foto Baru (Opsional)</label>
                <input name="foto" type="file" accept="image/*" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-600">Link Sinta</label>
                <input name="link_sinta" defaultValue={selectedDosen.link_sinta} className="w-full border p-2 rounded text-black bg-white" />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-600">Link Scholar</label>
                <input name="link_scholar" defaultValue={selectedDosen.link_scholar} className="w-full border p-2 rounded text-black bg-white" />
              </div>

              <div className="col-span-2">
                <label className="text-xs font-bold text-gray-600">Link PDDikti</label>
                <input name="link_pddikti" defaultValue={selectedDosen.link_pddikti} className="w-full border p-2 rounded text-black bg-white" />
              </div>

              <div className="col-span-2 flex justify-end gap-2 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setSelectedDosen(null)}
                  className="bg-gray-300 text-black px-4 py-2 rounded text-sm font-semibold hover:bg-gray-400"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {isUploading ? 'Mengunggah...' : 'Simpan Perubahan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}