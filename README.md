# AI Transformation Hub

**Developed with Z.ai and finalized by Kiro**

A comprehensive AI transformation platform that helps organizations assess their AI readiness, access personalized learning pathways, and receive competitive intelligence reports with regional market analysis.

## 🌟 Overview

AI Transformation Hub is a full-stack web application designed to guide businesses through their AI transformation journey. From initial readiness assessment to detailed competitive intelligence and structured learning paths, this platform provides everything organizations need to successfully adopt and implement AI technologies.

## ✨ Key Features

### 🎯 AI Readiness Assessment
- **10-Question Comprehensive Assessment** across 4 key dimensions:
  - Strategy & Leadership
  - Skills & Talent
  - Data & Infrastructure
  - Culture & Adoption
- **Country Selection** - 25+ countries for regional analysis
- **Industry Selection** - Enterprise and SMME (Small, Medium & Micro Enterprises) categories
- **Instant Scoring** with detailed breakdown by category

### 📊 Competitive Intelligence Reports
- **Regional Market Analysis** - Country-specific market size and growth rates
- **Competitor Analysis** - Identify key competitors in your region
- **Market Opportunities** - Discover AI opportunities specific to your market
- **Strategic Recommendations** - Actionable insights with ROI projections
- **2-Week Implementation Plans** - Day-by-day action plans
- **Downloadable Reports** - Export your complete analysis

### 📚 Personalized Learning Pathways
Six comprehensive learning paths with detailed 2-week plans:

1. **CEO Strategic AI Leadership** (24 hours)
   - Competitive Intelligence & AI Market Mapping
   - AI-First Business Model Innovation
   - Strategic AI Investment Portfolio

2. **AI-Driven Revenue Generation** (26 hours)
   - AI-Powered Customer Intelligence
   - Revenue Optimization Through AI
   - Innovation Pipeline Management

3. **AI Fundamentals for Managers** (16 hours)
   - AI Literacy Basics
   - Managing AI-Enhanced Teams
   - AI Project Management

4. **Practical AI for Employees** (12 hours)
   - AI Tools for Daily Work
   - Human-AI Collaboration
   - Data Skills for AI

5. **Healthcare AI Transformation** (20 hours)
   - AI in Medical Diagnostics
   - Healthcare Data Analytics
   - AI Ethics in Healthcare

6. **Financial Services AI Innovation** (18 hours)
   - AI in Risk Assessment
   - Algorithmic Trading Basics
   - Fraud Detection with AI

Each pathway includes:
- ✅ Daily activities and deliverables
- ✅ Time estimates
- ✅ Success metrics
- ✅ Resource recommendations

### 📈 Transformation Dashboard
- **Progress Tracking** - Monitor your AI transformation journey
- **Quick Actions** - Easy access to assessments, learning, and analytics
- **Recent Activity** - Track completed assessments and learning modules
- **Business Impact Metrics** - Measure ROI, productivity gains, and skill growth

### 🔐 Admin Portal
- **Secure Authentication** - Protected admin access
- **Consultation Management** - Track and manage consultation requests
- **Industry Analytics** - View aggregated data across industries
- **Report Archive** - Access all generated reports

### � Consulntation Booking
- **Request Consultation** - Schedule strategy sessions with AI experts
- **Multiple Consultation Types** - Strategy, Implementation, ROI Analysis, Training
- **Automated Tracking** - All requests stored and managed in admin portal

## �️P Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Shadcn UI** - Beautiful, accessible components
- **Lucide Icons** - Modern icon library

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Prisma ORM** - Type-safe database access
- **SQLite** - Embedded database (easily upgradable to PostgreSQL/MySQL)

### AI Integration
- **Z.ai SDK** - AI-powered report generation
- **Fallback System** - Works with or without AI API

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/aVontade/Ai-Transformation-Hub.git
cd Ai-Transformation-Hub
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up the database**
```bash
npx prisma generate
npx prisma db push
```

4. **Create environment file**
```bash
echo 'DATABASE_URL="file:./db/custom.db"' > .env
```

5. **Run the development server**
```bash
npm run dev
```

6. **Open your browser**
```
http://localhost:3000
```

## 📁 Project Structure

