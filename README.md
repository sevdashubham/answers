# AnswersAI: Interactive Data Visualization Platform

A React-based dashboard for interactive data visualization, featuring customizable variables, detailed data insights, and smooth animations based on provided Figma design.

**Live Demo:** [https://answers-phi.vercel.app/](https://answers-phi.vercel.app/)

## Getting Started

### Prerequisites
- Node.js v18+
- npm v9+
- Supabase account
- Google Account (for OAuth login)

### Installation

1. Clone this repository
```bash
git clone https://github.com/sevdashubham/answers.git
cd answers
```

2. Install dependencies
```bash
npm install
```

3. Create environment file (.env)
```bash
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. Run the development server
```bash
npm run dev
```

5. Access the application
```
http://localhost:5173
```

### Authentication Setup

#### Supabase Configuration
1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Enable Email Authentication:
    - In Supabase Dashboard: Authentication → Providers → Email
    - Disable "Confirm email" in Email settings for easy login
3. Configure Google Authentication:
    - Create OAuth credentials in [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
    - Add authorized redirect URI: `https://<project-id>.supabase.co/auth/v1/callback`
    - Enable Google provider in Supabase Authentication settings

## Features

Data visualization platform with the following features:
- [x] Interactive dashboard with primary data visualization
- [x] Variables panel with search filter and adjustable parameters
- [x] Edit Variables slide-over card interaction
- [x] Data point hover interaction with detailed information
- [x] Variable selection interaction with contextual information
- [x] Responsive design
- [x] Authentication system (email and Google login)
- [x] Smooth transitions and animations

## Technical Decisions and Trade-offs

### Tech Stack
| Technology | Purpose | Rationale |
|------------|---------|-----------|
| React 19 + TypeScript | UI Framework | Type safety and modern React features |
| Vite | Build Tool | Fast development experience and optimized builds |
| Jotai | State Management | Atomic approach with minimal boilerplate |
| React Router Dom 7 | Routing | Latest version with improved features |
| Recharts | Data Visualization | Customizable and React-integrated charts |
| Framer Motion | Animations | Production-ready transitions and effects |
| React Hook Form + Yup | Form Handling | Performant form validation |
| Supabase | Authentication | Simple setup with multiple auth methods |
| Tailwind CSS | Styling | Utility-first approach for rapid UI development |

## Known Limitations

1. **Chart Data Constraints**
    - Visualization currently limited to fixed data points to match design
    - Limited graph data size reduces the overall realism of a dataset
    - Real-time data updates not implemented

2. **Authentication Restrictions**
    - No password recovery flow implemented
    - Limited user profile management

3. **Responsive Design**
    - Optimized primarily for desktop as per requirements
    - Mobile view has functional limitations on smaller screens

## Time Spent

| Task | Hours |
|------|-------|
| Project Setup & Config | 1.5 |
| Supabase Integration | 2.0 |
| Dashboard Implementation | 2.5 |
| Interactive Components | 1.5 |
| Testing & Polish | 0.5 |
| **Total Development Time** | **8 hours** |

## Local Development

For local development, follow these steps:

```bash
# Clone repository
git clone https://github.com/sevdashubham/answers.git
cd answers

# Install dependencies
npm install

# Create environment file with your Supabase credentials
echo "VITE_SUPABASE_URL=your-url\nVITE_SUPABASE_ANON_KEY=your-key" > .env

# Start development server
npm run dev
```

Access the application at: http://localhost:5173

## Deployment

This project is configured for easy deployment to Vercel:

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy with default settings
