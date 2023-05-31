import { useContractRead} from "wagmi";
import ShopABI from "../abis/Shop.json"
import addressContract from "../../contracts/addressContract";

const getAccountName = (address:string)=>{
    const {data, isLoading, isError, isSuccess} = useContractRead({
        address:addressContract,
        abi: ShopABI,
        functionName:"getAccountName",
        args:[address]
    });
      
    return{data, isLoading, isError, isSuccess};
};
export default getAccountName;