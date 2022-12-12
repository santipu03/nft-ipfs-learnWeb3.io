const { network } = require("hardhat")
const { verify } = require("../utils/verify")

const developmentChains = ["hardhat", "localhost"]

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const metadataURL = "ipfs://Qmbygo38DWF1V8GttM1zy89KzyZTPU2FLUzQtiDvB7q6i5/"
    const args = [metadataURL]

    waitConfirmations = developmentChains.includes(network.name) ? 1 : 6

    const nftContract = await deploy("LW3Punks", {
        log: true,
        from: deployer,
        args: args,
        waitConfirmations: waitConfirmations,
    })

    log("----------------------------")

    if (!developmentChains.includes(network.name)) {
        await verify(nftContract.address, args)
    }
}
