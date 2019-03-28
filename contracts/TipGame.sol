pragma solidity >=0.4.22 <0.6.0;

contract TipGame {

    string solutionHash;
    uint pricePool;

    constructor(string solution) public
    {
        solutionHash = solution;
        pricePool = 0;
    }

    function givePool() public payable
    {
        pricePool += msg.value;
    }

    function makeATip(string guess) public view returns (bool)
    {
        var hs = string(keccak256(bytes(guess)));
        if (hs == solutionHash)
        {
            //wins
            msg.sender.send(pricePool);
            return true;
        }
        return false;
    }
}
