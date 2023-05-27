import { useContractWrite,usePrepareContractWrite } from "wagmi";
import ShopABI from "../abis/Shop.json"

const useTranfer = (address:string , amount:number)=>{
    const {config} = usePrepareContractWrite({
        address: "0x272dDd25b9DEc90F52B40a4B7a27689c2d8667f6",
        abi: ShopABI,
        functionName:"tranferTo",
        args:[address,amount],
    });

    const {data, isLoading, isError, write} = useContractWrite(config);
    return {data, isLoading, isError, write};

};
export default useTranfer;