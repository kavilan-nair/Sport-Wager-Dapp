pragma solidity ^0.4.20;

// import "github.com/oraclize/ethereum-api/oraclizeAPI.sol";
/** @title A betting contract that allows for bets to be created and accepted 
* amongst friends, the full functionality would involve an oracle but that has 
* not been implemented at this stage. 
*  @author Kavilan Nair - TripleBlatkCar
*/
contract Betting{
    
    /** @dev store the amount that is bet bet by the first better **/
    uint public betAmount1;
    
    /** @dev store the amount that is bet bet by the second better **/
    uint public betAmount2;
    
    /** @dev store the total pot amount that is stored in the contract  **/
    uint public totalPot;
    
    /** @dev store the address of the creator and first participant in the bet **/
    address public better1;
    
    /** @dev store the address of the creator and first participant in the bet **/
    address public better2;
    
    /** @dev stores a boolean that determines whether the bet has been accepted by friend **/
    bool public isAccepted;
    
    /** @dev stores a boolean that determines whether the bet is live and is waiting for a payout**/
    bool public isActive;
    
    /** @dev stores the string name of team 1**/
    string public teamName1;
    
    /** @dev stores the string name of team 2**/
    string public teamName2;
    
    /** @dev stores the address of the winner of the bet**/
    address public winner;
    
    /** @dev stores boolean of contract state to be used in the emergency stop design pattern**/
    bool public isStopped;
    
    /** @dev Contstructor that is called when contract is deployed
      * @param _better2 address of the opposition better
      * @param _teamName1 name of team contract deployer is backing
      * @return _teamName2 name of team that opposition better is backing
      */
    constructor(
        address _better2,
        string _teamName1,
        string _teamName2) 
        public 
        payable 
    {
        better1 = msg.sender;
        better2 = _better2;
        teamName1 = _teamName1;
        teamName2 = _teamName2;
        betAmount1 = msg.value; 
        isAccepted = false;
        isStopped = false;
    }
    
    
    /** @dev function to accept bet when called from better 2 address */
    function acceptBet()
        public
        payable 
    {
        require(msg.sender == better2);
        require(msg.value == betAmount1);
        require(!isAccepted);
        betAmount2 = msg.value;
        totalPot = betAmount2 + betAmount1;
        isAccepted = true;
        isActive = true;
        
    }
    
    /** @dev this function is used to simulate someone winning the bet
      * @param _winningTeamID address of the opposition better
     */
    function getWinner(
        uint _winningTeamID
        ) 
        public
        stoppedInEmergency 
    {
        require(_winningTeamID <= 2 && _winningTeamID >= 1);
        if (_winningTeamID == 1) {
             better1.transfer(totalPot);
             winner = better1;
             isActive = false;
        } else if (_winningTeamID == 2) {
             better2.transfer(totalPot);
             winner = better2;
             isActive = false;
        } else {
             better1.transfer(totalPot/2);
             better2.transfer(totalPot/2);
             isActive = false;
        }
    }
    
    /** @dev modifier used in emergency stop design pattern **/
    modifier stoppedInEmergency {
        require(!isStopped);
        _;
    }
    
    /** @dev modifier used in emergency stop design pattern **/
    modifier onlyWhenStopped {
        require(isStopped);
        _;
    }
    
    /** @dev modifier used in emergency stop design pattern **/
    modifier onlyAuthorized {
       require(better1 == msg.sender || better2 == msg.sender);
        _;
    }
    
    /** @dev function to pause execution of contract calls **/
    function stopContract() 
        public
        onlyAuthorized
    {
        isStopped = true;
    }

    /** @dev function to resume execution of contract calls **/  
    function resumeContract() 
        public
        onlyAuthorized 
    {
        isStopped = false;
    }
    
    /** @dev function to withdraw all funds to original betters when the 
    * emergency stop has been called 
    **/
    function emergencyWithdraw() 
        public 
        payable
        onlyWhenStopped
    {
        better1.transfer(betAmount1);
        better2.transfer(betAmount2);
    }
       
}