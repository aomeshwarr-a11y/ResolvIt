import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import api from '../services/api.js'
import { useState } from 'react'

const schema = z.object({
  userName: z.string().min(2),
  email: z.string().email(),
  type: z.enum(['Academic','Workplace','Technical','Other']),
  description: z.string().min(10),
  file: z.any().optional(),
})

export default function SubmitComplaint() {
  const [result, setResult] = useState(null)
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { type: 'Other' }
  })

  const onSubmit = async (data) => {
    const formData = new FormData()
    formData.append('userName', data.userName)
    formData.append('email', data.email)
    formData.append('type', data.type)
    formData.append('description', data.description)
    if (data.file?.[0]) formData.append('file', data.file[0])
    const res = await api.post('/complaints', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    setResult(res.data)
    reset()
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Submit Complaint</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input className="mt-1 w-full border rounded p-2" {...register('userName')} />
          {errors.userName && <p className="text-red-600 text-sm">{errors.userName.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input type="email" className="mt-1 w-full border rounded p-2" {...register('email')} />
          {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Type</label>
          <select className="mt-1 w-full border rounded p-2" {...register('type')}>
            <option>Academic</option>
            <option>Workplace</option>
            <option>Technical</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea rows={5} className="mt-1 w-full border rounded p-2" {...register('description')} />
          {errors.description && <p className="text-red-600 text-sm">{errors.description.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Attachment (optional)</label>
          <input type="file" accept="image/*,.pdf,.doc,.docx" className="mt-1 w-full" {...register('file')} />
        </div>
        <button disabled={isSubmitting} className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50">Submit</button>
      </form>

      {result && (
        <div className="mt-6 p-4 border rounded bg-white">
          <p className="font-medium">Complaint submitted successfully.</p>
          <p>Your ticket ID: <span className="font-mono">{result.ticketId}</span></p>
        </div>
      )}
    </div>
  )
}

