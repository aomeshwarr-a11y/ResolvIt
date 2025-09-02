import { useForm } from 'react-hook-form'
import api from '../services/api.js'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function AdminLogin() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm()
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const onSubmit = async (data) => {
    setError('')
    try {
      await api.post('/auth/login', data)
      navigate('/admin/dashboard')
    } catch (err) {
      setError('Invalid credentials')
    }
  }

  return (
    <div className="max-w-sm mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Admin Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input className="mt-1 w-full border rounded p-2" type="email" {...register('email', { required: true })} />
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input className="mt-1 w-full border rounded p-2" type="password" {...register('password', { required: true })} />
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button disabled={isSubmitting} className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50">Login</button>
      </form>
    </div>
  )
}

