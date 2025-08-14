import { useWriteContract } from "wagmi";
import { CONSTANTS } from "@/web3/config/constants";
import abi from "@/web3/ABIs/ocicat-nft-contract-abi.json";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

const CONTRACT_ADDRESS = CONSTANTS.OCICAT_NFT_CONTRACT_ADDRESS;

export function useBuyNFT() {
  const { writeContract, isPending } = useWriteContract();
  const queryClient = useQueryClient();

  const buy = async (payableAmount: bigint) => {
    const toastId = toast.loading("Minting in progress...");

    return new Promise((resolve, reject) => {
      writeContract(
        {
          address: CONTRACT_ADDRESS as `0x${string}`,
          abi,
          functionName: "buy",
          value: payableAmount,
        },
        {
          onSuccess: (txHash: `0x${string}`) => {
            toast.success("Mint successful!", {
              id: toastId,
              duration: 4000,
            });
            queryClient.invalidateQueries();
            resolve(txHash);
          },
          onError: (error) => {
            toast.error(`${(error as Error)?.message || "Minting failed"}`, {
              id: toastId,
              icon: "❌",
              duration: 4000,
            });
            reject(error);
          },
        }
      );
    });
  };

  return {
    buy,
    isPending, // 👈 Now exposed for use in your UI
  };
}
