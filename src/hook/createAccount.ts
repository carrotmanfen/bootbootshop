import { useContractWrite,usePrepareContractWrite } from "wagmi";
import ShopABI from "../abis/Shop.json"
import addressContract from "../../contracts/addressContract";

const createAccount = (name:string )=>{
    const {config} = usePrepareContractWrite({
        address: addressContract,
        abi: ShopABI,
        functionName:"createAccount",
        args:[name],
    });

    const {data, isLoading, isError, write} = useContractWrite(config);
    return {data, isLoading, isError, write};

};
export default createAccount;