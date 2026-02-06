# Dearborn Audio Effects Website

A lightweight Next.js website for Dearborn Audio Effects featuring static pages and a repair request form.

## Features

- **About Page**: Information about Dearborn Plys and Dearborn FX
- **Repairs Page**: Electronics repair services with a contact form
- **Design Services Page**: Information about custom audio design services
- **Survey Page**: Redirects to an external survey form

## Local Setup

### Prerequisites

- Node.js 17+ or npm
- PostgreSQL database (only required for repair form functionality)

### Installation

1. Clone the repository
2. Navigate to the storefront directory:
   ```bash
   cd storefront/
   ```
3. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

### Configuration

Create a `.env.local` file in the storefront directory with the following environment variables (only needed for repair form):

```bash
# PostgreSQL Database Configuration (for repair form)
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
# OR use individual connection parameters:
# POSTGRES_HOST=localhost
# POSTGRES_PORT=5432
# POSTGRES_DATABASE=your_database_name
# POSTGRES_USER=your_username
# POSTGRES_PASSWORD=your_password

# Discord Webhook (optional - for repair request notifications)
DISCORD_WEBHOOK_URL=your_discord_webhook_url
```

### Running the Development Server

```bash
npm run dev
# or
pnpm dev
```

The site will be available at [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm start
# or
pnpm build
pnpm start
```

## Database Setup (for Repair Form)

The repair form requires a PostgreSQL database. The table will be automatically created when the first repair request is submitted. Alternatively, you can create it manually:

```sql
CREATE TABLE repair_requests (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(254) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  contact_method VARCHAR(10) NOT NULL,
  item VARCHAR(500) NOT NULL,
  issue TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Project Structure

```
storefront/
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── (main)/       # Main layout group
│   │   │   ├── design/   # Design services page
│   │   │   ├── repairs/  # Repairs page with form
│   │   │   ├── survey/   # Survey redirect page
│   │   │   └── page.tsx  # About/home page
│   │   └── layout.tsx    # Root layout
│   ├── helpers/          # Server-side helper functions
│   ├── modules/          # Reusable UI components
│   └── types/            # TypeScript type definitions
└── public/               # Static assets
```

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL (for repair form only)
- **UI Components**: Headless UI, React Icons

## License

See LICENSE file for details.
