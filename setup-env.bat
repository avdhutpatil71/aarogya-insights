@echo off
echo Creating .env.local file...

(
echo # Cloudinary Configuration
echo CLOUDINARY_URL=cloudinary://164925463685192:O7riVeonNRb1ZtHCzJsdG41IMTM@dmxscqnbe
echo.
echo # NextAuth Configuration ^(update these with your actual values^)
echo NEXTAUTH_URL=http://localhost:3000
echo NEXTAUTH_SECRET=your_nextauth_secret_here
echo.
echo # Database Configuration ^(update this with your actual database URL if using Prisma^)
echo DATABASE_URL=your_database_url_here
) > .env.local

echo ✅ .env.local file created successfully!
echo.
echo 📝 Next steps:
echo 1. Update NEXTAUTH_SECRET with your actual secret
echo 2. Update DATABASE_URL with your actual database URL ^(if using Prisma^)
echo 3. Run 'npm run dev' to start the development server
echo.
echo 🚀 Cloudinary is now configured and ready to use!
pause
