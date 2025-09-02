import { useEffect, useMemo, useState } from 'react'
import api from '../services/api.js'

const statusOptions = ['Submitted','In Review','In Progress','Resolved']
const typeOptions = ['Academic','Workplace','Technical','Other']

export default function Dashboard() {
  const [items, setItems] = useState([])
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('')
  const [type, setType] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (q) params.set('q', q)
    if (status) params.set('status', status)
    if (type) params.set('type', type)
    const res = await api.get(`/complaints?${params.toString()}`)
    setItems(res.data)
    setLoading(false)
  }

  useEffect(()=>{ fetchData() }, [])

  const onApply = () => fetchData()

  const updateStatus = async (idOrTicket, newStatus) => {
    await api.put(`/complaints/${encodeURIComponent(idOrTicket)}`, { status: newStatus })
    fetchData()
  }

  const filtered = useMemo(()=> items, [items])

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Admin Dashboard</h2>
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:gap-3 mb-4">
        <div className="flex-1">
          <label className="block text-sm">Search</label>
          <input value={q} onChange={(e)=>setQ(e.target.value)} className="w-full border rounded p-2" placeholder="Ticket, name, email, description..." />
        </div>
        <div>
          <label className="block text-sm">Status</label>
          <select value={status} onChange={(e)=>setStatus(e.target.value)} className="w-full border rounded p-2">
            <option value="">All</option>
            {statusOptions.map(s=> <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm">Type</label>
          <select value={type} onChange={(e)=>setType(e.target.value)} className="w-full border rounded p-2">
            <option value="">All</option>
            {typeOptions.map(s=> <option key={s}>{s}</option>)}
          </select>
        </div>
        <button onClick={onApply} className="px-4 py-2 bg-blue-600 text-white rounded">Apply</button>
      </div>

      <div className="overflow-auto bg-white border rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2">Ticket</th>
              <th className="p-2">User</th>
              <th className="p-2">Email</th>
              <th className="p-2">Type</th>
              <th className="p-2">Status</th>
              <th className="p-2">Created</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td className="p-4" colSpan="7">Loading...</td></tr>
            )}
            {!loading && filtered.length === 0 && (
              <tr><td className="p-4" colSpan="7">No complaints</td></tr>
            )}
            {filtered.map(item => (
              <tr key={item._id} className="border-t">
                <td className="p-2 font-mono">{item.ticketId}</td>
                <td className="p-2">{item.userName}</td>
                <td className="p-2">{item.email}</td>
                <td className="p-2">{item.type}</td>
                <td className="p-2">
                  <span className="px-2 py-1 rounded bg-gray-100">{item.status}</span>
                </td>
                <td className="p-2">{new Date(item.createdAt).toLocaleString()}</td>
                <td className="p-2">
                  <div className="flex gap-2">
                    {statusOptions.map(s => (
                      <button key={s} className={`px-2 py-1 rounded text-xs border ${item.status===s?'bg-blue-600 text-white border-blue-600':'bg-white'}`} onClick={()=>updateStatus(item._id, s)}>{s}</button>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

