import { useContractWrite,usePrepareContractWrite } from "wagmi";
import ShopABI from "../abis/Shop.json"
import addressContract from "../../contracts/addressContract";

const useWithdraw = ()=>{
    const {config} = usePrepareContractWrite({
        address:addressContract,
        abi: ShopABI,
        functionName:"withdraw",
       
    });

    const {data, isLoading, isError, write} = useContractWrite(config);
    return {data, isLoading, isError, write};

};
export default useWithdraw;