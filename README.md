# Blog Sermaye

A Next.js project built with the Pages Router and React, demonstrating file-based routing, dynamic routes, and API routes.

## Features

- **Next.js Pages Router**: File-based routing system
- **React 18**: Modern React with hooks
- **TypeScript**: Type-safe development
- **Dynamic Routing**: Blog posts with dynamic routes
- **API Routes**: Backend API endpoints
- **CSS Modules**: Scoped styling for components
- **Responsive Design**: Mobile-friendly layouts

## Project Structure

```
blog-sermaye/
├── pages/
│   ├── api/
│   │   └── hello.ts          # API route example
│   ├── blog/
│   │   ├── [id].tsx          # Dynamic blog post page
│   │   └── index.tsx         # Blog listing page
│   ├── _app.tsx              # Custom App component
│   ├── _document.tsx         # Custom Document component
│   ├── about.tsx             # About page
│   ├── contact.tsx           # Contact page
│   └── index.tsx             # Home page
├── styles/
│   ├── globals.css           # Global styles
│   ├── Home.module.css       # Home page styles
│   └── Page.module.css       # Shared page styles
├── public/                   # Static assets
├── next.config.js            # Next.js configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd blog-sermaye
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
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

- `/` - Home page with navigation links
- `/about` - About page with project information
- `/contact` - Contact page
- `/blog` - Blog listing page
- `/blog/[id]` - Individual blog post (dynamic route)
  - Example: `/blog/1`, `/blog/2`, `/blog/3`
- `/api/hello` - API route returning JSON

## Learn More

To learn more about Next.js and React:

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Learn Next.js](https://nextjs.org/learn)

## License

This project is open source and available under the MIT License.