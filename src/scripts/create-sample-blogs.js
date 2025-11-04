const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function createSampleBlogs() {
  try {
    console.log('🔧 Creating sample blogs...')
    
    // Get the admin user
    const admin = await prisma.user.findUnique({
      where: { email: 'admin@aaragya.com' }
    })
    
    if (!admin) {
      console.log('❌ Admin user not found. Please run the admin creation script first.')
      return
    }
    
    // Sample blogs data
    const sampleBlogs = [
      {
        title: "The Future of Healthcare Technology",
        slug: "future-healthcare-technology",
        content: "Healthcare technology is rapidly evolving, bringing revolutionary changes to how we approach medical care. From AI-powered diagnostics to telemedicine platforms, the future of healthcare is being shaped by innovative technologies that promise to make medical services more accessible, efficient, and personalized than ever before.",
        excerpt: "Exploring the revolutionary changes in healthcare technology and how AI, telemedicine, and digital health platforms are transforming medical care.",
        featuredImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        published: true,
        featured: true,
        authorId: admin.id,
        tags: ["healthcare", "technology", "AI", "innovation"],
        views: 1250
      },
      {
        title: "Digital Health Revolution: Transforming Patient Care",
        slug: "digital-health-revolution",
        content: "The digital health revolution is transforming patient care through innovative technologies like wearable devices, mobile health apps, and remote monitoring systems. These tools enable continuous health tracking, early disease detection, and personalized treatment plans that improve patient outcomes and reduce healthcare costs.",
        excerpt: "How digital health technologies are revolutionizing patient care through wearable devices, mobile apps, and remote monitoring systems.",
        featuredImage: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        published: true,
        featured: true,
        authorId: admin.id,
        tags: ["digital health", "patient care", "wearables", "mobile health"],
        views: 980
      },
      {
        title: "AI in Medical Diagnosis: A Game Changer",
        slug: "ai-medical-diagnosis",
        content: "Artificial Intelligence is revolutionizing medical diagnosis by providing faster, more accurate, and cost-effective solutions. Machine learning algorithms can analyze medical images, detect patterns in patient data, and assist healthcare professionals in making informed decisions. This technology is particularly valuable in radiology, pathology, and early disease detection.",
        excerpt: "How AI is transforming medical diagnosis with faster, more accurate, and cost-effective solutions for healthcare professionals.",
        featuredImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        published: true,
        featured: true,
        authorId: admin.id,
        tags: ["AI", "medical diagnosis", "machine learning", "radiology"],
        views: 1450
      },
      {
        title: "Telemedicine: Bridging the Healthcare Gap",
        slug: "telemedicine-bridging-gap",
        content: "Telemedicine has emerged as a crucial tool for bridging healthcare gaps, especially in remote and underserved areas. Through video consultations, remote monitoring, and digital health platforms, patients can access quality healthcare services without geographical barriers. This technology has become even more important during the COVID-19 pandemic.",
        excerpt: "How telemedicine is bridging healthcare gaps and providing access to quality medical care in remote and underserved areas.",
        featuredImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        published: true,
        featured: false,
        authorId: admin.id,
        tags: ["telemedicine", "remote care", "healthcare access", "COVID-19"],
        views: 750
      },
      {
        title: "Robotic Surgery: Precision in Medical Procedures",
        slug: "robotic-surgery-precision",
        content: "Robotic surgery represents the pinnacle of precision in medical procedures, offering enhanced accuracy, reduced invasiveness, and faster recovery times. Advanced robotic systems allow surgeons to perform complex operations with unprecedented precision, leading to better patient outcomes and shorter hospital stays.",
        excerpt: "Exploring how robotic surgery is revolutionizing medical procedures with enhanced precision, reduced invasiveness, and faster recovery.",
        featuredImage: "https://images.unsplash.com/photo-1584433144859-1fc3ab64a957?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        published: true,
        featured: false,
        authorId: admin.id,
        tags: ["robotic surgery", "precision medicine", "minimally invasive", "recovery"],
        views: 890
      }
    ]
    
    // Create blogs
    for (const blogData of sampleBlogs) {
      try {
        const blog = await prisma.blog.create({
          data: blogData
        })
        console.log(`✅ Created blog: ${blog.title}`)
      } catch (error) {
        if (error.code === 'P2002') {
          console.log(`⚠️  Blog already exists: ${blogData.title}`)
        } else {
          console.log(`❌ Error creating blog "${blogData.title}":`, error.message)
        }
      }
    }
    
    console.log('\n🎉 Sample blogs created successfully!')
    console.log('📊 Featured blogs: 3')
    console.log('📊 Regular blogs: 2')
    console.log('🌐 Check your homepage slideshow now!')
    
  } catch (error) {
    console.error('❌ Error:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

createSampleBlogs()
