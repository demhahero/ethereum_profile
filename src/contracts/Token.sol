// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title SimpleToken
 * @dev Very simple ERC20 Token example, where all tokens are pre-assigned to the creator.
 * Note they can later distribute these tokens as they wish using `transfer` and other
 * `ERC20` functions.
 * Based on https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v2.5.1/contracts/examples/SimpleToken.sol
 */
contract Token is ERC20 {
    /**
     * @dev Constructor that gives msg.sender all of existing tokens.
     */
    address public owner;
    mapping(address => string) public profile;

    constructor() ERC20("Test", "TST") {
        _mint(msg.sender, 1000000);
        owner = msg.sender;
    }

    function changeProfile(string memory code) external {
        //string memory code
        transfer(owner, 1);
        profile[msg.sender] = code;
    }

    function getProfile(address _address)
        public
        view
        virtual
        returns (string memory)
    {
        return profile[_address];
    }
}
