import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { uploadToCloudinary } from '@/lib/cloudinary'

// Image validation specifications
const IMAGE_SPECS = {
  // Full-width banner / featured image
  banner: {
    minWidth: 1200,
    maxWidth: 1600,
    minHeight: 630,
    maxHeight: 900,
    maxSize: 1024 * 1024, // 1MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp']
  },
  // In-content image
  content: {
    minWidth: 800,
    maxWidth: 1024,
    minHeight: 600,
    maxHeight: 768,
    maxSize: 300 * 1024, // 300KB
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp']
  },
  // Thumbnail / card preview
  thumbnail: {
    minWidth: 400,
    maxWidth: 600,
    minHeight: 250,
    maxHeight: 400,
    maxSize: 100 * 1024, // 100KB
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp']
  },
  // Author photo / small logo
  avatar: {
    minWidth: 150,
    maxWidth: 200,
    minHeight: 150,
    maxHeight: 200,
    maxSize: 100 * 1024, // 100KB
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp']
  },
  // Background image
  background: {
    minWidth: 1920,
    maxWidth: 1920,
    minHeight: 1080,
    maxHeight: 1080,
    maxSize: 1024 * 1024, // 1MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp']
  }
}

// Helper function to get image dimensions
async function getImageDimensions(buffer) {
  return new Promise((resolve, reject) => {
    const sharp = require('sharp')
    sharp(buffer)
      .metadata()
      .then(metadata => {
        resolve({
          width: metadata.width,
          height: metadata.height
        })
      })
      .catch(reject)
  })
}

// Helper function to validate image
function validateImage(buffer, mimeType, imageType) {
  const specs = IMAGE_SPECS[imageType]
  if (!specs) {
    return { valid: false, error: 'Invalid image type specified' }
  }

  // Check file size
  if (buffer.length > specs.maxSize) {
    const maxSizeMB = (specs.maxSize / (1024 * 1024)).toFixed(1)
    return { 
      valid: false, 
      error: `File size too large. Maximum allowed: ${maxSizeMB}MB` 
    }
  }

  // Check MIME type
  if (!specs.allowedTypes.includes(mimeType)) {
    return { 
      valid: false, 
      error: `Invalid file type. Allowed: ${specs.allowedTypes.join(', ')}` 
    }
  }

  return { valid: true }
}

// Helper function to validate dimensions
function validateDimensions(width, height, imageType) {
  const specs = IMAGE_SPECS[imageType]
  
  if (width < specs.minWidth || width > specs.maxWidth) {
    return { 
      valid: false, 
      error: `Width must be between ${specs.minWidth}px and ${specs.maxWidth}px` 
    }
  }

  if (height < specs.minHeight || height > specs.maxHeight) {
    return { 
      valid: false, 
      error: `Height must be between ${specs.minHeight}px and ${specs.maxHeight}px` 
    }
  }

  return { valid: true }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file')
    const imageType = formData.get('imageType') || 'banner'

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // Convert file to buffer for validation
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Validate image
    const validation = validateImage(buffer, file.type, imageType)
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 })
    }

    // Get image dimensions
    const dimensions = await getImageDimensions(buffer)
    
    // Validate dimensions
    const dimensionValidation = validateDimensions(dimensions.width, dimensions.height, imageType)
    if (!dimensionValidation.valid) {
      return NextResponse.json({ error: dimensionValidation.error }, { status: 400 })
    }

    // Upload to Cloudinary
    const cloudinaryResult = await uploadToCloudinary(file, imageType)

    // Return success response
    return NextResponse.json({
      success: true,
      filename: cloudinaryResult.public_id,
      url: cloudinaryResult.url,
      public_id: cloudinaryResult.public_id,
      dimensions: {
        width: cloudinaryResult.width,
        height: cloudinaryResult.height
      },
      size: cloudinaryResult.bytes,
      type: file.type,
      format: cloudinaryResult.format,
      created_at: cloudinaryResult.created_at
    })

  } catch (error) {
    console.error('Error uploading image:', error)
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 })
  }
}

// GET endpoint to retrieve image specifications
export async function GET() {
  return NextResponse.json({
    specifications: IMAGE_SPECS,
    formats: {
      jpeg: 'Best balance of quality + compression',
      png: 'Logos, transparent backgrounds (larger file size)',
      webp: 'Smallest size, best quality (recommended)',
      svg: 'Icons, vector logos (infinitely scalable)'
    }
  })
}
