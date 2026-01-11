# Blog Sermaye 💝

A video dating and live streaming platform built with Next.js, React, and TypeScript. Connect with people through matches, private video calls, and public live streams.

## Features

### 🔐 Authentication & Security
- **User Registration**: Secure account creation with email verification
- **Email Verification**: Verify email addresses before account activation
- **Secure Login**: JWT-based authentication with HTTP-only cookies
- **Password Reset**: Email-based password recovery system
- **Password Hashing**: Bcrypt encryption for secure password storage
- **Session Management**: 7-day session tokens with automatic renewal

### 🎯 Dating & Matching
- **Profile Discovery**: Browse and discover potential matches
- **Smart Matching**: Like/pass system to find connections
- **Match Management**: View and manage all your matches
- **Real-time Chat**: Text messaging with matched users

### 📹 Private Video Calls
- **Real-time Video**: One-on-one video calls with matches
- **Privacy First**: Calls are NOT recorded or stored
- **Audio Controls**: Mute/unmute during calls
- **Video Controls**: Toggle camera on/off

### 🔴 Live Streaming
- **Go Live Solo**: Broadcast publicly to all users
- **Go Live Together**: Get matched and stream publicly together
- **Live Chat**: Real-time chat with viewers
- **Viewer Reactions**: Interactive emoji reactions
- **Stream Management**: Control settings and end streams

### 🎨 Modern UI/UX
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Real-time Updates**: Live viewer counts and chat
- **Smooth Animations**: Polished user experience
- **Dark Mode Streaming**: Optimized for video content

## Project Structure

```
blog-sermaye/
├── pages/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── register.ts           # User registration API
│   │   │   ├── login.ts              # User login API
│   │   │   ├── verify-email.ts       # Email verification API
│   │   │   ├── forgot-password.ts    # Password reset request API
│   │   │   └── reset-password.ts     # Password reset API
│   │   └── hello.ts                  # API route example
│   ├── chat/
│   │   └── [matchId].tsx             # Text chat with matches
│   ├── stream/
│   │   └── [id].tsx                  # Watch live streams
│   ├── video-call/
│   │   └── [matchId].tsx             # Private video calls
│   ├── _app.tsx                      # Custom App component
│   ├── _document.tsx                 # Custom Document component
│   ├── index.tsx                     # Home page with live streams
│   ├── login.tsx                     # Login page
│   ├── register.tsx                  # Registration page
│   ├── forgot-password.tsx           # Forgot password page
│   ├── reset-password.tsx            # Reset password page
│   ├── verify-email.tsx              # Email verification page
│   ├── discover.tsx                  # Discover and match with users
│   ├── matches.tsx                   # Your matches
│   ├── profile.tsx                   # User profile
│   ├── settings.tsx                  # User settings
│   ├── go-live.tsx                   # Start live streaming setup
│   ├── go-live-together.tsx          # Go live together matching opt-in
│   ├── live-together-matching.tsx    # Match confirmation for live together
│   ├── live-together-stream.tsx      # Live streaming with matched partner
│   └── streaming.tsx                 # Active streaming interface
├── lib/
│   ├── prisma.ts                     # Prisma client singleton
│   ├── auth.ts                       # Authentication utilities
│   └── email.ts                      # Email service utilities
├── prisma/
│   └── schema.prisma                 # Database schema
├── styles/
│   ├── globals.css               # Global styles
│   ├── Home.module.css           # Home page styles
│   ├── Discover.module.css       # Discovery page styles
│   ├── Matches.module.css        # Matches page styles
│   ├── Profile.module.css        # Profile page styles
│   ├── GoLive.module.css         # Go live setup styles
│   ├── Streaming.module.css      # Streaming interface styles
│   ├── WatchStream.module.css    # Watch stream styles
│   ├── VideoCall.module.css      # Video call styles
│   ├── Chat.module.css           # Chat styles
│   ├── GoLiveTogether.module.css # Go live together styles
│   ├── LiveTogetherMatching.module.css # Matching confirmation styles
│   └── LiveTogetherStream.module.css   # Live together stream styles
├── public/                       # Static assets
├── next.config.js                # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm
- SMTP email service (Gmail, SendGrid, etc.)
- **Database**: SQLite (included by default, no setup needed) or PostgreSQL (optional, for production)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd blog-sermaye
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and configure:
- `DATABASE_URL` - SQLite database path (default: `file:./dev.db` - no changes needed!)
- `JWT_SECRET` - Random secret key for JWT tokens
- `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASSWORD` - SMTP credentials
- `APP_URL` - Your application URL

4. Set up the database:
```bash
# Generate Prisma Client
npx prisma generate

