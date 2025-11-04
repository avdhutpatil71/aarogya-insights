import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary using URL format
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dmxscqnbe',
  api_key: process.env.CLOUDINARY_API_KEY || '164925463685192',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'O7riVeonNRb1ZtHCzJsdG41IMTM',
})

// Alternative: Configure using CLOUDINARY_URL if available
if (process.env.CLOUDINARY_URL) {
  cloudinary.config({
    cloud_name: 'dmxscqnbe',
    api_key: '164925463685192',
    api_secret: 'O7riVeonNRb1ZtHCzJsdG41IMTM',
  })
}

export default cloudinary

// Helper function to upload image to Cloudinary
export async function uploadToCloudinary(file, imageType = 'banner') {
  try {
    // Convert file to base64
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64String = buffer.toString('base64')
    const dataURI = `data:${file.type};base64,${base64String}`

    // Upload options based on image type
    const uploadOptions = {
      folder: `aaragya-insights/${imageType}`,
      resource_type: 'auto',
      quality: 'auto',
      fetch_format: 'auto',
    }

    // Add specific transformations based on image type
    switch (imageType) {
      case 'banner':
        uploadOptions.transformation = [
          { width: 1600, height: 900, crop: 'fill', quality: 'auto' },
          { fetch_format: 'auto' }
        ]
        break
      case 'content':
        uploadOptions.transformation = [
          { width: 1024, height: 768, crop: 'fill', quality: 'auto' },
          { fetch_format: 'auto' }
        ]
        break
      case 'thumbnail':
        uploadOptions.transformation = [
          { width: 600, height: 400, crop: 'fill', quality: 'auto' },
          { fetch_format: 'auto' }
        ]
        break
      case 'avatar':
        uploadOptions.transformation = [
          { width: 200, height: 200, crop: 'fill', quality: 'auto' },
          { fetch_format: 'auto' }
        ]
        break
      case 'background':
        uploadOptions.transformation = [
          { width: 1920, height: 1080, crop: 'fill', quality: 'auto' },
          { fetch_format: 'auto' }
        ]
        break
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, uploadOptions)

    return {
      success: true,
      public_id: result.public_id,
      url: result.secure_url,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
      created_at: result.created_at
    }

  } catch (error) {
    console.error('Cloudinary upload error:', error)
    throw new Error('Failed to upload image to Cloudinary')
  }
}

// Helper function to delete image from Cloudinary
export async function deleteFromCloudinary(publicId) {
  try {
    const result = await cloudinary.uploader.destroy(publicId)
    return result
  } catch (error) {
    console.error('Cloudinary delete error:', error)
    throw new Error('Failed to delete image from Cloudinary')
  }
}

// Helper function to get optimized image URL
export function getOptimizedImageUrl(publicId, options = {}) {
  const defaultOptions = {
    quality: 'auto',
    fetch_format: 'auto',
    ...options
  }
  
  return cloudinary.url(publicId, defaultOptions)
}
