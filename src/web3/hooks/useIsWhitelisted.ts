// web3/hooks/useIsWhitelisted.ts
import { useAccount, useReadContract } from "wagmi";
import { CONSTANTS } from "@/web3/config/constants";
import abi from "@/web3/ABIs/ocicat-nft-contract-abi.json";

const CONTRACT_ADDRESS = CONSTANTS.OCICAT_NFT_CONTRACT_ADDRESS;

export function useIsWhitelisted() {
  const { address, isConnected } = useAccount();

  const result = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi,
    functionName: "whitelist", 
    args: [address!],
    query: {
      enabled: isConnected && !!address,
    },
  });

  return {
    isWhitelisted: result.data as boolean | undefined,
    isLoading: result.isLoading,
    isError: result.isError,
  };
}
