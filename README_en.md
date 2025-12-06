# Short Link System

A full-featured short link management system built with React, TypeScript, and Prisma ORM, designed to be deployed on Netlify, Vercel, or Cloudflare Pages.

## Features

- 📦 **URL Shortening**: Create short, memorable links from long URLs
- 🎨 **Custom Slugs**: Use your own custom slugs for short links
- 📊 **Analytics**: Track link clicks, referrers, and user agents
- 🔐 **Authentication**: Secure admin dashboard with email/password authentication
- 💾 **PostgreSQL Database**: Store links and analytics data in PostgreSQL
- 🌐 **Multi-Platform Support**: Deploy to Netlify, Vercel, or Cloudflare Pages
- ⚡ **Edge Functions**: Fast redirects using platform-native edge functions
- 🎯 **Responsive Design**: Mobile-friendly admin dashboard

## Tech Stack

### Frontend
- **Framework**: React 18
- **Type System**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Form Handling**: React Hook Form

### Backend
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Authentication**: Auth.js
- **Edge Functions**: Platform-native functions

## Getting Started

### Prerequisites

- Node.js 18+ (for local development)
- PostgreSQL database (for production)
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/short-link-system.git
   cd short-link-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Copy `.env.example` to `.env`
   - Update the `DATABASE_URL` with your PostgreSQL connection string
   - Set a secure `AUTH_SECRET`

4. **Run database migrations**
   ```bash
   npx prisma migrate dev
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## Deployment

### Deploy to Netlify

1. **Connect your repository**
   - Go to [Netlify](https://app.netlify.com/)
   - Click "Add new site" → "Import an existing project"
   - Connect to your GitHub repository

2. **Configure build settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Set environment variables**
   - Go to Site settings → Environment variables
   - Add all variables from `.env`

4. **Deploy site**
   - Click "Deploy site"

### Deploy to Vercel

1. **Connect your repository**
   - Go to [Vercel](https://vercel.com/)
   - Click "Add New"
   - Import your GitHub repository

2. **Configure build settings**
   - Framework Preset: Vite
   - Build command: `npm run build`
   - Output directory: `dist`

3. **Set environment variables**
   - Add all variables from `.env` in the Environment Variables section

4. **Deploy**
   - Click "Deploy"

### Deploy to Cloudflare Pages

1. **Connect your repository**
   - Go to [Cloudflare Pages](https://dash.cloudflare.com/)
   - Click "Create a project"
   - Connect to your GitHub repository

2. **Configure build settings**
   - Framework: Vite
   - Build command: `npm run build`
   - Build output directory: `dist`

3. **Set environment variables**
   - Add all variables from `.env` in the Environment Variables section

4. **Deploy site**
   - Click "Save and Deploy"

## Database Configuration

### PostgreSQL Setup

1. **Create a PostgreSQL database**
   ```bash
   # Using PostgreSQL CLI
   createdb short-links
   
   # Using Docker
   docker run --name short-links-db -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
   ```

2. **Connection String Format**
   ```
   postgresql://username:password@host:port/database?schema=public
   ```

3. **Example Connection Strings**
   ```
   # Local PostgreSQL
   postgresql://postgres:postgres@localhost:5432/short-links?schema=public
   
   # Supabase
   postgresql://postgres:your-supabase-password@db.your-project.supabase.co:5432/postgres?schema=public
   
   # Railway
   postgresql://postgres:your-railway-password@containers-us-west-123.railway.app:1234/railway
   ```

### Database Migrations

1. **Create a new migration**
   ```bash
   npx prisma migrate dev --name migration-name
   ```

2. **Run migrations in production**
   ```bash
   npx prisma migrate deploy
   ```

3. **View database schema**
   ```bash
   npx prisma studio
   ```

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string | ✅ | - |
| `AUTH_SECRET` | Secret key for authentication | ✅ | - |
| `AUTH_TRUST_HOST` | Trust the host for authentication | ❌ | `false` |
| `NODE_ENV` | Environment (development/production) | ❌ | `development` |
| `BASE_URL` | Base URL for short links | ❌ | `http://localhost:3000` |
| `REDIS_URL` | Redis connection string (optional) | ❌ | - |

