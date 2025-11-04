const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function createAdmin() {
  try {
    console.log('🔧 Setting up admin user...')
    
    // Create admin user directly
    const hashedPassword = await bcrypt.hash('admin123', 12)
    
    // Use upsert to avoid duplicate key errors
    const admin = await prisma.user.upsert({
      where: { email: 'admin@aaragya.com' },
      update: {},
      create: {
        email: 'admin@aaragya.com',
        name: 'Super Admin',
        password: hashedPassword,
        role: 'admin'
      }
    })

    console.log('✅ Admin user setup complete!')
    console.log('📧 Email: admin@aaragya.com')
    console.log('🔑 Password: admin123')
    console.log('🌐 Login URL: http://localhost:3000/admin/login')
    console.log('\n🚀 You can now login to the admin dashboard!')
    
  } catch (error) {
    console.error('❌ Error:', error.message)
    
    if (error.message.includes('MongoDB')) {
      console.log('\n💡 MongoDB is not running. Please start it first:')
      console.log('   brew services start mongodb-community')
      console.log('   OR')
      console.log('   mongod --dbpath ~/data/db')
    }
  } finally {
    await prisma.$disconnect()
  }
}

createAdmin()
