import { useContractWrite,usePrepareContractWrite } from "wagmi";
import ShopABI from "../abis/Shop.json"

const useTransfer = (address:string , amount:number)=>{
    const {config} = usePrepareContractWrite({
        address: "0x8A0EE719321D68b182979a82d497Ec63A0fBD863",
        abi: ShopABI,
        functionName:"transferTo",
        args:[address,amount],
    });

    const {data, isLoading, isError, write} = useContractWrite(config);
    return {data, isLoading, isError, write};

};
export default useTransfer;