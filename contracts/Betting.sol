pragma solidity ^0.4.20;

// import "github.com/oraclize/ethereum-api/oraclizeAPI.sol";

contract Betting {
    // what uint should I use?
    uint public minimumBet;
    uint public betAmount1;
    uint public betAmount2;
    uint public totalPot;
    
    address public better1;
    address public better2;

    string public teamName1;
    string public teamName2;
    
    address[] public betters;
    
    struct Better {
        uint betAmount;
        uint selectedTeam;
    }
    
    mapping(address => Better) public betterDetails;
    
    constructor(address _better2, string _teamName1, string _teamName2) public payable {
        better1 = msg.sender;
        better2 = _better2;
        teamName1 = _teamName1;
        teamName2 = _teamName2;
        betAmount1 = msg.value;
    }
    
    function acceptBet() public payable {
        require(msg.sender == better2);
        require(msg.value == betAmount1);
        betAmount2 = msg.value;
        totalPot = betAmount2 + betAmount1;
        
    }
    
    function getWinner(uint _winningTeamID) public returns (address) {
        require(_winningTeamID <= 2 && _winningTeamID >= 0);
        if (_winningTeamID == 1) {
             better1.transfer(totalPot);
        } else if (_winningTeamID == 2) {
             better2.transfer(totalPot);
        } else {
             better1.transfer(totalPot/2);
             better2.transfer(totalPot/2);
        }
        
    }
    
    
    function getBetAmount1() public view returns (uint) {
        return betAmount1;
    }
    
    function getBetAmount2() public view returns (uint) {
        return betAmount2;
    }
    
}