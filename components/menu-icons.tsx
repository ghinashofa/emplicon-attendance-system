export const IconWrapper = ({ src, alt }: { src: string; alt: string }) => (
  <div className="w-24 h-24 border border-[#E9EAEB] rounded-xl flex items-center justify-center shadow-[0px_1.14px_2.29px_rgba(10,13,18,0.05)] bg-white">
    <img
      src={src}
      alt={alt}
      className="w-14 h-14 object-contain"
    />
  </div>
);
