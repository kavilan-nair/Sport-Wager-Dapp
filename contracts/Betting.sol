pragma solidity ^0.4.20;

// import "github.com/oraclize/ethereum-api/oraclizeAPI.sol";

contract Betting{
    // what uint should I use?
    uint public minimumBet;
    uint public betAmount1;
    uint public betAmount2;
    uint public totalPot;
    address public better1;
    address public better2;
    bool public isAccepted;
    bool public isActive;
    string public teamName1;
    string public teamName2;
    address public winner;
    
    // Emergency Stop setup
    bool public isStopped;
    
    constructor(address _better2, string _teamName1, string _teamName2) public payable {
        better1 = msg.sender;
        better2 = _better2;
        teamName1 = _teamName1;
        teamName2 = _teamName2;
        betAmount1 = msg.value; 
        isAccepted = false;
        isStopped = false;
    }
    
    function acceptBet() public payable {
        require(msg.sender == better2);
        require(msg.value == betAmount1);
        require(!isAccepted);
        betAmount2 = msg.value;
        totalPot = betAmount2 + betAmount1;
        isAccepted = true;
        isActive = true;
        
    }
    
    function getWinner(uint _winningTeamID) public stoppedInEmergency {
        require(_winningTeamID <= 2 && _winningTeamID >= 1);
        if (_winningTeamID == 1) {
             better1.transfer(totalPot);
             winner = better1;
        } else if (_winningTeamID == 2) {
             better2.transfer(totalPot);
             winner = better2;
        } else {
             better1.transfer(totalPot/2);
             better2.transfer(totalPot/2);
        }
    }
    
    modifier stoppedInEmergency {
        require(!isStopped);
        _;
    }
    
     modifier onlyWhenStopped {
        require(isStopped);
        _;
    }
    
    modifier onlyAuthorized {
       require(better1 == msg.sender || better2 == msg.sender);
        _;
    }
    
     function stopContract() public onlyAuthorized {
        isStopped = true;
    }

    function resumeContract() public onlyAuthorized {
        isStopped = false;
    }
    
    function emergencyWithdraw() public payable onlyWhenStopped {
        better1.transfer(betAmount1);
        better2.transfer(betAmount2);
    }
    
    
}