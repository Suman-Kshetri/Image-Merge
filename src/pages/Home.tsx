
import { NavLink } from 'react-router-dom'

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Welcome to the Imager</h1>

      <div className="flex space-x-6">
        {/* Card for Image Merger */}
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Image Merger</h2>
          <NavLink
            to="/merge-image"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go to Image Merger
          </NavLink>
        </div>

        {/* Card for QR Code Generator */}
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">QR Code Generator</h2>
          <NavLink
            to="/qr-generator"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Go to QR Generator
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default Home

