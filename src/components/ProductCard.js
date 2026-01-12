import { Link } from "react-router-dom";

const Dot = ({ className }) => <span className={`h-2.5 w-2.5 rounded-full ${className}`} />;

export default function ProductCard({
  to,
  img,
  image,
  title,
  dept,
  department,
  category,
  price,
  sale,
  oldPrice,
  priceOld,
}) {
  const imgSrc = img || image;
  const deptText = dept || department || category;
  const oldText = priceOld || oldPrice || price;
  const saleText = sale;

  const Card = (
    <div className="flex h-[488px] w-full flex-col items-center bg-white">
      <div className="h-[300px] w-full bg-[#F6F6F6]">
        <img src={imgSrc} alt={title} className="h-full w-full object-cover" />
      </div>

      <div className="flex w-full flex-1 flex-col items-center justify-center gap-2 pt-6 text-center">
        <div className="text-base font-bold text-[#252B42]">{title}</div>
        <div className="text-sm font-bold text-[#737373]">{deptText}</div>

        <div className="flex items-center gap-2">
          <div className="text-sm font-bold text-[#BDBDBD]">{oldText}</div>
          <div className="text-sm font-bold text-[#23856D]">{saleText}</div>
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

  if (to) {
    return (
      <Link to={to} aria-label={title} className="block w-full">
        {Card}
      </Link>
    );
  }

  return Card;
}
