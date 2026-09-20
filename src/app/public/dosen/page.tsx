"use client"

import { useState, useEffect } from 'react'
import { createClient } from '@/src/utils/supabase/client'

// Avatar SVG Bawaan (Tanpa Perlu Upload File Asset Tambahan)
const AvatarMale = () => (
  // <svg className="w-full h-full text-blue-300 bg-blue-50" viewBox="0 0 24 24" fill="currentColor">
  //   <path d="M12 2a5 5 0 100 10 5 5 0 000-10zM4 21v-1a7 7 0 0114 0v1H4z" />
  // </svg>
  <svg className="w-full h-full text-blue-300 bg-blue-50"  fill="currentColor" xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 512"><path fill="#194794" fillRule="nonzero" d="M318.647 319.401c17.395 38.715 58.464 45.55 93.095 52.245C462.398 381.432 512 429.266 512 483.478v22.094c0 3.725-3.04 6.765-6.775 6.765H6.775c-3.735 0-6.775-3.04-6.775-6.765v-19.988c0-65.14 52.682-103.616 105.911-110.739 38.724-5.175 70.951-10.431 84.581-57.241 3.527 3.089 7.233 6.208 11.008 9.566 35.277 31.363 75.025 32.724 109.01-.049 2.792-2.703 5.524-5.246 8.137-7.72z"/><path fill="#D2A75F" fillRule="nonzero" d="M318.647 319.411c9.1 20.247 24.677 31.781 42.409 39.122-59.984 44.01-142.797 41.466-204.49 3.855 18.687-10.064 28.045-24.638 33.907-44.795 3.526 3.09 7.242 6.21 11.027 9.577 35.277 31.363 75.025 32.724 109.01-.049 2.792-2.703 5.524-5.246 8.137-7.71z"/><path fill="#DBB26F" fillRule="nonzero" d="M259.328 391.058c-35.873.159-71.955-9.895-102.762-28.67 18.617-10.024 28.214-24.826 33.916-44.795 3.537 3.09 7.233 6.21 11.018 9.577 18.528 16.472 38.307 24.667 57.828 23.992v39.896z"/><path fill="#E9BE79" d="M134.739 212.161c4.655-13.324 15.482-9.04 30.904-3.412l-.142-.666.142.075c11.004-115.475 85.398-49.193 141.122-109.957 29.279 14.418 48.212 43.104 43.366 107.067l.156-.124a280.937 280.937 0 01-1.534 10.001c14.023-10.621 34.241-9.633 27.882 13.905l-8.687 24.605c-2.077 5.889-3.466 8.027-10.91 7.627-3.288-.175-6.595-1.443-9.894-3.622 3.046 36.31-14.579 48.157-36.64 69.449-33.977 32.787-73.728 31.433-108.995.059-20.658-18.375-39.004-29.534-39.92-67.307-5.356 1.641-10.42 1.939-14.842-.575-8.814-5.016-12.024-19.614-12.505-28.962-.193-3.759-.032-14.335.497-18.163z"/><path fill="#F2CD8C" d="M134.741 212.161c4.66-13.326 15.477-9.036 30.903-3.411l-.138-.665.138.075c8.039-84.405 49.947-71.713 93.68-82.493V351.16c-19.515.683-39.287-7.506-57.817-23.992-20.657-18.374-39.005-29.529-39.914-67.305-5.356 1.637-10.422 1.937-14.843-.577-12.837-7.306-13.871-33.724-12.009-47.125z"/><path fill="#333231" d="M108.075 92.791C176.124 8.703 254.558-37.032 313.452 37.772c72.174 3.79 97.211 121.553 36.678 167.497 4.849-63.963-14.086-92.651-43.364-107.067-55.725 60.764-130.12-5.52-141.122 109.955l-26.707-13.909c-2.652-33.119 5.106-90.577-30.862-101.457z"/></svg>
)



const AvatarFemale = () => (
  // <svg className="w-full h-full text-pink-300 bg-pink-50" viewBox="0 0 24 24" fill="currentColor">
  //   <path d="M12 2a5 5 0 100 10 5 5 0 000-10zM12 13a7 7 0 00-7 7v1h14v-1a7 7 0 00-7-7z" />
  // </svg>
  <svg className="w-full h-full text-pink-300 bg-pink-50"fill="currentColor" xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 475.524"><path fill="#BD2122" d="M308.872 288.993c24.349 32.256 130.224 22.481 173.742 70.421C504.015 382.999 512 410.212 512 468.548c0 3.849-3.122 6.976-6.971 6.976H6.971c-3.849 0-6.971-3.127-6.971-6.976 0-56.802 7.567-84.046 27.739-107.798 49.545-58.383 148.701-27.81 174.243-71.757h106.89z"/><path fill="#DA9C69" d="M119.573 327.784c92.702 88.384 183.067 91.504 275.277-2.29-47.114 2.883-102.058-12.878-88.211-55.622l-.015-.217c-27.444 23.193-69.286 26.568-98.523 4.357-.333 43.832-48.093 57.748-88.528 53.772z"/><path fill="#DEA678" d="M119.557 327.784c45.885 43.749 92.208 66.606 137.453 67.168v-106c-16.851.505-34.825-4.244-48.909-14.948-.328 43.845-48.101 57.761-88.544 53.78z"/><path fill="#2C2C2C" d="M65.103 300.749c43.118-3.502 58.969-48.297 64.28-94.745 8.092-71.107-3.133-162.594 82.446-197.184 67.956-27.481 155.832 9.513 165.417 107.416-.4 66.529 18.309 179.679 77.856 184.513-13.189 37.138-173.831 38.332-147.829-32.799-31.904 21.986-64.107 23.926-99.257 2.101 4.231 76.55-129.724 67.836-142.913 30.698z"/><path fill="#E9BE79" d="M312.975 263.652c37.824-41.834 43.569-83.941 32.789-137.677-26.004-12.053-43.013-38.547-51.727-78.355-10.411 75.787-103.484 72.534-126.887 86.323 0 44.47-4.604 76.221 21.159 117.085 3.286 5.218 6.492 10.252 10.366 14.429 31.272 33.72 84.741 29.498 114.3-1.805z"/><path fill="#F2CD8C" d="M257.011 103.678c-32.047 19.62-74.999 21.509-89.864 30.266 0 6.379-.157 12.414-.307 18.19-1.057 39.017 1.828 67.744 21.467 98.898 3.288 5.214 6.499 10.248 10.368 14.424 15.77 17.001 37.188 24.358 58.336 23.458V103.678z"/></svg>
)

