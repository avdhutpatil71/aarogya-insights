# Image Upload System Documentation

## Overview
The blog website now includes a comprehensive image upload system that enforces specific size, format, and quality requirements based on your specifications.

## Image Types and Specifications

### 1. Banner/Featured Images (`banner`)
- **Size**: 1200×630px - 1600×900px
- **Max File Size**: 1MB
- **Purpose**: Blog hero or header section
- **Formats**: JPEG, PNG, WebP

### 2. Content Images (`content`)
- **Size**: 800×600px - 1024×768px
- **Max File Size**: 300KB
- **Purpose**: Images inside blog posts
- **Formats**: JPEG, PNG, WebP

### 3. Thumbnail Images (`thumbnail`)
- **Size**: 400×250px - 600×400px
- **Max File Size**: 100KB
- **Purpose**: Blog listing / grid view
- **Formats**: JPEG, PNG, WebP

### 4. Avatar Images (`avatar`)
- **Size**: 150×150px - 200×200px
- **Max File Size**: 100KB
- **Purpose**: Profile or sidebar
- **Formats**: JPEG, PNG, WebP

### 5. Background Images (`background`)
- **Size**: 1920×1080px (exact)
- **Max File Size**: 1MB
- **Purpose**: Full-width section background
- **Formats**: JPEG, PNG, WebP

## File Format Recommendations

| Format | Best Use | Notes |
|--------|----------|-------|
| **JPEG (.jpg)** | Blog post photos | Best balance of quality + compression |
| **PNG (.png)** | Logos, transparent backgrounds | Larger file size |
| **WebP (.webp)** ✅ | Any image | Smallest size, best quality (recommended) |
| **SVG (.svg)** | Icons, vector logos | Infinitely scalable |

## Implementation Details

### API Endpoint
- **URL**: `/api/upload/image`
- **Method**: POST
- **Authentication**: Required (admin or blogger)
- **Content-Type**: multipart/form-data

### Request Parameters
- `file`: The image file to upload
- `imageType`: Type of image (`banner`, `content`, `thumbnail`, `avatar`, `background`)

### Response Format
```json
{
  "success": true,
  "filename": "banner_1234567890_abc123.jpg",
  "url": "/uploads/images/banner_1234567890_abc123.jpg",
  "dimensions": {
    "width": 1200,
    "height": 630
  },
  "size": 245760,
  "type": "image/jpeg"
}
```

### Error Response Format
```json
{
  "error": "File size too large. Maximum allowed: 1.0MB"
}
```

## Client-Side Component

### ImageUpload Component
Located at `/src/components/ImageUpload.js`

#### Props
- `imageType`: Type of image (default: 'banner')
- `onImageUpload`: Callback function when image is uploaded
- `currentImage`: Current image URL
- `label`: Label for the upload field
- `description`: Description text

#### Features
- Drag and drop support
- File validation before upload
- Image preview
- Error handling
- Alternative URL input
- Real-time validation feedback

## File Storage

### Directory Structure
```
public/
└── uploads/
    └── images/
        ├── .gitkeep
        ├── banner_*.jpg
        ├── content_*.png
        └── ...
```

### File Naming Convention
- Format: `{imageType}_{timestamp}_{randomString}.{extension}`
- Example: `banner_1703123456789_abc123def.jpg`

## Security Features

1. **Authentication**: Only authenticated users can upload images
2. **File Type Validation**: Only allowed image formats are accepted
3. **Size Validation**: File size limits are enforced
4. **Dimension Validation**: Image dimensions are checked
5. **Unique Filenames**: Prevents conflicts and overwrites

## Usage Examples

### In Blogger Dashboard
```jsx
<ImageUpload
  imageType="banner"
  onImageUpload={(url) => setNewBlog({...newBlog, featuredImage: url})}
  currentImage={newBlog.featuredImage}
  label="Featured Image"
  description="Upload a banner image for your blog post"
/>
```

### In Admin Dashboard
```jsx
<ImageUpload
  imageType="banner"
  onImageUpload={(url) => setEditBlog({...editBlog, featuredImage: url})}
  currentImage={editBlog.featuredImage}
  label="Featured Image"
  description="Upload a banner image for your blog post"
/>
```

## Validation Rules

### Server-Side Validation
1. Check file size against limits
2. Validate MIME type
3. Check image dimensions using Sharp library
4. Generate unique filename
5. Save to filesystem

### Client-Side Validation
1. File type checking
2. File size preview
3. Image preview
4. Error display

## Error Messages

Common error messages users might encounter:

- "File size too large. Maximum allowed: 1.0MB"
- "Invalid file type. Allowed: image/jpeg, image/png, image/webp"
- "Width must be between 1200px and 1600px"
- "Height must be between 630px and 900px"
- "No file uploaded"
- "Upload failed"

## Dependencies

- **Sharp**: Image processing library for dimension validation
- **Next.js**: File upload handling
- **React**: Component state management

## Future Enhancements

1. **Image Optimization**: Automatic compression and resizing
2. **Multiple Upload**: Support for multiple images at once
3. **Image Gallery**: Browse and select from previously uploaded images
4. **CDN Integration**: Upload to cloud storage services
5. **Image Editing**: Basic crop/resize functionality in the browser

## Troubleshooting

### Common Issues

1. **Sharp Installation**: Ensure Sharp is properly installed
   ```bash
   npm install sharp
   ```

2. **Directory Permissions**: Ensure uploads directory is writable
   ```bash
   chmod 755 public/uploads/images
   ```

3. **File Size Limits**: Check Next.js body size limits in `next.config.js`

4. **CORS Issues**: Ensure proper CORS configuration for file uploads

### Debug Mode
Enable debug logging by setting `NODE_ENV=development` to see detailed error messages in the console.
