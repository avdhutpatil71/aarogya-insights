import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { MongoClient, ObjectId } from 'mongodb'

export async function GET(request, { params }) {
  let client;
  try {
    const { id } = await params

    client = new MongoClient(process.env.DATABASE_URL || 'mongodb://localhost:27017')
    await client.connect()
    const db = client.db('aaragya-insights')
    const blogs = db.collection('blogs')

    const blog = await blogs.findOne({ _id: new ObjectId(id) })

    if (!blog) {
      await client.close()
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
    }

    // Increment view count
    await blogs.updateOne(
      { _id: new ObjectId(id) },
      { $inc: { views: 1 } }
    )

    await client.close()

    return NextResponse.json({
      ...blog,
      id: blog._id.toString()
    })
  } catch (error) {
    console.error('Error fetching blog:', error)
    if (client) {
      await client.close()
    }
    return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 })
  }
}

export async function PATCH(request, { params }) {
  let client;
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()

    client = new MongoClient(process.env.DATABASE_URL || 'mongodb://localhost:27017')
    await client.connect()
    const db = client.db('aaragya-insights')
    const blogs = db.collection('blogs')

    // Check if blog exists and user has permission to edit it
    const existingBlog = await blogs.findOne({ _id: new ObjectId(id) })
    if (!existingBlog) {
      await client.close()
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
    }

    // Allow admin to edit any blog, or blogger to edit their own blog
    if (session.user.role !== 'admin' && existingBlog.authorId !== session.user.id) {
      await client.close()
      return NextResponse.json({ error: 'Unauthorized to edit this blog' }, { status: 403 })
    }

    const updateData = {
      ...body,
      updatedAt: new Date()
    }

    const result = await blogs.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    )

    if (result.matchedCount === 0) {
      await client.close()
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
    }

    const updatedBlog = await blogs.findOne({ _id: new ObjectId(id) })
    await client.close()

    return NextResponse.json({
      ...updatedBlog,
      id: updatedBlog._id.toString()
    })
  } catch (error) {
    console.error('Error updating blog:', error)
    if (client) {
      await client.close()
    }
    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  let client;
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    client = new MongoClient(process.env.DATABASE_URL || 'mongodb://localhost:27017')
    await client.connect()
    const db = client.db('aaragya-insights')
    const blogs = db.collection('blogs')

    // Check if blog exists and user has permission to delete it
    const existingBlog = await blogs.findOne({ _id: new ObjectId(id) })
    if (!existingBlog) {
      await client.close()
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
    }

    // Allow admin to delete any blog, or blogger to delete their own blog
    if (session.user.role !== 'admin' && existingBlog.authorId !== session.user.id) {
      await client.close()
      return NextResponse.json({ error: 'Unauthorized to delete this blog' }, { status: 403 })
    }

    const result = await blogs.deleteOne({ _id: new ObjectId(id) })
    await client.close()

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Blog deleted successfully' })
  } catch (error) {
    console.error('Error deleting blog:', error)
    if (client) {
      await client.close()
    }
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 })
  }
}
