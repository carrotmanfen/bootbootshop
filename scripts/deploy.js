const { error } = require("console");

async function main() {
    const Shop = await ethers.getContractFactory("Shop");
    
    const Bootboot_shop = await Shop.deploy("Shop");
    console.log("Contrsct deployed to address: ",Bootboot_shop.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });