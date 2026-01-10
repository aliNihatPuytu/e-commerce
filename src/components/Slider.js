export default function Slider({ post }) {
  return (
    <div className="flex flex-col w-80 shadow-sm">
      <img src={post.image} alt={post.title} className="w-full h-64 object-cover rounded-t" />
      <div className="p-5">
        <h4 className="text-[#252B42] font-semibold text-lg mb-2">{post.title}</h4>
        <p className="text-[#737373] text-sm">{post.desc}</p>
      </div>
    </div>
  );
}
