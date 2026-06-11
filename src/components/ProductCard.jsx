import { Link } from 'react-router-dom';

const fmt = (n) => '$' + Number(n).toFixed(2);

export default function ProductCard({ product: p }) {
  const onSale       = p.sale_price && p.sale_price < p.price;
  const displayPrice = onSale ? p.sale_price : p.price;
  const outOfStock   = p.stock <= 0;

  return (
    <Link
      to={`/products/${p.id}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-cardH transition-all duration-300 hover:-translate-y-1 flex flex-col"
    >
      {/* Image */}
      <div className="relative w-full aspect-square bg-slate-100 overflow-hidden">
        <img
          src={p.image_url}
          alt={p.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {onSale && (
            <span className="bg-red-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
              SALE
            </span>
          )}
          {outOfStock && (
            <span className="bg-slate-700 text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
              OUT OF STOCK
            </span>
          )}
          {p.is_featured && !outOfStock && (
            <span className="bg-indigo text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
              FEATURED
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col flex-grow p-4 gap-2">
        <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
          {p.category}
        </span>

        <h3 className="text-sm font-semibold text-navy leading-snug line-clamp-2 group-hover:text-indigo transition-colors">
          {p.name}
        </h3>

        {/* Stars */}
        <div className="flex items-center gap-1">
          <div className="flex text-amber text-[13px]">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className="material-symbols-outlined text-[14px]"
                style={{ fontVariationSettings: `'FILL' ${i < Math.round(p.rating) ? 1 : 0}` }}
              >
                star
              </span>
            ))}
          </div>
          <span className="text-[11px] text-slate-400 font-medium">
            {Number(p.rating).toFixed(1)}
          </span>
        </div>

        {/* Price */}
        <div className="mt-auto pt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`text-base font-bold ${onSale ? 'text-red-500' : 'text-navy'}`}>
              {fmt(displayPrice)}
            </span>
            {onSale && (
              <span className="text-xs text-slate-400 line-through">{fmt(p.price)}</span>
            )}
          </div>

          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            outOfStock
              ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
              : 'bg-amber text-navy group-hover:bg-indigo group-hover:text-white'
          }`}>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
