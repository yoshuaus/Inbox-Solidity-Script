pragma solidity ^0.4.17;
// linter warnings (red underline) about pragma version can igonored!

// contract code will go here

contract Inbox {

    string public message;

    function Inbox(string _initmsg) public {
        message = _initmsg;
    }

    function setMessage (string _changeMessage) public {
        message = _changeMessage;    
    }

    function seeMessage() public view returns (string) {
        return message;
    }
}