import { createClient } from '@/src/utils/supabase/server'
import { addPenelitianPkm } from '@/src/actions/pkm'

export default async function PkmPenelitianPage() {
  const supabase = await createClient()

  // Get data PKM/Penelitian sekaligus JOIN dengan data nama Dosen
  const { data: listPkm } = await supabase
    .from('pkm_penelitian')
    .select(`
      id,
      tipe,
      judul,
      tahun,
      dosen ( nama )
    `)
    .order('created_at', { ascending: false })

  const { data: listDosen } = await supabase.from('dosen').select('id, nama')

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Data Penelitian & PKM</h1>

      <form action={addPenelitianPkm} className="grid grid-cols-2 gap-4 bg-white p-4 shadow rounded">
        <select name="tipe" className="border p-2 rounded" required>
          <option value="PENELITIAN">Penelitian</option>
          <option value="PKM">PKM</option>
        </select>

        <select name="dosen_id" className="border p-2 rounded" required>
          <option value="">-- Pilih Dosen --</option>
          {listDosen?.map((d) => (
            <option key={d.id} value={d.id}>{d.nama}</option>
          ))}
        </select>

        <input name="judul" placeholder="Judul Kegiatan" required className="border p-2 rounded col-span-2" />
        <input name="tahun" type="number" placeholder="Tahun" defaultValue={2026} required className="border p-2 rounded col-span-2" />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded col-span-2">
          Simpan Data
        </button>
      </form>

      <table className="w-full border-collapse bg-white shadow rounded">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="p-3 text-left">Tipe</th>
            <th className="p-3 text-left">Judul</th>
            <th className="p-3 text-left">Dosen Utama</th>
            <th className="p-3 text-left">Tahun</th>
          </tr>
        </thead>
        <tbody>
          {listPkm?.map((item: any) => (
            <tr key={item.id} className="border-b">
              <td className="p-3">{item.tipe}</td>
              <td className="p-3">{item.judul}</td>
              <td className="p-3">{item.dosen?.nama ?? '-'}</td>
              <td className="p-3">{item.tahun}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}