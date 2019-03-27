pragma solidity >=0.4.22 <0.6.0;

import "./owned.sol";

contract mortal is owned {
    function kill() public {
        if (msg.sender == owner)
            selfdestruct(msg.sender);
    }
}
