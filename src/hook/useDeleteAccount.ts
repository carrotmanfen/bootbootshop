import { useContractWrite,usePrepareContractWrite } from "wagmi";
import ShopABI from "../abis/Shop.json"
import addressContract from "../../contracts/addressContract";

const useDeleteAccount = ()=>{
    const {config} = usePrepareContractWrite({
        address: addressContract,
        abi: ShopABI,
        functionName:"deleteAccount",
    
    });

    const {data, isLoading, isError, write} = useContractWrite(config);
    return {data, isLoading, isError, write};

};
export default useDeleteAccount;