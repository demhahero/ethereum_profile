// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
import "./Token.sol";

contract Profile {
    /**
     * @dev Constructor that gives msg.sender all of existing tokens.
     */
    mapping(address => string) public profile;

    constructor() {}

    function changeProfile(string memory code) public {
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
