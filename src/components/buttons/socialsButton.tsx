import Image from "next/image";

interface SocialButtonProps {
    href: string
    image: string
    text:string
}
function SocialButton({href,image,text}:SocialButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="transition-class px-2 py-3.5 border-2 border-gray-700 flex gap-2 items-center justify-center relative overflow-hidden group"
    >
      <Image
        src={image}
        alt={text}
        width={24}
        height={24}
        className=""
      />
      <span className="text-[#3f5bfc] font-semibold text-base">{text}</span>
      <span className="absolute inset-0 before:absolute before:right-[100%] before:top-0 before:h-full before:w-full before:bg-[#b0b6c036] before:transition-all before:duration-300 group-hover:before:right-0 before:z-[-1] rounded cursor-pointer" />
    </a>
  );
}

export default SocialButton