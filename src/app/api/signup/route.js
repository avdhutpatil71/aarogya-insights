import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/db'

export async function POST(request) {
  try {
    const { name, email, password, role = 'admin' } = await request.json()

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }
    
    // Validate DATABASE_URL is set
    if (!process.env.DATABASE_URL) {
      console.error('DATABASE_URL is not set in environment variables')
      return NextResponse.json({ 
        error: 'Server configuration error. Please contact administrator.',
        details: process.env.NODE_ENV === 'development' ? 'DATABASE_URL is not set' : undefined
      }, { status: 500 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 })
    }

        // Check if user already exists
    let existingUser
    try {
      existingUser = await prisma.user.findUnique({
        where: { email }
      })
    } catch (dbError) {
      console.error('Database query error (findUnique):', dbError)
      throw dbError // Re-throw to be caught by outer catch
    }
    
    if (existingUser) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    let newUser
    try {
      newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role
        }
      })
    } catch (dbError) {
      console.error('Database query error (create):', dbError)
      throw dbError // Re-throw to be caught by outer catch
    }

    // Return success (don't return password)
    const { password: _, ...userWithoutPassword } = newUser
    
    return NextResponse.json({ 
      message: `${role === 'admin' ? 'Admin' : 'Blogger'} account created successfully`,
      user: userWithoutPassword 
    }, { status: 201 })

    } catch (error) {
    console.error('Signup error:', error)
    console.error('Error code:', error.code)
    console.error('Error message:', error.message)
    console.error('Error meta:', error.meta)
    
    // Provide more specific error messages
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 })
    }
    
    // Handle Prisma connection errors
    if (error.code === 'P2010' || error.code === 'P1001' || error.message?.includes('connect') || error.message?.includes('connection')) {
      return NextResponse.json({ 
        error: 'Database connection failed. Please check your database connection and try again.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      }, { status: 500 })
    }
    
    // Handle validation errors
    if (error.code === 'P2003') {
      return NextResponse.json({ 
        error: 'Invalid data provided. Please check your input.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      }, { status: 400 })
    }
    
    return NextResponse.json({ 
      error: error.message || 'Failed to create account', 
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 })
  }
}
