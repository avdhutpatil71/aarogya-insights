const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function createBlogger() {
  try {
    console.log('🔧 Creating blogger user...')
    
    // Check if blogger exists first
    try {
      const existingBlogger = await prisma.user.findUnique({
        where: { email: 'blogger@aaragya.com' }
      })
      
      if (existingBlogger) {
        console.log('✅ Blogger user already exists!')
        console.log('📧 Email: blogger@aaragya.com')
        console.log('🔑 Password: blogger123')
        console.log('🌐 Login at: http://localhost:3000/blogger/login')
        return
      }
    } catch (checkError) {
      console.log('⚠️  Could not check existing blogger, proceeding with creation...')
    }
    
    // Create blogger user
    const hashedPassword = await bcrypt.hash('blogger123', 12)
    
    const blogger = await prisma.user.create({
      data: {
        email: 'blogger@aaragya.com',
        name: 'Test Blogger',
        password: hashedPassword,
        role: 'blogger'
      }
    })

    console.log('✅ Blogger user created successfully!')
    console.log('📧 Email: blogger@aaragya.com')
    console.log('🔑 Password: blogger123')
    console.log('🌐 Login URL: http://localhost:3000/blogger/login')
    console.log('\n🚀 You can now login to the blogger dashboard!')
    
  } catch (error) {
    console.error('❌ Error:', error.message)
    
    if (error.code === 'P2002') {
      console.log('✅ Blogger user already exists!')
      console.log('📧 Email: blogger@aaragya.com')
      console.log('🔑 Password: blogger123')
      console.log('🌐 Login at: http://localhost:3000/blogger/login')
    } else {
      console.log('\n💡 Make sure MongoDB is running on localhost:27017')
      console.log('💡 Try: brew services start mongodb-community')
    }
  } finally {
    await prisma.$disconnect()
  }
}

createBlogger()
