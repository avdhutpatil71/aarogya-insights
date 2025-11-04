import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { MongoClient, ObjectId } from 'mongodb'

const client = new MongoClient(process.env.DATABASE_URL || 'mongodb://localhost:27017')

export async function GET() {
  let client;
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    client = new MongoClient(process.env.DATABASE_URL || 'mongodb://localhost:27017')
    await client.connect()
    const db = client.db('aaragya-insights')
    const blogs = db.collection('blogs')
    const users = db.collection('users')

    // Get all blogs (including drafts) for admin
    const allBlogs = await blogs.find({}).sort({ createdAt: -1 }).toArray()
    
    // Get author info for each blog
    const blogsWithAuthors = await Promise.all(
      allBlogs.map(async (blog) => {
        const author = await users.findOne({ _id: new ObjectId(blog.authorId) })
        return {
          ...blog,
          id: blog._id.toString(),
          author: {
            name: author?.name || 'Admin',
            email: author?.email || 'admin@aaragya.com',
            role: author?.role || 'Admin'
          }
        }
      })
    )

    return NextResponse.json(blogsWithAuthors)
  } catch (error) {
    console.error('Error fetching admin blogs:', error)
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 })
  } finally {
    if (client) {
      await client.close()
    }
  }
}
