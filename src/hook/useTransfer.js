import { useContractWrite,usePrepareContractWrite } from "wagmi";
import ShopABI from "../abis/Shop.json"
import { parseEther } from "viem";
import addressContract from "../../contracts/addressContract";

const useTransfer = (_to, amount)=>{
    const {config} = usePrepareContractWrite({
        address: addressContract,
        abi: ShopABI,
        functionName:"transferTo",
        args:[_to,parseEther(amount, 18)],
    });

    const {data, isLoading, isError, write} = useContractWrite(config);
    return {data, isLoading, isError, write};

};
export default useTransfer;