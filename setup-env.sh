# Environment Setup Script for Cloudinary

# Create .env.local file with Cloudinary configuration
echo "Creating .env.local file..."

# Create the environment file
cat > .env.local << 'EOF'
# Cloudinary Configuration
CLOUDINARY_URL=cloudinary://164925463685192:O7riVeonNRb1ZtHCzJsdG41IMTM@dmxscqnbe

# NextAuth Configuration (update these with your actual values)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here

# Database Configuration (update this with your actual database URL if using Prisma)
DATABASE_URL=your_database_url_here
EOF

echo "✅ .env.local file created successfully!"
echo ""
echo "📝 Next steps:"
echo "1. Update NEXTAUTH_SECRET with your actual secret"
echo "2. Update DATABASE_URL with your actual database URL (if using Prisma)"
echo "3. Run 'npm run dev' to start the development server"
echo ""
echo "🚀 Cloudinary is now configured and ready to use!"
