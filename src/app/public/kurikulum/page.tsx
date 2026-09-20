"use client"

import { useState, useEffect } from 'react'
import { createClient } from '@/src/utils/supabase/client'

export default function PublicKurikulumPage() {
  const [listMatkul, setListMatkul] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const { data } = await supabase
        .from('kurikulum')
        .select('*')
        .order('id', { ascending: true })

      if (data) setListMatkul(data)
      setLoading(false)
    }
    fetchData()
  }, [])

  // Filter pencarian berdasarkan nama mata kuliah atau metode
  const filteredData = listMatkul.filter((item) =>
    item.nama_matkul?.toLowerCase().includes(search.toLowerCase()) ||
    item.metode?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-8 text-black w-full">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Judul Halaman */}
        <div className="text-center space-y-2">
          <h1 className="text-xl sm:text-2xl font-bold tracking-wide uppercase text-gray-900">
            Daftar Mata Kuliah & Kurikulum
          </h1>
        </div>

        {/* Search Bar */}
        <div className="flex justify-between items-center gap-4">
          <div className="relative max-w-md w-full">
            <input
              type="text"
              placeholder="🔍 Cari mata kuliah atau metode..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <span className="text-xs text-gray-500 font-semibold">
            Total: {filteredData.length} Mata Kuliah
          </span>
        </div>

        {/* Tabel Kurikulum Desain Sesuai Gambar */}
        <div className="overflow-x-auto border border-gray-800 shadow-sm rounded-sm">
          <table className="w-full border-collapse text-sm text-left">
            <thead>
              <tr className="bg-purple-500 text-white font-bold border-b border-gray-800">
                <th className="p-3 border-r border-gray-800 text-center w-16">No</th>
                <th className="p-3 border-r border-gray-800 text-center">Nama Mata Kuliah</th>
                <th className="p-3 border-r border-gray-800 text-center w-1/3">Metode</th>
                <th className="p-3 text-center w-1/3">Link RPS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {loading ? (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-gray-500">
                    Memuat data kurikulum...
                  </td>
                </tr>
              ) : filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr key={item.id || index} className="hover:bg-purple-50/40 transition-colors">
                    {/* Nomor Urut */}
                    <td className="p-3 border-r border-gray-800 text-center font-medium">
                      {index + 1}
                    </td>

                    {/* Nama Mata Kuliah */}
                    <td className="p-3 border-r border-gray-800 font-medium text-gray-900">
                      {item.nama_matkul}
                    </td>

                    {/* Metode Pembelajaran */}
                    <td className="p-3 border-r border-gray-800 text-gray-800">
                      {item.metode || '-'}
                    </td>

                    {/* Link RPS */}
                    <td className="p-3 text-blue-600 font-medium hover:underline">
                      {item.link_rps ? (
                        <a href={item.link_rps} target="_blank" rel="noopener noreferrer">
                          RPS {item.nama_matkul}
                        </a>
                      ) : (
                        <span className="text-gray-400 italic font-normal">-</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-gray-500">
                    Data mata kuliah tidak ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}