import { useWriteContract } from "wagmi";
import { CONSTANTS } from "@/web3/config/constants";
import abi from "@/web3/ABIs/ocicat-nft-contract-abi.json";

const CONTRACT_ADDRESS = CONSTANTS.OCICAT_NFT_CONTRACT_ADDRESS;

export function useBuyNFT() {
  const { writeContract, isPending, isError, error } = useWriteContract();

  const buy = (payableAmount: bigint) => {
    writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi,
      functionName: "buy",
      value: payableAmount,
    });
  };

  return {
    buy,
    isPending,
    isError,
    error,
  };
}
