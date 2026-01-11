# Blog Sermaye - Setup Guide

This guide will help you set up the database and email functionality for the Blog Sermaye application.

## Prerequisites

- Node.js 18+ installed
- SMTP email service (Gmail, SendGrid, Mailgun, etc.)
- **Database**: SQLite (included, no setup required) or PostgreSQL (optional, for production)

## 1. Install Dependencies

```bash
npm install
```

## 2. Database Setup

### Option A: SQLite (Default - Recommended for Development)

**No setup required!** SQLite is file-based and requires zero configuration.

The database is already configured in `.env`:

```env
DATABASE_URL="file:./dev.db"
```

Just run the migrations and you're done:

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations to create tables (creates dev.db automatically)
npx prisma migrate dev --name init

# (Optional) Open Prisma Studio to view your database
npx prisma studio
```

The SQLite database file `dev.db` will be created in the `prisma/` folder automatically.

**Advantages:**
- ✅ Zero setup - works out of the box
- ✅ No database server required
- ✅ Perfect for development and testing
- ✅ Easy to reset (`rm prisma/dev.db` and re-run migrations)
- ✅ Portable - just one file

### Option B: PostgreSQL (Recommended for Production)

For production deployments, PostgreSQL is recommended:

#### Local PostgreSQL

1. Install PostgreSQL on your machine
2. Create a new database:

```sql
CREATE DATABASE blog_sermaye;
```

3. Update the `DATABASE_URL` in your `.env` file:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/blog_sermaye?schema=public"
```

4. Update `prisma/schema.prisma` datasource:

```prisma
datasource db {
  provider = "postgresql"  // Change from "sqlite"
  url      = env("DATABASE_URL")
}
```

5. Run migrations:

```bash
npx prisma migrate dev
```

#### Hosted PostgreSQL

