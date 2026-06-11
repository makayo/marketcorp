import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch]     = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === 'Enter' && search.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(search.trim())}`);
      setMenuOpen(false);
    }
  };

  const navLink = ({ isActive }) =>
    `text-sm font-semibold transition-colors duration-150 pb-0.5 border-b-2 ${
      isActive ? 'text-indigo border-indigo' : 'text-slate-600 border-transparent hover:text-indigo'
    }`;

  return (
    <header className="bg-white sticky top-0 z-50 shadow-nav">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Brand */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xl md:text-2xl font-black tracking-tight text-navy">
              Market<span className="text-indigo">Corp</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink to="/"        className={navLink} end>Home</NavLink>
            <NavLink to="/catalog" className={navLink}>Catalog</NavLink>
            <NavLink to="/catalog?sort=sale"   className="text-sm font-semibold text-slate-600 hover:text-indigo transition-colors">Deals</NavLink>
            <NavLink to="/catalog?sort=newest" className="text-sm font-semibold text-slate-600 hover:text-indigo transition-colors">New Arrivals</NavLink>
          </nav>

          {/* Desktop Search */}
          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
                search
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleSearch}
                placeholder="Search products..."
                className="bg-slate-100 text-sm rounded-full py-2 pl-9 pr-4 w-56 lg:w-72 focus:bg-white focus:ring-2 focus:ring-indigo/30 focus:outline-none transition-all placeholder:text-slate-400"
              />
            </div>
            <Link
              to="/catalog"
              className="bg-indigo text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-indigo/90 transition-colors"
            >
              Shop Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined">
              {menuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 pb-6 pt-4 flex flex-col gap-4">
          {/* Mobile Search */}
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">search</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search products..."
              className="w-full bg-slate-100 text-sm rounded-full py-2.5 pl-9 pr-4 focus:bg-white focus:ring-2 focus:ring-indigo/30 focus:outline-none transition-all"
            />
          </div>

          {/* Mobile Links */}
          <nav className="flex flex-col gap-1">
            {[
              { to: '/',                    label: 'Home',        end: true },
              { to: '/catalog',             label: 'Catalog' },
              { to: '/catalog?sort=sale',   label: 'Deals' },
              { to: '/catalog?sort=newest', label: 'New Arrivals' },
            ].map(({ to, label, end }) => (
              <NavLink
                key={label}
                to={to}
                end={end}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    isActive ? 'bg-indigo/10 text-indigo' : 'text-slate-700 hover:bg-slate-50'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <Link
            to="/catalog"
            onClick={() => setMenuOpen(false)}
            className="bg-indigo text-white text-sm font-semibold px-5 py-3 rounded-xl text-center hover:bg-indigo/90 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      )}
    </header>
  );
}
