import { useContractWrite,usePrepareContractWrite } from "wagmi";
import ShopABI from "../abis/Shop.json"
import { parseEther } from "viem";

const useTransfer = (address, amount)=>{
    const {config} = usePrepareContractWrite({
        address: "0x31f31e8440C202A49CD77Cf2bD10e37fE01b1FA5",
        abi: ShopABI,
        functionName:"transferTo",
        args:[address,parseEther(amount, 18)],
    });

    const {data, isLoading, isError, write} = useContractWrite(config);
    return {data, isLoading, isError, write};

};
export default useTransfer;