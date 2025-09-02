import { useState } from 'react'
import api from '../services/api.js'

export default function TrackComplaint() {
  const [id, setId] = useState('')
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setData(null)
    if (!id) return
    try {
      const res = await api.get(`/complaints/${encodeURIComponent(id)}`)
      setData(res.data)
    } catch (err) {
      setError('Complaint not found')
    }
  }

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Track Complaint</h2>
      <form onSubmit={onSubmit} className="flex gap-2">
        <input value={id} onChange={(e)=>setId(e.target.value)} placeholder="Enter ticket ID" className="flex-1 border rounded p-2" />
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Search</button>
      </form>
      {error && <p className="text-red-600 mt-3">{error}</p>}
      {data && (
        <div className="mt-6 p-4 bg-white border rounded">
          <p><span className="font-medium">Ticket:</span> {data.ticketId}</p>
          <p><span className="font-medium">Name:</span> {data.userName}</p>
          <p><span className="font-medium">Email:</span> {data.email}</p>
          <p><span className="font-medium">Type:</span> {data.type}</p>
          <p><span className="font-medium">Status:</span> <span className="px-2 py-1 rounded bg-gray-100">{data.status}</span></p>
          <p className="mt-2 text-gray-700 whitespace-pre-wrap">{data.description}</p>
          {data.filePath && <a className="text-blue-600 mt-2 inline-block" href={data.filePath} target="_blank" rel="noreferrer">View Attachment</a>}
        </div>
      )}
    </div>
  )
}

