import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { MongoClient, ObjectId } from 'mongodb'

export async function GET() {
  let client;
  try {
    client = new MongoClient(process.env.DATABASE_URL || 'mongodb://localhost:27017')
    await client.connect()
    const db = client.db('aaragya-insights')
    const blogs = db.collection('blogs')
    const users = db.collection('users')

    const allBlogs = await blogs.find({ published: true }).sort({ createdAt: -1 }).toArray()
    
    // Get author info for each blog
    const blogsWithAuthors = await Promise.all(
      allBlogs.map(async (blog) => {
        const author = await users.findOne({ _id: new ObjectId(blog.authorId) })
        return {
          ...blog,
          id: blog._id.toString(),
          author: {
            name: author?.name || 'Admin',
            email: author?.email || 'admin@aaragya.com'
          }
        }
      })
    )

    return NextResponse.json(blogsWithAuthors)
  } catch (error) {
    console.error('Error fetching blogs:', error)
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 })
  } finally {
    if (client) {
      await client.close()
    }
  }
}

export async function POST(request) {
  let client;
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { title, content, excerpt, featuredImage, published, featured, categoryId, tags } = body

    // Validation
    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 })
    }

    // Create slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')

    client = new MongoClient(process.env.DATABASE_URL || 'mongodb://localhost:27017')
    await client.connect()
    const db = client.db('aaragya-insights')
    const blogs = db.collection('blogs')

    const blog = {
      _id: new ObjectId(),
      title,
      slug,
      content,
      excerpt: excerpt || '',
      featuredImage: featuredImage || '',
      published: published || false,
      featured: featured || false,
      categoryId: categoryId || null,
      tags: tags || [],
      authorId: session.user.id,
      views: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    await blogs.insertOne(blog)

    // Return blog with string ID
    const blogResponse = {
      ...blog,
      id: blog._id.toString()
    }

    return NextResponse.json(blogResponse, { status: 201 })
  } catch (error) {
    console.error('Error creating blog:', error)
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 })
  } finally {
    if (client) {
      await client.close()
    }
  }
}
