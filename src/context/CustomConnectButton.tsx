import { modal } from "@/context/AppKitProvider";

export default function CustomConnectButton() {
  return (
    <button
      onClick={() => modal.open()}
      className="px-4 py-2 bg-[#b0b6c06f] text-white rounded font-orbitron flex items-center gap-2 hover:bg-[#b0b6c06f] transition cursor-pointer"
    >
      <img src="/connect_wallet.svg" alt="Wallet" className="w-5 h-5" />
      Connect
    </button>
  );
}
