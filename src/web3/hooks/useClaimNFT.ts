import { useWriteContract } from "wagmi";
import { CONSTANTS } from "@/web3/config/constants";
import abi from "@/web3/ABIs/ocicat-nft-contract-abi.json";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

const CONTRACT_ADDRESS = CONSTANTS.OCICAT_NFT_CONTRACT_ADDRESS;

export function useClaimNFT() {
  const { writeContract, isPending, isError, error } = useWriteContract();
  const queryClient = useQueryClient();

  const claim = async () => {
    const toastId = toast.loading("Claiming NFT...");

    return new Promise((resolve, reject) => {
      writeContract(
        {
          address: CONTRACT_ADDRESS as `0x${string}`,
          abi,
          functionName: "claim",
        },
        {
          onSuccess: (txHash: `0x${string}`) => {
            toast.success("Claim successful 🎉", {
              id: toastId,
              duration: 4000,
            });
            queryClient.invalidateQueries();
            resolve(txHash);
          },
          onError: (err) => {
            toast.error(`${(err as Error)?.message || "Claim failed"}`, {
              id: toastId,
              icon: "❌",
              duration: 4000,
            });
            reject(err);
          },
        }
      );
    });
  };

  return {
    claim,
    cIPending:isPending,
    isError,
    error,
  };
}
