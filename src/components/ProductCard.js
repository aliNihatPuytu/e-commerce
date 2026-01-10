const Dot = ({ className }) => <span className={`h-4 w-4 rounded-full ${className}`} />;

export default function ProductCard({ img, title, dept, price, sale }) {
  return (
    <div className="flex w-full flex-col items-center bg-white">
      <div className="w-full bg-[#F6F6F6]">
        <div className="aspect-3/4 w-full overflow-hidden">
          <img src={img} alt={title} className="h-full w-full object-cover" />
        </div>
      </div>

      <div className="flex w-full flex-col items-center gap-2 px-2 pb-6 pt-6 text-center">
        <h5 className="text-sm font-bold text-[#252B42]">{title}</h5>
        <p className="text-xs font-bold text-[#737373]">{dept}</p>

        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-[#BDBDBD]">{price}</span>
          <span className="text-sm font-bold text-[#23856D]">{sale}</span>
        </div>

        <div className="flex items-center gap-2">
          <Dot className="bg-[#23A6F0]" />
          <Dot className="bg-[#23856D]" />
          <Dot className="bg-[#E77C40]" />
          <Dot className="bg-[#252B42]" />
        </div>
      </div>
    </div>
  );
}
