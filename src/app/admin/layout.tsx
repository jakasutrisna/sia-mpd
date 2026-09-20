import Link from 'next/link'
import { createClient } from '@/src/utils/supabase/server'
import { logout } from '@/src/actions/auth'
import AutoLogout from '@/src/components/AutoLogout'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  // Ambil data profil user yang sedang terautentikasi
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="flex min-h-screen bg-gray-100 text-black">
      {/* 🟢 Pasang Auto Logout Listener (Contoh: 15 Menit Idle) */}
      <AutoLogout timeoutMinutes={30} />
      {/* 1. SIDEBAR NAVIGASI KIRI */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col justify-between shrink-0 min-h-screen">
        <div>
          {/* Logo / Title Aplikasi */}
          <div className="p-5 border-b border-slate-800">
            <h2 className="text-xl font-bold tracking-wide text-white">SI-AKADEMIK</h2>
            <p className="text-xs text-slate-400 mt-0.5">Admin Control Panel</p>
          </div>

          {/* List Menu Navigasi */}
          <nav className="p-4 space-y-1 text-sm font-medium">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 transition-colors text-slate-200"
            >
              <span>📊</span> Dashboard
            </Link>

            <div className="pt-2 pb-1 px-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Master Data
            </div>

            <Link
              href="/admin/dosen"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 transition-colors text-slate-200"
            >
              <span>👨‍🏫</span> Data Dosen
            </Link>

            <Link
              href="/admin/matakuliah"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 transition-colors text-slate-200"
            >
              <span>📚</span> Mata Kuliah
            </Link>

            <Link
              href="/admin/kelas"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 transition-colors text-slate-200"
            >
              <span>🏫</span> Data Kelas
            </Link>

            <div className="pt-2 pb-1 px-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Tridharma
            </div>

            <Link
              href="/admin/pkm"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 transition-colors text-slate-200"
            >
              <span>🤝</span> Kegiatan PKM
            </Link>

            <Link
              href="/admin/penelitian"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 transition-colors text-slate-200"
            >
              <span>🔬</span> Penelitian
            </Link>

            <div className="pt-2 pb-1 px-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Pengaturan
            </div>

            <Link
              href="/admin/manajemen-user"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 transition-colors text-slate-200"
            >
              <span>👥</span> Manajemen User
            </Link>
          </nav>
        </div>

        {/* Footer Sidebar */}
        <div className="p-4 border-t border-slate-800 text-xs text-slate-500 text-center">
          © 2026 Sistem Akademik v1.0
        </div>
      </aside>

      {/* 2. AREA UTAMA (NAVBAR ATAS & CONTENT) */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* NAVBAR ATAS */}
        <header className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between sticky top-0 z-40 shadow-sm">
          <div className="text-sm font-medium text-gray-500">
            Selamat datang di Panel Pengelolaan Sistem Akademik
          </div>

          {/* Profil User Login & Tombol Logout */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 border-r pr-4 border-gray-200">
              <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                {user?.email?.charAt(0).toUpperCase() || 'A'}
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-gray-800 leading-none">
                  {user?.email?.split('@')[0]}
                </p>
                <p className="text-xs text-gray-500 mt-1">{user?.email}</p>
              </div>
            </div>

            <form action={logout}>
              <button
                type="submit"
                className="bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all"
              >
                Logout 🚪
              </button>
            </form>
          </div>
        </header>

        {/* ISI HALAMAN DINAMIS */}
        <main className="flex-1 p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}