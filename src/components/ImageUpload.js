'use client'

import { useState, useRef } from 'react'

const ImageUpload = ({ 
  imageType = 'banner', 
  onImageUpload, 
  currentImage = '', 
  label = 'Featured Image (Optional)',
  description = 'Upload an image for your blog post - this is completely optional'
}) => {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [preview, setPreview] = useState(currentImage)
  const fileInputRef = useRef(null)

  const handleFileSelect = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    setError('')
    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('imageType', imageType)

      const response = await fetch('/api/upload/image', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        setPreview(data.url)
        onImageUpload(data.url)
        setError('')
      } else {
        setError(data.error || 'Upload failed')
      }
    } catch (error) {
      console.error('Upload error:', error)
      setError('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveImage = () => {
    setPreview('')
    onImageUpload('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const getImageSpecs = () => {
    const specs = {
      banner: { size: '1200×630px - 1600×900px', maxSize: '1MB', purpose: 'Blog hero or header section' },
      content: { size: '800×600px - 1024×768px', maxSize: '300KB', purpose: 'Images inside blog posts' },
      thumbnail: { size: '400×250px - 600×400px', maxSize: '100KB', purpose: 'Blog listing / grid view' },
      avatar: { size: '150×150px - 200×200px', maxSize: '100KB', purpose: 'Profile or sidebar' },
      background: { size: '1920×1080px', maxSize: '1MB', purpose: 'Full-width section background' }
    }
    return specs[imageType] || specs.banner
  }

  const specs = getImageSpecs()

  return (
    <div className="space-y-4" style={{ isolation: 'isolate' }}>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          {label}
        </label>
        <p className="text-sm text-slate-500 mb-3">{description}</p>
        
        {/* Image Specifications */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <h4 className="text-sm font-semibold text-blue-800 mb-2">Image Requirements</h4>
          <div className="text-sm text-blue-700 space-y-1">
            <p><strong>Size:</strong> {specs.size}</p>
            <p><strong>Max File Size:</strong> {specs.maxSize}</p>
            <p><strong>Purpose:</strong> {specs.purpose}</p>
            <p><strong>Formats:</strong> JPEG, PNG, WebP (WebP recommended)</p>
          </div>
        </div>

        {/* Upload Area */}
        <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-slate-400 transition-colors">
          {preview ? (
            <div className="space-y-4">
              <div className="relative inline-block">
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="max-w-full max-h-64 rounded-lg shadow-sm"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                >
                  ×
                </button>
              </div>
              <p className="text-sm text-slate-600">Image uploaded successfully!</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="mx-auto w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">No image selected</p>
                <p className="text-sm text-slate-500">Use the buttons below to upload or skip</p>
              </div>
            </div>
          )}
          
          {/* Hidden file input - only triggered by buttons */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileSelect}
            disabled={uploading}
            className="hidden"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 mt-4">
          {!preview && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="flex-1 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium border border-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? 'Uploading...' : 'Select Image'}
            </button>
          )}
          
          {!preview && (
            <button
              type="button"
              onClick={() => onImageUpload('')}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium border border-gray-200"
            >
              Skip Image
            </button>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex">
              <svg className="w-5 h-5 text-red-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-red-800">{error}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ImageUpload
