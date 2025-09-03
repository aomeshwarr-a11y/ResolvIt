import { Link, NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Layout() {
  const { user, logout } = useAuth()
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white">
        <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
          <Link to="/" className="text-xl font-bold text-blue-600">ResolvIt</Link>
          <nav className="flex gap-4">
            <NavLink to="/" end className={({isActive})=>`hover:text-blue-600 ${isActive?'text-blue-600 font-medium':''}`}>Home</NavLink>
            <NavLink to="/submit" className={({isActive})=>`hover:text-blue-600 ${isActive?'text-blue-600 font-medium':''}`}>Submit Complaint</NavLink>
            <NavLink to="/track" className={({isActive})=>`hover:text-blue-600 ${isActive?'text-blue-600 font-medium':''}`}>Track Complaint</NavLink>
            {!user && (
              <NavLink to="/admin/login" className={({isActive})=>`hover:text-blue-600 ${isActive?'text-blue-600 font-medium':''}`}>Admin Login</NavLink>
            )}
            {user && (
              <>
                <NavLink to="/admin/dashboard" className={({isActive})=>`hover:text-blue-600 ${isActive?'text-blue-600 font-medium':''}`}>Dashboard</NavLink>
                <button onClick={logout} className="text-red-600 hover:text-red-700">Logout</button>
              </>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-1 bg-gray-50">
        <div className="max-w-6xl mx-auto p-4">
          <Outlet />
        </div>
      </main>
      <footer className="border-t bg-white">
        <div className="max-w-6xl mx-auto p-4 text-sm text-gray-600 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <p>© {new Date().getFullYear()} ResolvIt</p>
          <p>Contact: support@resolvit.app</p>
        </div>
      </footer>
    </div>
  )
}

