import { useContractRead} from "wagmi";
import ShopABI from "../abis/Shop.json"

const getAccountName = (address:string)=>{
    const {data, isLoading, isError, isSuccess} = useContractRead({
        address:"0x8A0EE719321D68b182979a82d497Ec63A0fBD863",
        abi: ShopABI,
        functionName:"getAccountName",
        args:[address]
    });
      
    return{data, isLoading, isError, isSuccess};
};
export default getAccountName;