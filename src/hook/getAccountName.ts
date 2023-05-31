import { useContractRead} from "wagmi";
import ShopABI from "../abis/Shop.json"

const getAccountName = (address:string)=>{
    const {data, isLoading, isError, isSuccess} = useContractRead({
        address:"0x31f31e8440C202A49CD77Cf2bD10e37fE01b1FA5",
        abi: ShopABI,
        functionName:"getAccountName",
        args:[address]
    });
      
    return{data, isLoading, isError, isSuccess};
};
export default getAccountName;