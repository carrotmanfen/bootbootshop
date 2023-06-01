import { useContractWrite,usePrepareContractWrite } from "wagmi";
import ShopABI from "../abis/Shop.json"
import addressContract from "../../contracts/addressContract";
import { parseEther } from "viem";

const useWithdraw = (amount)=>{
    const _amount = String(Number(amount)*Math.pow(10,18));
    const {config} = usePrepareContractWrite({
        address:addressContract,
        abi: ShopABI,
        functionName:"withdraw",
        args:[parseEther(_amount, 18)]
       
    });

    const {data, isLoading, isError, write} = useContractWrite(config);
    return {data, isLoading, isError, write};

};
export default useWithdraw;