# Run database migrations (SQLite database created automatically)
npx prisma migrate dev --name init

# (Optional) View database in browser
npx prisma studio
```

**Note**: The default setup uses SQLite which requires zero configuration. For production, see [SETUP.md](./SETUP.md) for PostgreSQL setup.

For detailed setup instructions, see **[SETUP.md](./SETUP.md)**

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

### Starting Production Server

```bash
npm start
# or
yarn start
# or
pnpm start
```

## Routes

### Authentication
- `/register` - Create a new account
- `/login` - Sign in to your account
- `/forgot-password` - Request password reset
- `/reset-password?token=xxx` - Reset your password
- `/verify-email?token=xxx` - Verify email address

### Main Pages
- `/` - Home page with live streams feed
- `/discover` - Discover and match with users
- `/matches` - View your matches
- `/profile` - Your user profile
- `/settings` - Account and privacy settings

### Streaming
- `/go-live` - Setup and start live streaming solo
- `/streaming` - Active streaming interface (broadcaster view)
- `/stream/[id]` - Watch a live stream (viewer view)
- `/go-live-together` - Opt-in to go live together & match
- `/live-together-matching` - Match confirmation with partner
- `/live-together-stream` - Live stream together with matched partner

### Communication
- `/chat/[matchId]` - Text chat with a match
- `/video-call/[matchId]` - Private video call with a match

### API
- `/api/auth/register` - User registration
- `/api/auth/login` - User authentication
- `/api/auth/verify-email` - Email verification
- `/api/auth/forgot-password` - Password reset request
- `/api/auth/reset-password` - Password reset
- `/api/hello` - API route example

## Key Concepts

### Privacy & Security
- **No Recording**: Private video calls are real-time only and NOT recorded
- **Match-Only Calls**: Video calls only available with matched users
- **Public Streams**: Live streams are public by design
- **Go Live Together Consent**: Both users must explicitly opt-in BEFORE matching
- **Double Confirmation**: Both parties confirm before going live together
- **Community Guidelines**: Clear rules for appropriate behavior

### User Flow

#### Private Dating Flow
1. **Create Profile** - Set up your profile with interests
2. **Discover** - Browse potential matches and like/pass
3. **Match** - When mutual interest, unlock chat and video calls
4. **Connect** - Text chat or video call privately with matches

#### Public Streaming Flow
5. **Go Live Solo** - Broadcast publicly by yourself to meet new people
6. **Go Live Together** - Opt-in to be matched and stream publicly with someone else

### Technical Stack
- **Framework**: Next.js 14 with Pages Router
- **Language**: TypeScript
- **Database**: SQLite (development) / PostgreSQL (production) with Prisma ORM
- **Authentication**: JWT tokens with HTTP-only cookies
- **Password Hashing**: Bcryptjs
- **Email**: Nodemailer (supports Gmail, SendGrid, Mailgun, AWS SES)
- **Styling**: CSS Modules
- **Icons**: Lucide React
- **State Management**: React Hooks (useState, useEffect)
- **Routing**: Dynamic routes for user content

## Future Enhancements

### Already Implemented ✅
- ✅ User authentication and authorization
- ✅ Database with SQLite (dev) / PostgreSQL (prod) and Prisma ORM
- ✅ Email verification system
- ✅ Password reset functionality
- ✅ Secure session management
- ✅ Zero-config development setup with SQLite

### To Be Implemented
1. **WebRTC** - For actual video streaming (try libraries like Simple-peer, PeerJS, or Agora)
2. **Socket.IO** - Real-time chat and notifications
3. **CDN/Streaming** - Video distribution (Twilio, Agora, Mux, etc.)
4. **File Upload** - Profile pictures and media (AWS S3, Cloudinary)
5. **Matching Algorithm** - Advanced matching based on preferences
6. **Push Notifications** - Web push notifications for matches and messages
7. **Payment Integration** - Premium features (Stripe, PayPal)

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [WebRTC Guide](https://webrtc.org/getting-started/overview)
- [Socket.IO Documentation](https://socket.io/docs/)

## License

This project is open source and available under the MIT License.