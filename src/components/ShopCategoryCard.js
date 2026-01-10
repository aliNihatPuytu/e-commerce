export default function ShopCategoryCard({ image, title, items }) {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="h-50 w-full overflow-hidden bg-[#F6F6F6] md:h-56">
        <img src={image} alt={title} className="h-full w-full object-cover" />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <div className="text-base font-bold tracking-[0.2px]">{title}</div>
        <div className="text-sm font-normal tracking-[0.2px]">{items}</div>
      </div>
    </div>
  );
}
