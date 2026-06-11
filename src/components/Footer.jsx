import { Link } from 'react-router-dom';

const links = {
  Shop:    [{ label: 'Catalog',      to: '/catalog' },
            { label: 'Deals',        to: '/catalog?sort=sale' },
            { label: 'New Arrivals', to: '/catalog?sort=newest' },
            { label: 'Top Rated',    to: '/catalog?sort=rating' }],
  Company: [{ label: 'About Us',      to: '#' },
            { label: 'Careers',       to: '#' },
            { label: 'Press',         to: '#' },
            { label: 'Contact',       to: '#' }],
  Support: [{ label: 'Shipping Info', to: '#' },
            { label: 'Returns',       to: '#' },
            { label: 'FAQ',           to: '#' },
            { label: 'Privacy Policy',to: '#' }],
};

export default function Footer() {
  return (
    <footer className="bg-navy text-white mt-auto">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 py-12 md:py-16">

        {/* Top */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="text-2xl font-black tracking-tight">
              Market<span className="text-amber">Corp</span>
            </Link>
            <p className="mt-3 text-sm text-slate-400 leading-relaxed max-w-xs">
              Premium corporate equipment and tech accessories for high-performance teams.
            </p>
            {/* Socials */}
            <div className="flex gap-3 mt-5">
              {['language', 'group', 'mail'].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-indigo transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">{icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {items.map(({ label, to }) => (
                  <li key={label}>
                    <Link to={to} className="text-sm text-slate-300 hover:text-white transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">© 2026 MarketCorp. All rights reserved.</p>
          <div className="flex gap-4">
            {['Privacy Policy', 'Terms of Service'].map((t) => (
              <a key={t} href="#" className="text-xs text-slate-500 hover:text-white transition-colors">{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
