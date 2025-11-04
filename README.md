# Aarogya Insights - Healthcare Innovation Blog Platform

A modern healthcare blog platform built with Next.js, NextAuth, MongoDB, and Prisma. This platform allows admins to manage healthcare insights and stories while providing a beautiful public interface for readers.

## Features

- **Public Landing Page**: Displays healthcare insights and innovation stories
- **Admin Authentication**: Secure login system for administrators
- **Blog Management**: Create, edit, delete, and publish healthcare articles
- **Healthcare Theme**: Modern design focused on healthcare innovation
- **Responsive Design**: Works perfectly on all devices

## Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Authentication**: NextAuth.js with credentials provider
- **Database**: MongoDB with Prisma ORM
- **Styling**: Tailwind CSS with modern gradients and animations

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18+ 
- MongoDB (running on localhost:27017)
- npm or yarn

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="mongodb://localhost:27017/aaragya-insights"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-change-in-production"

# Admin credentials (you can change these)
ADMIN_EMAIL="admin@aaragya.com"
ADMIN_PASSWORD="admin123"
```

### 3. Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Push schema to MongoDB
npm run db:push

# Create admin user
npm run setup
```

### 4. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Usage

### Public Access
- **Landing Page** (`/`): View all published healthcare insights and stories
- **Featured Stories**: Highlights important healthcare innovations
- **Categories**: Filter by topics like AI, Telemedicine, Digital Health

### Admin Access
- **Login** (`/admin/login`): Access admin dashboard
  - Email: `admin@aaragya.com`
  - Password: `admin123`
- **Dashboard** (`/admin/dashboard`): Manage blogs
  - Create new healthcare articles
  - Edit existing content
  - Publish/unpublish articles
  - Feature important stories
  - Delete articles

## Project Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── login/page.js          # Admin login page
│   │   └── dashboard/page.js      # Admin dashboard
│   ├── api/
│   │   ├── auth/[...nextauth]/    # NextAuth configuration
│   │   └── blogs/                 # Blog API routes
│   ├── page.js                    # Public landing page
│   └── layout.js                  # Root layout
├── components/
│   ├── SessionProvider.js         # NextAuth session provider
│   └── slideshow.jsx             # Healthcare innovation slideshow
├── lib/
│   ├── auth.js                    # NextAuth configuration
│   └── db.js                      # Prisma database client
└── scripts/
    └── setup-admin.js             # Admin user creation script
```

## API Endpoints

### Public
- `GET /api/blogs` - Fetch all published blogs

### Admin (Protected)
- `POST /api/blogs` - Create new blog
- `PATCH /api/blogs/[id]` - Update blog
- `DELETE /api/blogs/[id]` - Delete blog

## Database Schema

### User Model
- Admin users with email/password authentication
- Role-based access control

### Blog Model
- Title, content, excerpt, featured image
- Publishing status and featured flag
- Tags and categories
- Author relationship
- View tracking

### Category Model
- Healthcare topic categorization
- Blog relationships

## Customization

### Adding New Categories
Update the category filters in the slideshow component and create categories in the database.

### Styling
The application uses Tailwind CSS. Modify the classes in components to change the appearance.

### Content
All healthcare content is managed through the admin dashboard. The slideshow displays healthcare innovation topics.

## Security Features

- Password hashing with bcryptjs
- Session-based authentication
- Protected admin routes
- Input validation and sanitization

## Deployment

1. Set up MongoDB Atlas or your preferred MongoDB hosting
2. Update environment variables for production
3. Deploy to Vercel, Netlify, or your preferred platform
4. Run database migrations and setup scripts

## Support

For issues or questions, please check the documentation or create an issue in the repository.

---

**Aarogya Insights** - Advancing healthcare through technology and innovation.