# MongoDB Setup for Prisma

## Issue
Prisma requires MongoDB to run as a replica set for transactions. The error you're seeing:
```
Prisma needs to perform transactions, which requires your MongoDB server to be run as a replica set.
```

## Solution

### Option 1: Set up MongoDB as a Replica Set (Recommended for Production)

1. **Stop your current MongoDB instance:**
   ```bash
   # If running with brew
   brew services stop mongodb-community
   
   # Or if running manually
   sudo pkill mongod
   ```

2. **Create a data directory:**
   ```bash
   mkdir -p ~/mongodb-replica/data
   ```

3. **Start MongoDB as a replica set:**
   ```bash
   mongod --replSet rs0 --dbpath ~/mongodb-replica/data --port 27017
   ```

4. **In another terminal, initialize the replica set:**
   ```bash
   mongosh --eval "rs.initiate()"
   ```

5. **Verify the replica set is working:**
   ```bash
   mongosh --eval "rs.status()"
   ```

6. **Update your .env.local file:**
   ```
   DATABASE_URL=mongodb://localhost:27017/aaragya-insights?replicaSet=rs0
   ```

### Option 2: Use MongoDB Atlas (Cloud - Easiest)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Get your connection string
4. Update your .env.local:
   ```
   DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/aaragya-insights?retryWrites=true&w=majority
   ```

### Option 3: Use Docker (Development)

1. **Create a docker-compose.yml file:**
   ```yaml
   version: '3.8'
   services:
     mongodb:
       image: mongo:7
       container_name: mongodb-replica
       ports:
         - "27017:27017"
       command: mongod --replSet rs0
       volumes:
         - mongodb_data:/data/db
   
   volumes:
     mongodb_data:
   ```

2. **Start the container:**
   ```bash
   docker-compose up -d
   ```

3. **Initialize the replica set:**
   ```bash
   docker exec -it mongodb-replica mongosh --eval "rs.initiate()"
   ```

4. **Update your .env.local:**
   ```
   DATABASE_URL=mongodb://localhost:27017/aaragya-insights?replicaSet=rs0
   ```

## After Setup

1. **Generate Prisma client:**
   ```bash
   npx prisma generate
   ```

2. **Push schema to database:**
   ```bash
   npx prisma db push
   ```

3. **Start your development server:**
   ```bash
   npm run dev
   ```

## Troubleshooting

- If you get connection errors, make sure MongoDB is running
- Check that the replica set is properly initialized with `rs.status()`
- Verify your DATABASE_URL in .env.local is correct
- Make sure no other MongoDB instance is running on port 27017

## Quick Fix for Development

If you just want to get started quickly, you can temporarily disable transactions in Prisma by modifying your schema, but this is not recommended for production.

The easiest solution is to use MongoDB Atlas (Option 2) as it handles replica sets automatically.
