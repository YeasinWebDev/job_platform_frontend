# Job Platform Frontend

A modern, responsive job platform frontend built with Next.js 16, React 19, and TypeScript. This application provides a comprehensive job search and application platform with user dashboards, interview preparation tools, and seamless user experience.

## Features

- **User Authentication** - Secure login and registration system
- **Job Search & Browsing** - Search and filter job listings
- **Job Applications** - Apply to jobs and track application status
- **User Dashboard** - Manage profile, view applied jobs, and track progress
- **Interview Preparation** - Access interview prep resources and tools
- **Responsive Design** - Mobile-first design with Tailwind CSS
- **Modern UI Components** - Built with shadcn/ui and custom components
- **Smooth Animations** - Enhanced UX with Framer Motion
- **Real-time Notifications** - Toast notifications for user actions

## Tech Stack

- **Framework**: Next.js 16.1.6 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui, Base UI
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Notifications**: React Hot Toast
- **Utilities**: clsx, tailwind-merge, class-variance-authority

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

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

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
│   ├── (homePage)/        # Home page components
│   ├── dashboard/         # User dashboard pages
│   ├── payment/           # Payment related pages
│   └── services/          # Service pages
├── components/            # Reusable React components
│   ├── dashboard/         # Dashboard-specific components
│   ├── home/              # Home page components
│   └── ui/                # UI library components
├── lib/                   # Utility functions and configurations
├── public/                # Static assets
├── types/                 # TypeScript type definitions
└── middleware.ts          # Next.js middleware for routing and auth
```

## Key Components

- **Navbar & Footer** - Navigation and site footer
- **Job Cards** - Display job listings with filtering
- **User Dashboard** - Personal dashboard with stats and applied jobs
- **Interview Prep** - Tools and resources for interview preparation
- **Authentication Forms** - Login and registration forms
- **Payment Integration** - Payment processing components

## Development

### Code Quality

This project uses ESLint for code linting. Run the linter before committing:

```bash
npm run lint
```

### Styling

The project uses Tailwind CSS v4 with a custom configuration. UI components are built using shadcn/ui and custom variants with class-variance-authority.

### Type Safety

TypeScript is configured with strict mode enabled. All components and functions are fully typed.

## Deployment

### Deploy on Vercel

The easiest way to deploy this Next.js app is using the [Vercel Platform](https://vercel.com/new).

1. Push your code to GitHub
2. Import your repository on Vercel
3. Vercel will automatically detect Next.js and deploy your application

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