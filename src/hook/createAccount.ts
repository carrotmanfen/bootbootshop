import { useContractWrite,usePrepareContractWrite } from "wagmi";
import ShopABI from "../abis/Shop.json"

const createAccount = (name:string )=>{
    const {config} = usePrepareContractWrite({
        address: "0x8A0EE719321D68b182979a82d497Ec63A0fBD863",
        abi: ShopABI,
        functionName:"createAccount",
        args:[name],
    });

    const {data, isLoading, isError, write} = useContractWrite(config);
    return {data, isLoading, isError, write};

};
export default createAccount;