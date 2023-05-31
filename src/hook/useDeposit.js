import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import ShopABI from '../abis/Shop.json';
import { parseEther } from 'viem';
import addressContract from "../../contracts/addressContract";

const useDeposit = (amount) => {
  const { config } = usePrepareContractWrite({
    address: addressContract,
    abi: ShopABI,
    functionName: 'deposit',
    value: parseEther(amount)
  });

  const { data, isLoading, isError, write } = useContractWrite(config);
  return { data, isLoading, isError, write };
};

export default useDeposit;