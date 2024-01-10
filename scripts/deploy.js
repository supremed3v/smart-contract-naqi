const { ethers } = require("hardhat");

async function main() {
  async function getOwnerSigner() {
    const [owner] = await ethers.getSigners();
    return owner;
  }

  const ownerSigner = await getOwnerSigner();
  console.log("Deploying with owner address:", ownerSigner.address);

  const FreeMintableNFT = await ethers.getContractFactory("FreeMintableNFT");
  const freeMintableNFT = await FreeMintableNFT.deploy();

  // Wait for the contract to be mined
  await freeMintableNFT.deployed();
  console.log("FreeMintableNFT deployed to:", freeMintableNFT.address);

  // Set the owner during deployment
  console.log("Setting owner...");
  await freeMintableNFT.connect(ownerSigner).setOwner(ownerSigner.address);

  // Ensure the owner is correctly set after initialization
  const ownerFromContract = await freeMintableNFT.owner();
  console.log("Owner from contract:", ownerFromContract);

  if (ownerFromContract !== ownerSigner.address) {
    console.error("Owner not set correctly. Aborting.");
    process.exit(1);
  }

  // Other actions can be performed here

  console.log("Deployment and actions complete.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
