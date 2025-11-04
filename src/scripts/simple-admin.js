const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function createSimpleAdmin() {
  try {
    console.log('🔧 Creating admin user...')
    
    // Check if admin exists first
    try {
      const existingAdmin = await prisma.user.findUnique({
        where: { email: 'admin@aaragya.com' }
      })
      
      if (existingAdmin) {
        console.log('✅ Admin user already exists!')
        console.log('📧 Email: admin@aaragya.com')
        console.log('🔑 Password: admin123')
        console.log('🌐 Login at: http://localhost:3000/admin/login')
        return
      }
    } catch (checkError) {
      console.log('⚠️  Could not check existing admin, proceeding with creation...')
    }
    
    // Create admin user without upsert (no transaction needed)
    const hashedPassword = await bcrypt.hash('admin123', 12)
    
    const admin = await prisma.user.create({
      data: {
        email: 'admin@aaragya.com',
        name: 'Super Admin',
        password: hashedPassword,
        role: 'admin'
      }
    })

    console.log('✅ Admin user created successfully!')
    console.log('📧 Email: admin@aaragya.com')
    console.log('🔑 Password: admin123')
    console.log('🌐 Login URL: http://localhost:3000/admin/login')
    console.log('\n🚀 You can now login to the admin dashboard!')
    
  } catch (error) {
    console.error('❌ Error:', error.message)
    
    if (error.code === 'P2002') {
      console.log('✅ Admin user already exists!')
      console.log('📧 Email: admin@aaragya.com')
      console.log('🔑 Password: admin123')
      console.log('🌐 Login at: http://localhost:3000/admin/login')
    } else {
      console.log('\n💡 Make sure MongoDB is running on localhost:27017')
      console.log('💡 Try: brew services start mongodb-community')
    }
  } finally {
    await prisma.$disconnect()
  }
}

createSimpleAdmin()
