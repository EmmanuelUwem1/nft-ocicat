
function ClaimButton() {
  return (
    <div className="w-full mt-5">
      <button className="group relative w-full bg-[#d64545] text-[#081017] font-semibold font-orbitron py-3 rounded flex justify-center items-center overflow-hidden cursor-pointer transition-class">
        {/* Animated Layer */}
        <span className="absolute inset-0 before:absolute before:left-[-100%] before:top-0 before:h-full before:w-full before:bg-[#b0b6c02d] before:transition-all before:duration-300 group-hover:before:left-0 before:z-[1] rounded" />

        {/* Button Label */}
        <span className="z-[2]">CLAIM</span>
      </button>
    </div>
  );
}

export default ClaimButton;