Use a hosted PostgreSQL service like:
- **Supabase** (https://supabase.com) - Free tier available
- **Railway** (https://railway.app) - Free tier available
- **Neon** (https://neon.tech) - Serverless PostgreSQL
- **AWS RDS** - For production deployments

Get your connection string from your provider, update `.env` and `schema.prisma`, then run migrations.

## 3. Email Configuration

### Option A: Gmail (For Development/Testing)

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account Settings
   - Security > 2-Step Verification > App passwords
   - Generate a new app password for "Mail"
3. Update `.env`:

```env
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-16-char-app-password"
EMAIL_FROM="Blog Sermaye <your-email@gmail.com>"
```

### Option B: SendGrid (Recommended for Production)

1. Sign up at https://sendgrid.com (Free tier: 100 emails/day)
2. Create an API key
3. Verify your sender email
4. Update `.env`:

```env
EMAIL_HOST="smtp.sendgrid.net"
EMAIL_PORT="587"
EMAIL_USER="apikey"
EMAIL_PASSWORD="your-sendgrid-api-key"
EMAIL_FROM="Blog Sermaye <verified@yourdomain.com>"
```

### Option C: Mailgun

1. Sign up at https://mailgun.com
2. Get your SMTP credentials
3. Update `.env`:

```env
EMAIL_HOST="smtp.mailgun.org"
EMAIL_PORT="587"
EMAIL_USER="your-mailgun-smtp-username"
EMAIL_PASSWORD="your-mailgun-smtp-password"
EMAIL_FROM="Blog Sermaye <noreply@yourdomain.com>"
```

### Option D: AWS SES (For Large Scale Production)

1. Set up AWS SES
2. Verify your domain
3. Get SMTP credentials
4. Update `.env`:

```env
EMAIL_HOST="email-smtp.us-east-1.amazonaws.com"
EMAIL_PORT="587"
EMAIL_USER="your-aws-smtp-username"
EMAIL_PASSWORD="your-aws-smtp-password"
EMAIL_FROM="Blog Sermaye <noreply@yourdomain.com>"
```

## 4. Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Update the following variables:

```env
# Database
DATABASE_URL="your-postgresql-connection-string"

# JWT Secret (generate a random string)
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# Application URL
APP_URL="http://localhost:3000"  # Change to your domain in production

# Email Configuration
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-app-password"
EMAIL_FROM="Blog Sermaye <noreply@blogsermaye.com>"
```

### Generate JWT Secret

You can generate a secure random string for JWT_SECRET:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 5. Run the Application

### Development

```bash
npm run dev
```

The application will be available at http://localhost:3000

### Production

```bash
# Build the application
npm run build

# Start the production server
npm start
```

## 6. Test the Authentication Flow

1. **Register a new account** at http://localhost:3000/register
   - Fill in the registration form
   - Click "Create Account"
   - You should see a success message

2. **Check your email** for the verification link
   - Look in your inbox (and spam folder)
   - Click the verification link
   - You should be redirected to the verification success page

3. **Log in** at http://localhost:3000/login
   - Use your email and password
   - You should be redirected to your profile

4. **Test password reset** at http://localhost:3000/forgot-password
   - Enter your email
   - Check your email for the reset link
   - Click the link and set a new password

## 7. Troubleshooting

### Database Connection Issues

- Verify your PostgreSQL server is running
- Check the connection string format
- Ensure the database exists
- Check firewall rules if using a hosted database

### Email Not Sending

- Verify SMTP credentials are correct
- Check if "Less secure app access" is enabled (for Gmail)
- Use app-specific password for Gmail (not your account password)
- Check spam folder
- Review server logs for error messages
- Test with a simple SMTP testing tool first

### Prisma Issues

```bash
# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Regenerate Prisma Client
npx prisma generate

# View database in browser
npx prisma studio
```

### Common Errors

**"PrismaClient is not configured"**
```bash
npx prisma generate
```

**"Database does not exist"**
```bash
# Create the database first, then run migrations
npx prisma migrate dev
```

**"Email verification expired"**
- Verification links expire after 24 hours
- Password reset links expire after 1 hour
- Request a new link if expired

## 8. Database Schema

The application uses the following database schema:

```prisma
model User {
  id                 String    @id @default(cuid())
  email              String    @unique
  password           String
  name               String
  age                Int
  gender             String
  bio                String?
  location           String?

  // Email verification
  emailVerified      Boolean   @default(false)
  verificationToken  String?   @unique
  verificationExpiry DateTime?

  // Password reset
  resetToken         String?   @unique
  resetTokenExpiry   DateTime?

  // Account status
  isActive           Boolean   @default(true)

  // Timestamps
  createdAt          DateTime  @default(now())
  updatedAt          DateTime  @updatedAt
}
```

## 9. API Endpoints

### Authentication Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login with email and password
- `POST /api/auth/verify-email` - Verify email with token
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token

### Frontend Pages

- `/register` - Registration form
- `/login` - Login form
- `/forgot-password` - Forgot password form
- `/reset-password?token=xxx` - Reset password form
- `/verify-email?token=xxx` - Email verification page

## 10. Security Considerations

- Passwords are hashed using bcrypt (10 salt rounds)
- JWT tokens expire after 7 days
- Email verification tokens expire after 24 hours
- Password reset tokens expire after 1 hour
- HTTP-only cookies for JWT storage
- CSRF protection via sameSite cookie attribute
- Input validation on both frontend and backend
- SQL injection prevention via Prisma ORM

## 11. Production Deployment

### Environment Variables

Set these in your production environment:

```env
NODE_ENV="production"
DATABASE_URL="your-production-database-url"
JWT_SECRET="strong-random-string-minimum-32-characters"
APP_URL="https://yourdomain.com"
EMAIL_HOST="your-production-smtp-host"
EMAIL_PORT="587"
EMAIL_USER="your-production-email-user"
EMAIL_PASSWORD="your-production-email-password"
EMAIL_FROM="Blog Sermaye <noreply@yourdomain.com>"
```

### Database Migration

```bash
# Run migrations in production
npx prisma migrate deploy
```

### Recommended Hosting Platforms

- **Vercel** - Best for Next.js (automatic deployments)
- **Railway** - Database + App hosting
- **AWS** - Full control, scalable
- **DigitalOcean** - Simple VPS hosting

## 12. Need Help?

- Check the [Prisma Documentation](https://www.prisma.io/docs)
- Check the [Next.js Documentation](https://nextjs.org/docs)
- Check the [Nodemailer Documentation](https://nodemailer.com/about/)

## 13. License

This project is for the Blog Sermaye application.
