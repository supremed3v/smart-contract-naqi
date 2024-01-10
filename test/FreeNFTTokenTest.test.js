const { expect } = require("chai");

describe("FreeMintableNFT", function () {
  let FreeMintableNFT;
  let freeMintableNFT;
  let owner;
  let addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();

    FreeMintableNFT = await ethers.getContractFactory("FreeMintableNFT");
    freeMintableNFT = await FreeMintableNFT.deploy();

    await freeMintableNFT.deployed();
  });

  it("Should deploy the contract", async function () {
    expect(freeMintableNFT.address).to.not.equal(0);
  });

  it("Should allow the owner to mint NFT", async function () {
    await freeMintableNFT.connect(owner).initialize();

    const ownerBalanceBefore = await freeMintableNFT.balanceOf(owner.address);
    expect(ownerBalanceBefore).to.equal(1);

    await expect(freeMintableNFT.connect(owner).mint())
      .to.emit(freeMintableNFT, "Transfer")
      .withArgs(ethers.constants.AddressZero, owner.address, 2);

    const ownerBalanceAfter = await freeMintableNFT.balanceOf(owner.address);
    expect(ownerBalanceAfter).to.equal(2);
  });

  it("Should not allow non-owners to mint NFT", async function () {
    await expect(freeMintableNFT.connect(addr1).mint()).to.be.revertedWith(
      "Not the owner"
    );
  });

  it("Should set the owner during deployment", async function () {
    const contractOwner = await freeMintableNFT.owner();
    expect(contractOwner).to.equal(owner.address);
  });
});
