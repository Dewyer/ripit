pragma solidity >=0.4.22 <0.6.0;

contract TipGame {

    bytes32 solutionHash;
    uint pricePool;

    constructor(bytes32 solution) public
    {
        solutionHash = (solution);
        pricePool = 0;
    }

    function givePool() public payable
    {
        pricePool += msg.value;
    }
    
    function stringToBytes32(string memory source) public pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }
    
        assembly {
            result := mload(add(source, 32))
        }
    }

    function keccakGetter(string memory test) public view returns (bytes32)
    {
        return (keccak256(bytes(test)));
    }

    function makeATip(string memory guess) public returns (bool)
    {
        bytes32 hs = (keccak256(bytes(guess)));
        bytes32 sol = (solutionHash);
        if (hs == sol)
        {
            //wins
            msg.sender.transfer(pricePool);
            return true;
        }
        return false;
    }
}
