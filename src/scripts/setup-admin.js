const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function setupAdmin() {
  try {
    // Check if admin user already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'admin@aaragya.com' }
    })

    if (existingAdmin) {
      console.log('Admin user already exists with email:', existingAdmin.email)
      console.log('You can login with:')
      console.log('Email: admin@aaragya.com')
      console.log('Password: admin123')
      return
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 12)
    
    const admin = await prisma.user.create({
      data: {
        email: 'admin@aaragya.com',
        name: 'Admin',
        password: hashedPassword,
        role: 'admin'
      }
    })

    console.log('✅ Admin user created successfully!')
    console.log('📧 Email:', admin.email)
    console.log('🔑 Password: admin123')
    console.log('🌐 Login at: http://localhost:3000/admin/login')
  } catch (error) {
    console.error('❌ Error setting up admin user:', error.message)
    console.log('\n💡 Make sure MongoDB is running on localhost:27017')
    console.log('💡 You can start MongoDB with: brew services start mongodb/brew/mongodb-community')
  } finally {
    await prisma.$disconnect()
  }
}

setupAdmin()
