// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract FreeMintableNFT is ERC721Enumerable {
    address public owner;
    uint256 public constant MAX_SUPPLY = 100000;
    uint256 public constant MAX_MINT_PER_USER = 1;

    mapping(address => bool) private _hasMinted;
    bool private _initialized;

    // Define the MintError event
    event MintError(string error);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    constructor() ERC721("FreeMintableNFT", "FMNFT") {}

    // Function to allow users to mint NFTs for free
    function mint() external {
        require(totalSupply() < MAX_SUPPLY, "Maximum supply reached");
        require(!_hasMinted[msg.sender], "You can only mint one NFT");
        require(owner != address(0), "Owner not set");

        if (totalSupply() >= MAX_SUPPLY) {
            // Emit the MintError event when the maximum supply is reached
            emit MintError("Maximum supply reached");
            return;
        }

        uint256 tokenId = totalSupply() + 1;
        _safeMint(msg.sender, tokenId);

        _hasMinted[msg.sender] = true;
    }

    // Function to set up the contract owner
    function initialize() external onlyOwner {
        require(!_initialized, "Already initialized");

        // Mint one NFT for the owner during initialization
        if (totalSupply() == 0) {
            uint256 tokenId = totalSupply() + 1;
            _safeMint(owner, tokenId);
        }

        _initialized = true;
    }

    // Function to set the owner during deployment
    function setOwner(address _owner) external {
        require(owner == address(0), "Owner already set");
        owner = _owner;
    }
}
