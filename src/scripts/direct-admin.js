const { MongoClient, ObjectId } = require('mongodb')
const bcrypt = require('bcryptjs')

async function createAdminDirectly() {
  const client = new MongoClient('mongodb://localhost:27017')
  
  try {
    await client.connect()
    console.log('🔗 Connected to MongoDB')
    
    const db = client.db('aaragya-insights')
    const users = db.collection('users')
    
    // Check if admin already exists
    const existingAdmin = await users.findOne({ email: 'admin@aaragya.com' })
    
    if (existingAdmin) {
      console.log('✅ Admin user already exists!')
      console.log('📧 Email: admin@aaragya.com')
      console.log('🔑 Password: admin123')
      console.log('🌐 Login at: http://localhost:3000/admin/login')
      return
    }
    
    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 12)
    
    const adminUser = {
      _id: new ObjectId(),
      email: 'admin@aaragya.com',
      name: 'Super Admin',
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    await users.insertOne(adminUser)
    
    console.log('✅ Admin user created successfully!')
    console.log('📧 Email: admin@aaragya.com')
    console.log('🔑 Password: admin123')
    console.log('🌐 Login URL: http://localhost:3000/admin/login')
    console.log('\n🚀 You can now login to the admin dashboard!')
    
  } catch (error) {
    console.error('❌ Error:', error.message)
    console.log('\n💡 Make sure MongoDB is running on localhost:27017')
  } finally {
    await client.close()
  }
}

createAdminDirectly()
