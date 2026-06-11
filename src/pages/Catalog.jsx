import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase.js';
import ProductCard from '../components/ProductCard.jsx';

const fmt = (n) => '$' + Number(n).toFixed(2);

export default function Catalog() {
  const [products,      setProducts]     = useState([]);
  const [loading,       setLoading]      = useState(true);
  const [filtersOpen,   setFiltersOpen]  = useState(false);
  const [searchParams,  setSearchParams] = useSearchParams();

  const [search,   setSearch]   = useState(searchParams.get('search')   || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'all');
  const [sort,     setSort]     = useState(searchParams.get('sort')     || 'featured');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    if (!supabase) { setLoading(false); return; }
    supabase.from('products').select('*').then(({ data }) => {
      setProducts(data || []);
      setLoading(false);
    });
  }, []);

  const categories = useMemo(
    () => ['all', ...Array.from(new Set(products.map((p) => p.category)))],
    [products]
  );

  const filtered = useMemo(() => {
    let list = [...products];
    if (search)             list = list.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      (p.description || '').toLowerCase().includes(search.toLowerCase())
    );
    if (category !== 'all') list = list.filter((p) => p.category === category);
    if (minPrice)           list = list.filter((p) => (p.sale_price ?? p.price) >= Number(minPrice));
    if (maxPrice)           list = list.filter((p) => (p.sale_price ?? p.price) <= Number(maxPrice));

    const sorters = {
      featured:    (a, b) => b.is_featured - a.is_featured || b.rating - a.rating,
      newest:      (a, b) => new Date(b.created_at) - new Date(a.created_at),
      'price-asc': (a, b) => (a.sale_price ?? a.price) - (b.sale_price ?? b.price),
      'price-desc':(a, b) => (b.sale_price ?? b.price) - (a.sale_price ?? a.price),
      rating:      (a, b) => b.rating - a.rating,
      sale:        (a, b) => (b.sale_price ? 1 : 0) - (a.sale_price ? 1 : 0),
    };
    list.sort(sorters[sort] || sorters.featured);
    return list;
  }, [products, search, category, sort, minPrice, maxPrice]);

  const reset = () => {
    setSearch(''); setCategory('all'); setSort('featured');
    setMinPrice(''); setMaxPrice('');
    setSearchParams({});
  };

  const FilterPanel = () => (
    <div className="flex flex-col gap-6">
      {/* Search */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 block">Search</label>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">search</span>
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products…"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-sm focus:border-indigo focus:ring-1 focus:ring-indigo focus:outline-none" />
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 block">Category</label>
        <div className="flex flex-col gap-1">
          {categories.map((cat) => {
            const count = cat === 'all' ? products.length : products.filter((p) => p.category === cat).length;
            const active = category === cat;
            return (
              <button key={cat} onClick={() => setCategory(cat)}
                className={`flex justify-between items-center text-left px-3 py-2 rounded-xl text-sm transition-colors ${
                  active ? 'bg-indigo text-white font-semibold' : 'text-slate-700 hover:bg-slate-50'
                }`}>
                <span>{cat === 'all' ? 'All Products' : cat}</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${active ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 block">Price Range</label>
        <div className="flex items-center gap-2">
          <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="Min"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:border-indigo focus:ring-1 focus:ring-indigo focus:outline-none" />
          <span className="text-slate-400 font-bold">—</span>
          <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="Max"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:border-indigo focus:ring-1 focus:ring-indigo focus:outline-none" />
        </div>
      </div>

      <button onClick={reset}
        className="w-full text-sm font-semibold text-indigo border border-indigo/30 rounded-xl py-2.5 hover:bg-indigo/5 transition-colors">
        Reset Filters
      </button>
    </div>
  );

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-12 w-full">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-navy">Catalog</h1>
          <p className="text-slate-500 text-sm mt-1">
            {loading ? 'Loading…' : `${filtered.length} of ${products.length} products`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Mobile filter toggle */}
          <button
            onClick={() => setFiltersOpen(true)}
            className="lg:hidden flex items-center gap-2 bg-white border border-slate-200 text-slate-700 text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">tune</span>
            Filters
          </button>
          <select value={sort} onChange={(e) => setSort(e.target.value)}
            className="bg-white border border-slate-200 rounded-xl py-2.5 px-3 text-sm font-medium focus:border-indigo focus:outline-none shadow-sm">
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating">Top Rated</option>
            <option value="sale">On Sale</option>
          </select>
        </div>
      </div>

      <div className="flex gap-8">

        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-card p-6 sticky top-24">
            <FilterPanel />
          </div>
        </aside>

        {/* Mobile Filter Drawer */}
        {filtersOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div className="absolute inset-0 bg-black/40" onClick={() => setFiltersOpen(false)} />
            <div className="relative ml-auto w-80 max-w-full bg-white h-full shadow-xl flex flex-col">
              <div className="flex items-center justify-between p-5 border-b border-slate-100">
                <h2 className="font-bold text-navy">Filters</h2>
                <button onClick={() => setFiltersOpen(false)} className="text-slate-400 hover:text-slate-700">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-5">
                <FilterPanel />
              </div>
              <div className="p-5 border-t border-slate-100">
                <button onClick={() => setFiltersOpen(false)}
                  className="w-full bg-indigo text-white font-bold py-3 rounded-xl hover:bg-indigo/90 transition-colors text-sm">
                  Show {filtered.length} Results
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Product Grid */}
        <section className="flex-1 min-w-0">
          {!supabase ? (
            <div className="text-center py-24 bg-white rounded-2xl shadow-card">
              <span className="material-symbols-outlined text-6xl text-slate-300">cloud_off</span>
              <p className="text-slate-500 mt-4">Connect Supabase to load products.</p>
            </div>
          ) : loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
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
          ) : filtered.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-2xl shadow-card">
              <span className="material-symbols-outlined text-6xl text-slate-300">inventory_2</span>
              <p className="text-navy font-bold mt-4">No products found</p>
              <p className="text-slate-400 text-sm mt-1">Try adjusting your filters.</p>
              <button onClick={reset} className="mt-4 text-sm font-semibold text-indigo hover:underline">
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
