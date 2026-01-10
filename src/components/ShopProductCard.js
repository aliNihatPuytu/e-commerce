export default function ShopProductCard({ product }) {
  return (
    <div className="flex w-full sm:w-1/2 lg:w-1/4">
      <div className="flex w-full flex-col items-center">
        <div className="flex w-full">
          <div className="flex w-full h-72 md:h-64 bg-slate-100">
            <img className="flex w-full h-full object-cover" src={product.imageSrc} alt={product.title} />
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-2 py-6">
          <div className="text-sm font-bold text-slate-900 text-center">{product.title}</div>
          <div className="text-xs font-bold text-slate-500 text-center">{product.department}</div>

          <div className="flex items-center gap-2">
            <div className="text-sm font-bold text-slate-300 line-through">{product.oldPrice}</div>
            <div className="text-sm font-bold text-emerald-600">{product.price}</div>
          </div>

          <div className="flex items-center gap-1.5">
            {product.colors.map((c, idx) => (
              <div key={idx} className="w-4 h-4 rounded-full" style={{ backgroundColor: c }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
