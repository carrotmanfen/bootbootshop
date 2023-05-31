import { useContractRead} from "wagmi";
import ShopABI from "../abis/Shop.json"
import addressContract from "../../contracts/addressContract";

const useBalance = (address:string)=>{
    const {data, isLoading, isError, isSuccess} = useContractRead({
        address:addressContract,
        abi: ShopABI,
        functionName:"balanceOf",
        args:[address]
    });
      
    return{data, isLoading, isError, isSuccess};
};
export default useBalance;