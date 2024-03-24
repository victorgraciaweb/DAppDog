// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// Uncomment this line to use console.log
//import "hardhat/console.sol";

// Import OpenZeppelin
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Dog is ERC721 {

    address public owner;

    constructor (string memory _name, string memory _symbol)
    ERC721(_name, _symbol){
        owner = msg.sender;
    }

    function registerDog(string memory _uuid, string memory _name, string memory _breed, string memory _color) public {
        require(msg.sender == owner, "Only the owner can call this function");
        uint256 newItemId = _tokensIds.current();
        DogInfo memory dog = DogInfo(newItemId, _uuid, _name, _breed, _color, 1);
        dogs.push(dog);
        _safeMint(msg.sender, newItemId);
    }

    // Counters NFTs
    using Counters for Counters.Counter;
    Counters.Counter private _tokensIds;

    // Data structure with the properties of the Dogs
    struct DogInfo {
        uint256 id;
        string uuid;
        string name;
        string breed;
        string color;
        uint8 availableForAdpt;
    }

    // Storage structure for keeping Dogs
    DogInfo[] public dogs;

    function totalSupply() public view returns (uint) {
        return dogs.length;
    }

   function findDog(string memory _uuid) public view returns (DogInfo memory) {
        for (uint256 i = 0; i < dogs.length; i++) {
            if (keccak256(bytes(dogs[i].uuid)) == keccak256(bytes(_uuid))) {
                return dogs[i];
            }
        }
        revert("Dog not found");
    }
}