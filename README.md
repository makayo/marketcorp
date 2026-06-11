# MarketCorp Master System

A robust, standalone full-stack e-commerce architecture engineered with a decoupled frontend interface and a cloud-hosted relational database backend. This repository serves as the master foundational engine for rapid deployment and schema integration.

## 🛠️ Tech Stack & Architecture

* **Frontend Framework:** React 19 (via Vite for optimized bundling and HMR)
* **Styling Engine:** Tailwind CSS v3 (Utility-first styling pipeline)
* **Database & Auth Layer:** Supabase / PostgreSQL (Relational persistence with Row Level Security)
* **API & Lifecycle Testing:** Postman (Comprehensive endpoint verification collections)

---

## 📂 Project Structure

```text
marketcorp/
├── ecommerce-app/          # Core React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI architecture (Navbar, Footer, ProductCard)
│   │   ├── lib/            # Third-party initializations (supabase.js client)
│   │   └── pages/          # View layers (Home, Catalog, ProductDetail)
│   └── .env.example        # Environment variable schema template
├── postman/                # Automated API validation suites
└── supabase_schema.sql     # Database relational layout & table definitions