## Project Structure

```
short-link-system/
├── public/                # Static assets
├── src/
│   ├── components/        # React components
│   ├── pages/             # Page components
│   ├── lib/               # Utility functions
│   │   ├── db/            # Database connection
│   │   ├── auth/          # Authentication logic
│   │   └── utils/         # Helper functions
│   ├── types/             # TypeScript type definitions
│   └── hooks/             # Custom React hooks
├── functions/             # Edge functions
│   ├── api/               # API endpoints
│   └── redirect.ts        # Short link redirect function
├── prisma/                # Prisma configuration
├── netlify.toml           # Netlify configuration
├── vercel.json            # Vercel configuration
├── wrangler.toml          # Cloudflare Pages configuration
└── package.json           # Project dependencies
```

## API Endpoints

### Links API

- `GET /api/links` - Get all short links for the current user
- `POST /api/links` - Create a new short link
- `PUT /api/links` - Update a short link
- `DELETE /api/links` - Delete a short link

### Stats API

- `GET /api/stats?linkId=:id` - Get click statistics for a short link

## Authentication

The application uses Auth.js for authentication. Currently supported methods:
- Email/Password authentication

### Authentication Flow

1. User visits the admin dashboard
2. If not authenticated, redirect to login page
3. User logs in with email and password
4. Auth.js creates a secure session
5. User accesses the admin dashboard

## Performance Optimization

### Short Link Redirects
- Uses edge functions for low-latency redirects
- Database queries are optimized with indexes
- Redis caching (optional) for frequently accessed links

### Frontend Performance
- Code splitting with React.lazy()
- Image optimization
- Minimal dependencies
- Efficient rendering with React hooks

## Security

- **Input Validation**: All user input is validated
- **SQL Injection Protection**: Uses Prisma ORM with parameterized queries
- **XSS Protection**: Implements Content Security Policy (CSP)
- **CSRF Protection**: Uses Auth.js built-in CSRF protection
- **Password Hashing**: Uses bcrypt for password storage
- **Rate Limiting**: API endpoints are rate-limited

## Customization

### Adding New Features

1. **Add a new model to Prisma schema**
   ```prisma
   // prisma/schema.prisma
   model NewFeature {
     id String @id @default(cuid())
     // fields here
   }
   ```

2. **Generate Prisma client**
   ```bash
   npx prisma generate
   ```

3. **Create API endpoints**
   ```typescript
   // functions/api/new-feature.ts
   export const handler = async (req: Request) => {
     // API logic here
   }
   ```

4. **Add frontend components**
   ```typescript
   // src/components/NewFeatureComponent.tsx
   const NewFeatureComponent = () => {
     // Component logic here
   }
   ```

### Custom Styling

- Modify `tailwind.config.js` to customize colors, fonts, and more
- Update `src/index.css` for global styles
- Use Tailwind utility classes for component-specific styling

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Troubleshooting

### Common Issues

1. **Database connection errors**
   - Check your `DATABASE_URL` environment variable
   - Ensure your PostgreSQL server is running
   - Verify database credentials

2. **Deployment failures**
   - Check build logs for errors
   - Ensure all environment variables are set
   - Verify build command and output directory

3. **Authentication issues**
   - Check `AUTH_SECRET` environment variable
   - Verify email and password are correct
   - Check browser developer console for errors

### Support

- For bug reports, open an issue on GitHub
- For questions, join our Discord community
- For feature requests, submit a pull request

## Roadmap

- [ ] Support for QR code generation
- [ ] Batch link import/export
- [ ] Custom domain support
- [ ] Team collaboration features
- [ ] Advanced analytics with charts
- [ ] More authentication methods (Google, GitHub, etc.)
- [ ] API documentation with Swagger
- [ ] Dark mode support

## Acknowledgments

- Inspired by popular URL shorteners like Bitly and TinyURL
- Built with modern web technologies
- Designed for performance and scalability
- Open-source and community-driven

---

Built with ❤️ using React, TypeScript, and Prisma