export default function PublicDosenPage() {
  const [listDosen, setListDosen] = useState<any[]>([])
  const [search, setSearch] = useState('')
  
  // State untuk Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('dosen').select('*').order('nip', { ascending: true })
      if (data) setListDosen(data)
    }
    fetchData()
  }, [])

  // 1. Filter data berdasarkan pencarian
  const filteredDosen = listDosen.filter((dosen) =>
    dosen.nama?.toLowerCase().includes(search.toLowerCase()) ||
    dosen.nidn?.includes(search) ||
    dosen.nip?.includes(search)
  )

  // Reset ke halaman 1 setiap kali kata kunci pencarian berubah
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setCurrentPage(1)
  }

  // 2. Kalkulasi Pagination
  const totalPages = Math.ceil(filteredDosen.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedDosen = filteredDosen.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="min-h-screen bg-gray-50/50 py-8 px-4 sm:px-6 text-black w-full flex flex-col justify-between">
      <div>
        {/* Search Bar */}
        <div className="mb-8 text-center">
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              placeholder="🔍 Cari nama dosen, NIDN, atau profil..."
              value={search}
              onChange={handleSearchChange}
              className="w-full border border-gray-300 rounded-full px-5 py-3 shadow-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Grid Cards (Menampilkan 10 Data per Halaman) */}
        {paginatedDosen.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 w-full">
            {paginatedDosen.map((dosen) => (
              <div
                key={dosen.id}
                className="group border border-gray-200 rounded-2xl p-4 flex flex-col justify-between bg-white shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ease-out cursor-pointer"
              >
                <div className="space-y-3">
                  {/* Frame Foto */}
                  <div className="relative w-full h-52 bg-blue-50/50 rounded-xl overflow-hidden flex items-center justify-center">
                    {dosen.foto_url ? (
                      <img
                        src={dosen.foto_url}
                        alt={dosen.nama}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                        className="w-full h-full object-contain object-bottom group-hover:scale-105 transition-transform duration-300 ease-out"
                      />
                    ) : dosen.jenis_kelamin === 'P' ? (
                      <AvatarFemale />
                    ) : (
                      <AvatarMale />
                    )}
                  </div>

                  {/* Nama & NIDN */}
                  <div className="text-center space-y-1">
                    <h3 className="font-bold text-gray-900 text-xs sm:text-sm leading-snug group-hover:text-blue-600 transition-colors">
                      {dosen.nama}
                    </h3>
                    <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">NIDN / NUPTK</p>
                    <p className="text-xs text-gray-600 font-medium">{dosen.nidn || dosen.nip || '-'}</p>
                  </div>
                </div>

                {/* Action Links */}
                <div className="grid grid-cols-3 gap-1.5 mt-4 pt-3 border-t border-dashed border-gray-200">
                  <a
                    href={dosen.link_sinta || '#'}
                    target="_blank"
                    className="bg-emerald-50 text-emerald-700 text-center py-1.5 rounded-lg text-[11px] font-semibold hover:bg-emerald-600 hover:text-white transition-colors"
                  >
                    Sinta
                  </a>
                  <a
                    href={dosen.link_scholar || '#'}
                    target="_blank"
                    className="bg-sky-50 text-sky-700 text-center py-1.5 rounded-lg text-[11px] font-semibold hover:bg-sky-600 hover:text-white transition-colors"
                  >
                    Scholar
                  </a>
                  <a
                    href={dosen.link_pddikti || '#'}
                    target="_blank"
                    className="bg-rose-50 text-rose-700 text-center py-1.5 rounded-lg text-[11px] font-semibold hover:bg-rose-600 hover:text-white transition-colors"
                  >
                    PDDIKTI
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            Data dosen tidak ditemukan.
          </div>
        )}
      </div>

      {/* Kontrol Pagination (Hanya Tampil Jika Total Data > 0) */}
      {totalPages > 0 && (
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 pt-6 gap-4">
          <p className="text-xs text-gray-600">
            Menampilkan <span className="font-bold">{startIndex + 1}</span> -{' '}
            <span className="font-bold">
              {Math.min(startIndex + itemsPerPage, filteredDosen.length)}
            </span>{' '}
            dari <span className="font-bold">{filteredDosen.length}</span> dosen
          </p>

          <div className="flex items-center gap-2">
            {/* Tombol Previous */}
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-lg border border-gray-300 text-xs font-semibold bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              ← Prev
            </button>

            {/* List Nomor Halaman */}
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, index) => {
                const pageNumber = index + 1
                return (
                  <button
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition ${
                      currentPage === pageNumber
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {pageNumber}
                  </button>
                )
              })}
            </div>

            {/* Tombol Next */}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 rounded-lg border border-gray-300 text-xs font-semibold bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}