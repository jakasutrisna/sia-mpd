import { createClient } from '@/src/utils/supabase/server'

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  // Ambil jumlah total data
  const { count: totalDosen } = await supabase.from('dosen').select('*', { count: 'exact', head: true })

  return (
    <div className="space-y-6 text-black">
      <h1 className="text-2xl font-bold">Dashboard Summary</h1>

      {/* Grid Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Dosen</p>
          <p className="text-3xl font-extrabold text-blue-600 mt-2">{totalDosen || 0}</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Mata Kuliah</p>
          <p className="text-3xl font-extrabold text-emerald-600 mt-2">0</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Kelas Aktif</p>
          <p className="text-3xl font-extrabold text-purple-600 mt-2">0</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">PKM & Penelitian</p>
          <p className="text-3xl font-extrabold text-amber-600 mt-2">0</p>
        </div>
      </div>
    </div>
  )
}