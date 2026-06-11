import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase.js';
import ProductCard from '../components/ProductCard.jsx';

const CATEGORIES = [
  { label: 'Seating',     icon: 'chair',          color: 'bg-blue-50   text-blue-600' },
  { label: 'Tech',        icon: 'devices',         color: 'bg-purple-50 text-purple-600' },
  { label: 'Audio',       icon: 'headphones',      color: 'bg-amber-50  text-amber-600' },
  { label: 'Lighting',    icon: 'light_mode',      color: 'bg-yellow-50 text-yellow-600' },
  { label: 'Accessories', icon: 'business_center', color: 'bg-green-50  text-green-600' },
];

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    if (!supabase) { setLoading(false); return; }
    supabase
      .from('products')
      .select('*')
      .eq('is_featured', true)
      .limit(4)
      .then(({ data }) => { setFeatured(data || []); setLoading(false); });
  }, []);

  return (
    <div className="flex flex-col">

      {/* ── HERO ── */}
      <section className="relative bg-navy overflow-hidden">
        {/* Background image */}
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCC1AonslET1XCy4vHcL9S6U4Lmp8E9ZdppeaDH1pcUMuuPUSctp2vOHia9zoI_RA9nlqTbmrNHieD-yaw0lynTKhLeEBYaKXr4dVIEXJzplIy0GzMT3PFO5s1n1rbQfICMkPiXsmjNhzt5qxPBrUsiboV0oQA-Vrcvm8loJIHXxfDSnoOKqRY0QQGdu21PeA0hgs6YQM30hEpAdyHk9_hZGIs61w00VVz_-FEY8x3PXq_YSWw9MhcBkKn6yg59ppxpoVYxBpwcBQNB"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-transparent" />

        {/* Content */}
        <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-24 lg:py-32">
          <div className="max-w-xl">
            <span className="inline-block text-amber text-xs font-bold uppercase tracking-widest mb-4">
              Professional Grade
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-tight mb-5">
              Elevate Your<br />
              <span className="text-amber">Corporate</span> Workflow.
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
              Industry-standard tools, premium seating, and tech accessories designed for high-performance teams.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/catalog"
                className="bg-indigo text-white font-bold px-6 py-3 rounded-full hover:bg-indigo/90 transition-colors text-sm sm:text-base"
              >
                Shop Catalog
              </Link>
              <Link
                to="/catalog?sort=sale"
                className="bg-white/10 backdrop-blur border border-white/20 text-white font-semibold px-6 py-3 rounded-full hover:bg-white/20 transition-colors text-sm sm:text-base"
              >
                View Deals
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mt-10 pt-10 border-t border-white/10">
              {[['500+', 'Products'], ['4.8★', 'Avg Rating'], ['Free', 'Shipping $100+']].map(([val, label]) => (
                <div key={label}>
                  <div className="text-xl font-black text-amber">{val}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORY PILLS ── */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 py-5">
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-1 scrollbar-hide">
            <Link
              to="/catalog"
              className="flex-shrink-0 flex items-center gap-2 bg-indigo text-white text-xs font-bold px-4 py-2 rounded-full"
            >
              <span className="material-symbols-outlined text-[16px]">apps</span>
              All
            </Link>
            {CATEGORIES.map(({ label, icon, color }) => (
              <Link
                key={label}
                to={`/catalog?category=${label}`}
                className={`flex-shrink-0 flex items-center gap-2 ${color} bg-opacity-80 text-xs font-bold px-4 py-2 rounded-full hover:opacity-80 transition-opacity`}
              >
                <span className="material-symbols-outlined text-[16px]">{icon}</span>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROMO CARDS ── */}
      <section className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-14 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">

          {/* Card 1 — Flash Sale */}
          <div className="relative bg-gradient-to-br from-indigo to-purple-700 rounded-2xl p-6 sm:p-8 text-white overflow-hidden">
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full" />
            <div className="absolute -right-2 bottom-4 w-20 h-20 bg-white/5 rounded-full" />
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-200">Flash Sale</span>
            <h2 className="text-2xl sm:text-3xl font-black mt-2 mb-1">Up to 40% Off</h2>
            <p className="text-indigo-200 text-sm mb-6">Limited time on premium audio & seating.</p>
            <Link to="/catalog?sort=sale"
              className="inline-flex items-center gap-2 bg-white text-indigo font-bold text-sm px-5 py-2.5 rounded-full hover:bg-amber hover:text-navy transition-colors">
              Shop Deals <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>

          {/* Card 2 — New Arrivals */}
          <div className="relative rounded-2xl overflow-hidden group cursor-pointer min-h-[200px]">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBw1vdPVHzpyxdk_7G0-YD9DbFy8m4nKU2SHLjGvIEI7Fa5uxPHhofOtb4icvkdXi3jhuEZ8sn8vyOsOwOVp1osZiDYJewBXagRnImcfyA_58Z5dMpydiUQ6-WwIrLQoyDmHv_kAQ1xoQXuirGtKuCUNNCYv6wxcrHzPzmETVdE8NJDQ9tTlUHFFli3X73i3wpSHYE9FbyRGrQfzNgwUSbubBuF07iKRFRvcIq5n3uagjucmhVtTLxofgRO-MvOopvMiPQ-rc6YJTvM"
              alt="New Arrivals"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent" />
            <Link to="/catalog?sort=newest" className="absolute inset-0 flex flex-col justify-end p-6">
              <span className="text-amber text-xs font-bold uppercase tracking-widest">Just Added</span>
              <h2 className="text-white text-xl sm:text-2xl font-black mt-1">Executive Collection</h2>
              <span className="mt-3 inline-flex items-center gap-1 text-white text-sm font-semibold">
                Explore <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </span>
            </Link>
          </div>

          {/* Card 3 — Free Shipping */}
          <div className="bg-amber rounded-2xl p-6 sm:p-8 flex flex-col justify-between sm:col-span-2 lg:col-span-1">
            <div>
              <span className="material-symbols-outlined text-4xl text-amberD">local_shipping</span>
              <h2 className="text-2xl font-black text-navy mt-3">Free Shipping</h2>
              <p className="text-navy/70 text-sm mt-1">On all orders over $100. No code needed.</p>
            </div>
            <Link
              to="/catalog"
              className="mt-6 inline-flex items-center gap-2 bg-navy text-white font-bold text-sm px-5 py-2.5 rounded-full hover:bg-indigo transition-colors w-fit"
            >
              Shop Now <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 pb-14 sm:pb-20 w-full">
        <div className="flex items-end justify-between mb-7">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-navy">Trending Equipment</h2>
            <p className="text-slate-500 text-sm mt-1">High-performance gear for high-performance teams.</p>
          </div>
          <Link to="/catalog" className="hidden sm:flex items-center gap-1 text-sm font-bold text-indigo hover:underline">
            View All <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>

        {!supabase ? (
          <div className="text-center py-20 bg-white rounded-2xl">
            <span className="material-symbols-outlined text-6xl text-slate-300">cloud_off</span>
            <p className="text-slate-500 mt-4 text-sm">Connect Supabase to load products.</p>
          </div>
        ) : loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
                <div className="aspect-square bg-slate-100" />
                <div className="p-4 space-y-2">
                  <div className="h-3 bg-slate-100 rounded w-1/3" />
                  <div className="h-4 bg-slate-100 rounded w-3/4" />
                  <div className="h-3 bg-slate-100 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}

        <div className="sm:hidden text-center mt-6">
          <Link to="/catalog" className="inline-flex items-center gap-1 text-sm font-bold text-indigo">
            View All Products <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section className="bg-white border-t border-slate-100">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: 'verified',        title: 'Quality Guaranteed',  sub: 'Every product vetted' },
              { icon: 'local_shipping',  title: 'Free Shipping',       sub: 'Orders over $100' },
              { icon: 'autorenew',       title: 'Easy Returns',        sub: '30-day return policy' },
              { icon: 'support_agent',   title: '24/7 Support',        sub: 'Always here to help' },
            ].map(({ icon, title, sub }) => (
              <div key={title} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-indigo/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-indigo text-[22px]">{icon}</span>
                </div>
                <p className="font-bold text-navy text-sm">{title}</p>
                <p className="text-slate-400 text-xs">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