```
ai-transformation-hub/
├── src/
│   ├── app/
│   │   ├── api/              # API routes
│   │   │   ├── generate-report/
│   │   │   ├── consultation-request/
│   │   │   ├── get-reports/
│   │   │   └── industry-analytics/
│   │   ├── analytics/        # Analytics page
│   │   ├── consultation/     # Consultation booking
│   │   ├── reports/          # Reports archive
│   │   ├── team/             # Team management
│   │   ├── goals/            # Goals tracking
│   │   └── page.tsx          # Main application
│   ├── components/
│   │   ├── AIReadinessAssessment.tsx
│   │   ├── Dashboard.tsx
│   │   ├── LearningPaths.tsx
│   │   ├── AdminDashboard.tsx
│   │   ├── AdminLogin.tsx
│   │   ├── DetailedReport.tsx
│   │   ├── ConsultationBooking.tsx
│   │   └── ui/               # Shadcn UI components
│   └── lib/
│       ├── db.ts             # Database client
│       └── utils.ts          # Utility functions
├── prisma/
│   └── schema.prisma         # Database schema
├── public/
│   └── at-logo.svg           # Application logo
└── db/
    └── custom.db             # SQLite database
```

## 🎨 Design Features

- **Custom Logo** - Branded navigation with Ferrari-red border
- **Dark Theme** - Professional slate color scheme
- **Responsive Design** - Mobile-first approach
- **Accessible Components** - WCAG compliant UI elements
- **Modern Animations** - Smooth transitions and interactions

## 🔑 Admin Access

**Default Credentials:**
- Username: `admin`
- Password: `admin123`

⚠️ **Important:** Change these credentials in production!

## 📊 Database Schema

The application uses Prisma with SQLite (easily upgradable to PostgreSQL):

- **Users** - User accounts and profiles
- **Assessments** - AI readiness assessment results
- **LearningPaths** - Learning pathway definitions
- **LearningProgress** - User learning progress tracking
- **ConsultationRequests** - Consultation booking records
- **ReportArchive** - Generated competitive intelligence reports
- **IndustryAnalytics** - Aggregated industry data

## 🌍 Regional Features

### Country Support
25+ countries including:
- United States, Canada
- United Kingdom, Germany, France, Spain, Italy
- Australia, New Zealand, Singapore
- Japan, South Korea, China, India
- United Arab Emirates, Saudi Arabia
- Brazil, Mexico, Argentina
- South Africa
- And more...

### Industry Categories

**Enterprise:**
- Healthcare
- Finance & Banking
- Technology
- Manufacturing
- Retail & E-commerce
- Education
- Government
- Energy & Utilities
- Transportation & Logistics

**SMME (Small, Medium & Micro Enterprises):**
- SMME - Healthcare
- SMME - Finance & Banking
- SMME - Technology
- SMME - Manufacturing
- SMME - Retail & E-commerce
- SMME - Education
- SMME - Professional Services
- SMME - Hospitality & Tourism
- SMME - Construction
- SMME - Agriculture

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="file:./db/custom.db"
```

### Optional: Z.ai Configuration

For AI-powered report generation, create `.z-ai-config`:

```json
{
  "baseUrl": "YOUR_API_BASE_URL",
  "apiKey": "YOUR_API_KEY",
  "chatId": "",
  "userId": ""
}
```

Note: The application works without Z.ai configuration using fallback data generation.

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start development server on port 3000

# Production
npm run build        # Build for production
npm run start        # Start production server

# Database
npm run db:push      # Push schema changes to database
npm run db:generate  # Generate Prisma client
npm run db:migrate   # Run database migrations
npm run db:reset     # Reset database

# Code Quality
npm run lint         # Run ESLint
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Docker

```bash
npm run build
docker build -t ai-transformation-hub .
docker run -p 3000:3000 ai-transformation-hub
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Z.ai** - AI-powered development assistance
- **Kiro** - Code finalization and optimization
- **Shadcn UI** - Beautiful component library
- **Vercel** - Next.js framework and hosting

## 📞 Support

For questions or support, please open an issue on GitHub or contact the development team.

## 🗺️ Roadmap

- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Team collaboration features
- [ ] Integration with popular CRM systems
- [ ] Mobile app (React Native)
- [ ] AI chatbot assistant
- [ ] Video learning content
- [ ] Certification programs

---

**Built with ❤️ using Z.ai and Kiro**
