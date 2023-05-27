const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const contract = require("../artifacts/contracts/Shop.sol/Shop.json");

// provider - Alchemy
const alchemyProvider = new ethers.providers.AlchemyProvider(network="goerli", API_KEY);

// signer - you
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// contract instance
const shopContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);

async function main() {
    const message = await shopContract.message();
    console.log("The message is: " + message); 

    console.log("Updating the message...");
    const tx = await shopContract.update("Thank you for shopping at Bootbootshop.");
    await tx.wait();

    const newMessage = await shopContract.message();
    console.log("The new message is: " + newMessage); 
}

main();