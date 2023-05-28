import { useContractWrite,usePrepareContractWrite } from "wagmi";
import ShopABI from "../abis/Shop.json"

const useTranfer = (address:string , amount:number)=>{
    const {config} = usePrepareContractWrite({
        address: "0x48d8B0F6a2D05E8E5f96852bb8552E5755dA1236",
        abi: ShopABI,
        functionName:"tranferTo",
        args:[address,amount],
    });

    const {data, isLoading, isError, write} = useContractWrite(config);
    return {data, isLoading, isError, write};

};
export default useTranfer;