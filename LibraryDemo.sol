pragma solidity ^0.4.24;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

contract MyMessage is Ownable {

    string public message;

    constructor(string _message) {
      message = _message;
    }

    function setMessage(string _message) onlyOwner {
        message = _message;
    }
}
