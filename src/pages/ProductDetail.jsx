import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase.js';
import ProductCard from '../components/ProductCard.jsx';

const fmt = (n) => '$' + Number(n).toFixed(2);

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (!supabase) { setLoading(false); return; }

    supabase.from('products').select('*').eq('id', id).single().then(({ data }) => {
      setProduct(data);
      setLoading(false);
      if (data) {
        supabase.from('products').select('*')
          .eq('category', data.category).neq('id', id).limit(4)
          .then(({ data: rel }) => setRelated(rel || []));
      }
    });
  }, [id]);

  if (loading) return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-pulse">
        <div className="aspect-square bg-slate-100 rounded-2xl" />
        <div className="space-y-4 pt-4">
          <div className="h-4 bg-slate-100 rounded w-1/4" />
          <div className="h-8 bg-slate-100 rounded w-3/4" />
          <div className="h-4 bg-slate-100 rounded w-1/2" />
          <div className="h-12 bg-slate-100 rounded w-1/3 mt-8" />
        </div>
      </div>
    </div>
  );

  if (!product) return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 py-20 text-center">
      <span className="material-symbols-outlined text-6xl text-slate-300">search_off</span>
      <p className="text-navy font-bold text-xl mt-4">Product not found</p>
      <Link to="/catalog" className="mt-4 inline-block text-indigo font-semibold hover:underline">
        Back to Catalog
      </Link>
    </div>
  );

  const onSale      = product.sale_price && product.sale_price < product.price;
  const displayPrice = onSale ? product.sale_price : product.price;
  const savings      = onSale ? product.price - product.sale_price : 0;
  const filledStars  = Math.round(product.rating || 0);
  const outOfStock   = product.stock <= 0;
  const lowStock     = !outOfStock && product.stock < 10;

  return (
    <div className="bg-surface">

      {/* Breadcrumb */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 pt-6 pb-2">
        <nav className="flex items-center gap-1 text-xs text-slate-400 flex-wrap">
          <Link to="/" className="hover:text-navy transition-colors">Home</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <Link to="/catalog" className="hover:text-navy transition-colors">Catalog</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-navy font-medium truncate max-w-[200px] sm:max-w-none">{product.name}</span>
        </nav>
      </div>

      {/* Main Product Section */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">

          {/* Image */}
          <div className="w-full">
            <div className="relative aspect-square bg-white rounded-2xl overflow-hidden shadow-card">
              <img src={product.image_url} alt={product.name}
                className="w-full h-full object-cover" />
              {onSale && (
                <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {Math.round((savings / product.price) * 100)}% OFF
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-5">

            {/* Category + Name */}
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-indigo">
                {product.category}
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-navy mt-2 leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex text-amber">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: `'FILL' ${i < filledStars ? 1 : 0}` }}>
                    star
                  </span>
                ))}
              </div>
              <span className="text-sm font-semibold text-navy">{Number(product.rating).toFixed(1)}</span>
              <span className="text-sm text-slate-400">· Customer Rating</span>
            </div>

            {/* Price Card */}
            <div className="bg-white rounded-2xl p-5 shadow-card">
              <div className="flex items-end gap-3 flex-wrap">
                <span className={`text-4xl font-black ${onSale ? 'text-red-500' : 'text-navy'}`}>
                  {fmt(displayPrice)}
                </span>
                {onSale && (
                  <>
                    <span className="text-xl text-slate-400 line-through mb-1">{fmt(product.price)}</span>
                    <span className="text-sm font-bold text-red-500 bg-red-50 px-2 py-1 rounded-lg mb-1">
                      Save {fmt(savings)}
                    </span>
                  </>
                )}
              </div>

              {/* Stock Status */}
              <div className="mt-3 flex items-center gap-2">
                {outOfStock ? (
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-red-500">
                    <span className="material-symbols-outlined text-[16px]">cancel</span> Out of Stock
                  </span>
                ) : lowStock ? (
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-orange-500">
                    <span className="material-symbols-outlined text-[16px]">warning</span>
                    Only {product.stock} left
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-green-600">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    In Stock · {product.stock} units
                  </span>
                )}
              </div>

              {/* Perks */}
              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2">
                {[
                  { icon: 'local_shipping', text: 'Free shipping on orders over $100' },
                  { icon: 'autorenew',      text: '30-day hassle-free returns' },
                  { icon: 'verified',       text: '1-year manufacturer warranty' },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="material-symbols-outlined text-[15px] text-indigo">{icon}</span>
                    {text}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Link
              to="/catalog"
              className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-bold transition-all ${
                outOfStock
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed pointer-events-none'
                  : 'bg-indigo text-white hover:bg-indigo/90 shadow-lg shadow-indigo/20 active:scale-[0.98]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {outOfStock ? 'remove_shopping_cart' : 'storefront'}
              </span>
              {outOfStock ? 'Out of Stock' : 'Browse More in Catalog'}
            </Link>

            {/* Description */}
            <div className="bg-white rounded-2xl p-5 shadow-card">
              <h3 className="font-bold text-navy mb-2 text-sm">About this product</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{product.description}</p>
            </div>

          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 pb-16">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-navy">You Might Also Like</h2>
              <p className="text-slate-400 text-sm mt-1">More from {product.category}</p>
            </div>
            <Link to={`/catalog?category=${product.category}`}
              className="text-sm font-bold text-indigo hover:underline hidden sm:block">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map((r) => <ProductCard key={r.id} product={r} />)}
          </div>
        </div>
      )}
    </div>
  );
}
