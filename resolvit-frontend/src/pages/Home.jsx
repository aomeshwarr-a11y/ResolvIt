export default function Home() {
  return (
    <section className="text-center py-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome to ResolvIt</h1>
      <p className="text-gray-600 max-w-2xl mx-auto">Submit complaints, track their status, and get resolutions efficiently. Admins and staff can manage the workflow end-to-end.</p>
      <div className="mt-6 flex gap-3 justify-center">
        <a href="/submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Submit Complaint</a>
        <a href="/track" className="px-4 py-2 bg-gray-200 text-gray-900 rounded hover:bg-gray-300">Track Complaint</a>
      </div>
    </section>
  )
}

