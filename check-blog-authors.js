// Script to check blog posts by author
// Run this with: node check-blog-authors.js

const { MongoClient, ObjectId } = require('mongodb');

async function checkBlogAuthors() {
  let client;
  try {
    client = new MongoClient(process.env.DATABASE_URL || 'mongodb://localhost:27017');
    await client.connect();
    const db = client.db('aaragya-insights');
    const blogs = db.collection('blogs');
    const users = db.collection('users');

    console.log('📊 Blog Posts Analysis');
    console.log('====================\n');

    // Get all blogs
    const allBlogs = await blogs.find({}).sort({ createdAt: -1 }).toArray();
    
    // Get all users
    const allUsers = await users.find({}).toArray();
    const userMap = new Map(allUsers.map(user => [user._id.toString(), user]));

    console.log(`Total Blog Posts: ${allBlogs.length}\n`);

    // Group by author role
    const adminBlogs = [];
    const bloggerBlogs = [];
    const unknownBlogs = [];

    for (const blog of allBlogs) {
      const author = userMap.get(blog.authorId);
      if (author) {
        if (author.role === 'admin') {
          adminBlogs.push({ ...blog, author });
        } else if (author.role === 'blogger') {
          bloggerBlogs.push({ ...blog, author });
        } else {
          unknownBlogs.push({ ...blog, author });
        }
      } else {
        unknownBlogs.push({ ...blog, author: null });
      }
    }

    // Display results
    console.log('👨‍💼 ADMIN BLOG POSTS:');
    console.log('====================');
    if (adminBlogs.length === 0) {
      console.log('No admin blog posts found.\n');
    } else {
      adminBlogs.forEach((blog, index) => {
        console.log(`${index + 1}. "${blog.title}"`);
        console.log(`   Author: ${blog.author.name || blog.author.email} (${blog.author.role})`);
        console.log(`   Status: ${blog.published ? 'Published' : 'Draft'}`);
        console.log(`   Featured: ${blog.featured ? '⭐ YES' : 'No'}`);
        console.log(`   Created: ${new Date(blog.createdAt).toLocaleDateString()}`);
        console.log(`   Views: ${blog.views || 0}`);
        console.log('');
      });
    }

    console.log('✍️  BLOGGER BLOG POSTS:');
    console.log('======================');
    if (bloggerBlogs.length === 0) {
      console.log('No blogger blog posts found.\n');
    } else {
      bloggerBlogs.forEach((blog, index) => {
        console.log(`${index + 1}. "${blog.title}"`);
        console.log(`   Author: ${blog.author.name || blog.author.email} (${blog.author.role})`);
        console.log(`   Status: ${blog.published ? 'Published' : 'Draft'}`);
        console.log(`   Featured: ${blog.featured ? '⭐ YES' : 'No'}`);
        console.log(`   Created: ${new Date(blog.createdAt).toLocaleDateString()}`);
        console.log(`   Views: ${blog.views || 0}`);
        console.log('');
      });
    }

    // Featured posts summary
    const featuredBlogs = allBlogs.filter(blog => blog.featured);
    console.log('⭐ FEATURED POSTS SUMMARY:');
    console.log('========================');
    console.log(`Total Featured Posts: ${featuredBlogs.length}`);
    
    const featuredByAdmin = featuredBlogs.filter(blog => {
      const author = userMap.get(blog.authorId);
      return author && author.role === 'admin';
    });
    
    const featuredByBlogger = featuredBlogs.filter(blog => {
      const author = userMap.get(blog.authorId);
      return author && author.role === 'blogger';
    });

    console.log(`Featured by Admin: ${featuredByAdmin.length}`);
    console.log(`Featured by Blogger: ${featuredByBlogger.length}\n`);

    // Published posts summary
    const publishedBlogs = allBlogs.filter(blog => blog.published);
    console.log('📰 PUBLISHED POSTS SUMMARY:');
    console.log('===========================');
    console.log(`Total Published Posts: ${publishedBlogs.length}`);
    
    const publishedByAdmin = publishedBlogs.filter(blog => {
      const author = userMap.get(blog.authorId);
      return author && author.role === 'admin';
    });
    
    const publishedByBlogger = publishedBlogs.filter(blog => {
      const author = userMap.get(blog.authorId);
      return author && author.role === 'blogger';
    });

    console.log(`Published by Admin: ${publishedByAdmin.length}`);
    console.log(`Published by Blogger: ${publishedByBlogger.length}\n`);

    console.log('💡 NOTES:');
    console.log('=========');
    console.log('- Featured posts appear in the Featured Stories slideshow on the homepage');
    console.log('- Both admin and blogger posts can now be marked as featured');
    console.log('- Only published posts are visible to the public');
    console.log('- Featured posts get special badges and higher ranking');

  } catch (error) {
    console.error('Error checking blog authors:', error);
  } finally {
    if (client) {
      await client.close();
    }
  }
}

checkBlogAuthors();
