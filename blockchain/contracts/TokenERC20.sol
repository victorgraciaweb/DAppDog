// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./TokenERC721.sol";

contract TokenERC20 is ERC20, Ownable {
    address public nft;

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC20(_name, _symbol) {}

    function addCoin(uint256 _quantity) public onlyOwner {
        _mint(address(this), _quantity);
        nft = address(new TokenERC721());
    }

    function changeMoneyForCoin(uint256 _quantity) public payable {
        uint256 price = coinPrice(_quantity);
        require(msg.value >= price, "The price is not enough");
        uint256 balance = balanceOf(address(this));
        require(_quantity <= balance, "You can buy less Coin");
        
        // Devolucion del dinero sobrante
        uint256 returnValue = msg.value - price;
        
        // El Smart Contract devuelve la cantidad restante
        payable(msg.sender).transfer(returnValue);
        
        // Envio de los tokens al cliente/usuario
        _transfer(address(this), msg.sender, _quantity);
    }

    function changeCoinForMoney(uint256 _quantity) public payable {
        require(_quantity > 0, "You need send more Coins for change");
        require(_quantity <= balanceOf(msg.sender), "You don't have enough Coins");
        _transfer(msg.sender, address(this), _quantity);
        payable(msg.sender).transfer(coinPrice(_quantity));
    }

    function getSmartContractMoney() public view returns (uint256) {
        return address(this).balance / 10**18;
    }

    function coinPrice(uint256 _quantity) internal pure returns (uint256){
        return _quantity * (1 ether);
    }

    function buyToken() public {
        nft.buyToken();
    }
}
