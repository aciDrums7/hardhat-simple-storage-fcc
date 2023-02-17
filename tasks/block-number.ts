import { task } from "hardhat/config"

export default task("block-number", "Prints the current block number").setAction(
    // hre -> hardhat runtime environment
    async (taskArgs, hre) => {
        const blockNumber = await hre.ethers.provider.getBlockNumber()
        console.log(`Current block number: ${blockNumber}`)
    }
)

module.exports = {}
