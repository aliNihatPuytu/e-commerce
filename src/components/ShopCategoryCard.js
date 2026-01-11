export default function ShopCategoryCard({ image, title, className = "", onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative w-full overflow-hidden bg-[#F6F6F6] ${className}`}
      aria-label={title}
    >
      <img src={image} alt={title} className="h-full w-full object-cover" />
    </button>
  );
}
