// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenERC721 is ERC721 {

    address public nftAddress;
    uint public tokenCount;

    constructor() ERC721("NFT-Token", "NFT"){
        nftAddress = msg.sender;
        tokenCount=0;

        _tokenCreation();
    }

    function _tokenCreation() private {
        for (uint i = 0; i < 500; i++) {
            tokenCount++;
            _safeMint(msg.sender, tokenCount);
        }
    }

    function buyToken() external {
        _transfer(nftAddress, msg.sender, 10);
    }
}