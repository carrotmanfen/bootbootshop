import { useContractWrite,usePrepareContractWrite } from "wagmi";
import ShopABI from "../abis/Shop.json"
import ethers, { BigNumber, utils } from 'ethers'
import { parseEther } from "ethers/lib/utils";

const useDeposit = ( amount:Number)=> {
  const { config } = usePrepareContractWrite({
    address: '0x31f31e8440C202A49CD77Cf2bD10e37fE01b1FA5',
    abi: ShopABI,
    functionName: 'deposit',
    args:[amount],
    // value: parseEther((amount)),
    value: ethers.utils.parseEther.prototype(amount.toString()),
  });
  const {data, isLoading, isError, write} = useContractWrite(config);
  return {data, isLoading, isError, write};

};
export default useDeposit;
