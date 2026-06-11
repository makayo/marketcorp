# MarketCorp Master System

A robust, standalone full-stack e-commerce architecture engineered with a decoupled frontend interface and a cloud-hosted relational database backend. This repository serves as the master foundational engine for rapid deployment and schema integration.

## 🛠️ Tech Stack & Architecture

- **Frontend Framework:** React 19 (via Vite for optimized bundling and HMR)
- **Styling Engine:** Tailwind CSS v3 (Utility-first styling pipeline)
- **Database & Auth Layer:** Supabase / PostgreSQL (Relational persistence with Row Level Security)
- **API & Lifecycle Testing:** Postman (Comprehensive endpoint verification collections)

---

## 📂 Project Structure

marketcorp/  
├── ecommerce-app/          Core React frontend application  
│   ├── src/  
│   │   ├── components/     Reusable UI architecture (Navbar, Footer, ProductCard)  
│   │   ├── lib/            Third-party initializations (supabase.js client)  
│   │   └── pages/          View layers (Home, Catalog, ProductDetail)  
│   └── .env.example        Environment variable schema template  
├── postman/                Automated API validation suites  
└── supabase_schema.sql     Database relational layout & table definitions  

---

## 🚀 Local Development Setup

### 1. Clone & Install Dependencies
Navigate into the frontend application directory and install the required modules:

cd ecommerce-app  
npm install  

---

### 2. Configure Environment Variables

Create a local `.env` file inside the `ecommerce-app/` directory based on the template:

cp .env.example .env  

Populate the file with your active Supabase connection keys:

VITE_SUPABASE_URL=your_supabase_project_url  
VITE_SUPABASE_ANON_KEY=your_supabase_anon_public_key  

---

### 3. Initialize the Database

Execute the raw PostgreSQL directives located in `supabase_schema.sql` inside your Supabase SQL editor to scaffold the underlying products table structures and data constraints.

---

### 4. Boot the Micro-Server

Spin up the local Vite development instance:

npm run dev  

---

## 🛰️ API Testing Suite

The `postman/` directory contains pre-configured test scripts targeting the system's relational data layer. Import the collection into your Postman workspace to validate baseline REST data streams against live table nodes.
