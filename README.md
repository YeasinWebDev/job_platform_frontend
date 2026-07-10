# HirePeople — Job Platform Frontend

A modern, responsive job platform frontend (branded **HirePeople**) built with Next.js 16, React 19, and TypeScript. This application provides a comprehensive job search and application platform with user and recruiter dashboards, job posting with payment, and a seamless user experience.

## Features

- **User Authentication** - Secure login and registration system with role-based access (User, Recruiter, Admin)
- **Job Search & Browsing** - Search and filter job listings by location, category, experience, job type, salary, and date posted
- **Job Applications** - Apply to jobs and track application status (Applied, Shortlisted, Rejected)
- **User Dashboard** - Manage profile, view applied/saved jobs, and track application analytics
- **Recruiter Dashboard** - Post jobs, view applications, and monitor posting analytics
- **Job Posting & Payment** - Publish job listings with an integrated payment success flow
- **Responsive Design** - Mobile-first design with Tailwind CSS
- **Modern UI Components** - Built with shadcn/ui, Base UI, and custom components
- **Smooth Animations** - Enhanced UX with Framer Motion
- **Real-time Notifications** - Toast notifications for user actions

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4, tw-animate-css
- **UI Components**: shadcn/ui, Base UI (@base-ui/react)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Notifications**: React Hot Toast
- **Utilities**: clsx, tailwind-merge, class-variance-authority, use-debounce

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YeasinWebDev/job_platform_frontend.git
cd job_platform_frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```
Then set the following variable in your `.env.local`:
```
NEXT_PUBLIC_API_URL=https://your-backend-api-url.com
```
This points the frontend at the backend API used for auth, jobs, categories, and applications.

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check code quality

## Project Structure

```
job_platform_frontend/
├── app/                    # Next.js App Router pages and layouts
│   ├── (auth)/            # Authentication pages
│   ├── (homePage)/        # Home and job board pages
│   ├── dashboard/         # User and recruiter dashboard pages
│   ├── payment/           # Payment related pages
│   └── services/          # API service layer (auth, job, category)
├── components/            # Reusable React components
│   ├── dashboard/         # Dashboard-specific components
│   ├── home/              # Home page components
│   └── ui/                # UI library components
├── lib/                   # Utility functions and server fetch helper
├── public/                # Static assets
├── types/                 # TypeScript type definitions
└── middleware.ts          # Next.js middleware for route protection and auth
```

## Key Components

- **Navbar & Footer** - Navigation and site footer
- **Job Cards & Job Board** - Display and filter job listings
- **User & Recruiter Dashboards** - Personal dashboards with stats and applications
- **Authentication Forms** - Login and registration forms
- **Payment Integration** - Payment processing and success confirmation

## Development

### Code Quality

This project uses ESLint for code linting. Run the linter before committing:

```bash
npm run lint
```

### Styling

The project uses Tailwind CSS v4 with a custom configuration. UI components are built using shadcn/ui, Base UI, and custom variants with class-variance-authority.

### Type Safety

TypeScript is configured with strict mode enabled. All components and functions are fully typed.

### Environment Configuration

The application communicates with a backend API. The base URL is configured via the `NEXT_PUBLIC_API_URL` environment variable (see `.env.local`). Middleware protects private routes (`/profile`, `/dashboard`) by checking the `authToken` cookie.

## Demo Credentials

For testing purposes, you can use the following demo accounts:

### Job Seeker Account
- **Email:** yeasindev8@gmail.com
- **Password:** 123456

### Recruiter Accounts
1. **Email:** yeasin@gmail.com
  - **Password:** 123456

### Admin Accounts
2. **Email:** arafat@gmail.com
  - **Password:** 123456

## Deployment

### Deploy on Vercel

The easiest way to deploy this Next.js app is using the [Vercel Platform](https://vercel.com/new).

1. Push your code to GitHub
2. Import your repository on Vercel
3. Set the `NEXT_PUBLIC_API_URL` environment variable in your Vercel project settings
4. Vercel will automatically detect Next.js and deploy your application

### Other Deployment Options

- **Netlify** - Supports Next.js with proper configuration
- **AWS Amplify** - Full-stack deployment platform
- **Docker** - Containerize the application for any cloud provider

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is private and proprietary.

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - An interactive Next.js tutorial
- [Tailwind CSS](https://tailwindcss.com/docs) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components
- [Framer Motion](https://www.framer.com/motion/) - Animation library for React

---

Built with ❤️ using Next.js and modern web technologies.