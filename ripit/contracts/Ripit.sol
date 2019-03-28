pragma solidity >=0.4.22 <0.6.0;
pragma experimental ABIEncoderV2;

contract Ripit {

    struct Post
    {
        string actualUsername;
        address poster;
        string body;
        uint timeStamp;
    }
    uint lastPostIndex;
    mapping(uint=>Post) posts;

    constructor() public
    {
        lastPostIndex= 0;
    }

    function post(string memory username,string memory body,uint timeStamp) public
    {
        require(bytes(username).length <= 200);
        require(bytes(body).length <= 1500);
        require(timeStamp >= 0);
        
        posts[lastPostIndex+1] = Post(username,msg.sender,body,timeStamp);
    }
    
    function getPost() public view returns (Post memory)
    {
        
        
    }
}
