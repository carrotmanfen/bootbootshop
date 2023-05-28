import { useContractRead} from "wagmi";
import ShopABI from "../abis/Shop.json"

const useBalance = (address:string)=>{
    const {data, isLoading, isError, isSuccess} = useContractRead({
        address:"0x48d8B0F6a2D05E8E5f96852bb8552E5755dA1236",
        abi: ShopABI,
        functionName:"balanceOf",
        args:[address]
    });
      
    return{data, isLoading, isError, isSuccess};
};
export default useBalance;