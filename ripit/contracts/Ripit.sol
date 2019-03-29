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

    event NewPost(uint index);

    constructor() public
    {
        lastPostIndex= 0;
    }

    function getLatestIndex()public view returns(uint)
    {
        return lastPostIndex;
    }

    function post(string memory username,string memory body,uint timeStamp) public
    {
        require(bytes(username).length <= 200);
        require(bytes(body).length <= 1500);
        require(timeStamp >= 0);
        
        posts[lastPostIndex] = Post(username,msg.sender,body,timeStamp);
        emit NewPost(lastPostIndex);
        lastPostIndex += 1;
    }
    
    function getPost(uint index) public view returns (string memory username,string memory body, uint timeStamp)
    {
        Post memory pp = posts[index];
        return (pp.actualUsername,pp.body,pp.timeStamp);
        
    }
}
