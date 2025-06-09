import ImageUploader from './components/ImageUploader'
import './index.css'

function App() {
  return (
   <>
  <div className="dark min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center py-12 px-6">
    <h1 className="text-4xl font-bold mb-1 select-none">Image Editor</h1>
    <ImageUploader />
  </div>
</>

  )
}

export default App
