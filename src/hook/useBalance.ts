import { useContractRead} from "wagmi";
import ShopABI from "../abis/Shop.json"

const useBalance = (address:string)=>{
    const {data, isLoading, isError, isSuccess} = useContractRead({
        address:"0x272dDd25b9DEc90F52B40a4B7a27689c2d8667f6",
        abi: ShopABI,
        functionName:"balanceOf",
        args:[address]
    });
      
    return{data, isLoading, isError, isSuccess};
};
export default useBalance;