# Cloudinary Integration Setup

## Overview
The image upload system has been updated to use Cloudinary for better performance, optimization, and CDN delivery.

## Setup Instructions

### 1. Create Cloudinary Account
1. Go to [Cloudinary](https://cloudinary.com) and create a free account
2. After signing up, you'll be taken to your dashboard

### 2. Get Your Credentials
From your Cloudinary dashboard, you'll need:
- **Cloud Name**: Found in the dashboard overview
- **API Key**: Found in the dashboard overview  
- **API Secret**: Found in the dashboard overview

### 3. Add Environment Variables
Create a `.env.local` file in the root directory and add:

```env
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

### 4. Features Included

#### Automatic Image Optimization
- **Format Optimization**: Automatically serves WebP/AVIF when supported
- **Quality Optimization**: Automatic quality adjustment for optimal file size
- **Responsive Images**: Automatic resizing based on image type

#### Image Type Transformations
- **Banner Images**: Optimized to 1600×900px
- **Content Images**: Optimized to 1024×768px  
- **Thumbnails**: Optimized to 600×400px
- **Avatars**: Optimized to 200×200px
- **Backgrounds**: Optimized to 1920×1080px

#### Folder Organization
Images are automatically organized in Cloudinary folders:
```
aaragya-insights/
├── banner/
├── content/
├── thumbnail/
├── avatar/
└── background/
```

### 5. Benefits

#### Performance
- **CDN Delivery**: Images served from Cloudinary's global CDN
- **Automatic Compression**: Reduces file sizes by 20-80%
- **Lazy Loading**: Built-in lazy loading support
- **Progressive Loading**: Images load progressively for better UX

#### Reliability
- **99.9% Uptime**: Enterprise-grade reliability
- **Automatic Backup**: Images are automatically backed up
- **Version Control**: Automatic versioning of uploaded images

#### Security
- **Secure URLs**: All images served over HTTPS
- **Access Control**: Fine-grained access control options
- **Watermarking**: Easy to add watermarks if needed

### 6. Usage

The ImageUpload component works exactly the same as before - no changes needed in your existing code. The only difference is that images are now stored in Cloudinary instead of local storage.

### 7. Migration

If you have existing images in `/public/uploads/images/`, you can:
1. Upload them manually to Cloudinary
2. Update your database URLs to point to Cloudinary URLs
3. Or keep them as-is (they'll continue to work)

### 8. Free Tier Limits

Cloudinary's free tier includes:
- 25 GB storage
- 25 GB bandwidth per month
- 25,000 transformations per month

This is more than sufficient for most blog websites.

## Support

If you need help with Cloudinary setup, refer to their [documentation](https://cloudinary.com/documentation) or contact their support team.
