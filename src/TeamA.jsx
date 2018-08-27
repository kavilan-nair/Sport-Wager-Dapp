import React, { Component } from 'react';
import {Grid,Row,Col} from 'react-bootstrap';
// import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import getWeb3 from './utils/getWeb3.js';
import BettingContract from './contracts/Betting.json';
// import web3 from 'web3';
import './App.css';
// var Web3 = require('web3');

  var contractAddress = 'asdf';

let ABI_ARRAY = ([{"constant":false,"inputs":[],"name":"stopContract","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"better2","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isActive","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalPot","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptBet","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"isStopped","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_winningTeamID","type":"uint256"}],"name":"getWinner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"isAccepted","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"teamName2","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"teamName1","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"betAmount2","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"betAmount1","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"minimumBet","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"resumeContract","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"better1","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"emergencyWithdraw","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"winner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_better2","type":"address"},{"name":"_teamName1","type":"string"},{"name":"_teamName2","type":"string"}],"payable":true,"stateMutability":"payable","type":"constructor"}])


class TeamA extends Component {
 constructor(){
   super();

   this.state={
     web3: '',
     Amount: '',
     InputAmount: '',
     weiConversion : 1000000000000000000,
     friendAddress: '',
     team1: '',
     team2: '',
    contractAddress: ''

   }
  
  this.contractDeploy = this.contractDeploy.bind(this);
 this.handleInputChangeAddress = this.handleInputChangeAddress.bind(this);
 this.handleInputChangeTeam1 = this.handleInputChangeTeam1.bind(this);
 this.handleInputChangeTeam2 = this.handleInputChangeTeam2.bind(this);
 this.handleInputChangeInputAmount = this.handleInputChangeInputAmount.bind(this);
 this.test = this.test.bind(this);
 this.getContractAddress = this.getContractAddress.bind(this);
 }

 componentDidMount(){
   getWeb3.then(results => {
     /*After getting web3, we save the informations of the web3 user by
     editing the state variables of the component */
     results.web3.eth.getAccounts( (error,acc) => {
       //this.setState is used to edit the state variables
       this.setState({
         web3: results.web3
       })
     });
     //At the end of the first promise, we return the loaded web3

     return results.web3
   }).then(results => {
     //In the next promise, we pass web3 (in results) to the getAmount function
     this.getAmount(results)
   }).catch( () => {
     //If no web3 provider was found, log it in the console
     console.log('Error finding web3.')
   })
 }

  getContractAddress(e){
    console.log(contractAddress)
    return contractAddress;
  }

  getAmount(web3){
  
  }

  contractDeploy(){
    var _better2;
    var _teamName1 = "";
    var _teamName2 = "";
    var _amount = "";
    if (this.friendAddress !== '') {
      _better2 = this.state.friendAddress;
    } else {
      _better2 = '0xf17f52151EbEF6C7334FAD080c5704D77216b732';
    }

    _teamName1 = this.state.team1;
    _teamName2 = this.state.team2;
    _amount = this.state.InputAmount;
    
    var myContract = new this.state.web3.eth.Contract(ABI_ARRAY)
    myContract.options.data = '0x6080604052604051610f1e380380610f1e83398101806040528101908080519060200190929190805182019291906020018051820192919050505033600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555082600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600690805190602001906100d292919061012f565b5080600790805190602001906100e992919061012f565b50346001819055506000600560146101000a81548160ff0219169083151502179055506000600860146101000a81548160ff0219169083151502179055505050506101d4565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061017057805160ff191683800117855561019e565b8280016001018555821561019e579182015b8281111561019d578251825591602001919060010190610182565b5b5090506101ab91906101af565b5090565b6101d191905b808211156101cd5760008160009055506001016101b5565b5090565b90565b610d3b806101e36000396000f3006080604052600436106100f1576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806312253a6c146100f65780631bee51f31461010d57806322f3e2d41461016457806324b570a91461019357806330bfcb5f146101be5780633f683b6a146101c85780634129b2c9146101f75780635051a5ec1461022457806378ab1fa61461025357806387404da5146102e3578063bdc497ef14610373578063c318756b1461039e578063c38a8afd146103c9578063c4bc5da5146103f4578063d7f319391461040b578063db2e21bc14610462578063dfbf53ae1461046c575b600080fd5b34801561010257600080fd5b5061010b6104c3565b005b34801561011957600080fd5b50610122610594565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561017057600080fd5b506101796105ba565b604051808215151515815260200191505060405180910390f35b34801561019f57600080fd5b506101a86105cd565b6040518082815260200191505060405180910390f35b6101c66105d3565b005b3480156101d457600080fd5b506101dd6106a7565b604051808215151515815260200191505060405180910390f35b34801561020357600080fd5b50610222600480360381019080803590602001909291905050506106ba565b005b34801561023057600080fd5b5061023961099e565b604051808215151515815260200191505060405180910390f35b34801561025f57600080fd5b506102686109b1565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156102a857808201518184015260208101905061028d565b50505050905090810190601f1680156102d55780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3480156102ef57600080fd5b506102f8610a4f565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561033857808201518184015260208101905061031d565b50505050905090810190601f1680156103655780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561037f57600080fd5b50610388610aed565b6040518082815260200191505060405180910390f35b3480156103aa57600080fd5b506103b3610af3565b6040518082815260200191505060405180910390f35b3480156103d557600080fd5b506103de610af9565b6040518082815260200191505060405180910390f35b34801561040057600080fd5b50610409610aff565b005b34801561041757600080fd5b50610420610bd0565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61046a610bf6565b005b34801561047857600080fd5b50610481610ce9565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3373ffffffffffffffffffffffffffffffffffffffff16600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16148061056c57503373ffffffffffffffffffffffffffffffffffffffff16600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16145b151561057757600080fd5b6001600860146101000a81548160ff021916908315150217905550565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600560159054906101000a900460ff1681565b60035481565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561062f57600080fd5b6001543414151561063f57600080fd5b600560149054906101000a900460ff1615151561065b57600080fd5b34600281905550600154600254016003819055506001600560146101000a81548160ff0219169083151502179055506001600560156101000a81548160ff021916908315150217905550565b600860149054906101000a900460ff1681565b600860149054906101000a900460ff161515156106d657600080fd5b600281111580156106e8575060018110155b15156106f357600080fd5b60018114156107cf57600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6003549081150290604051600060405180830381858888f19350505050158015610766573d6000803e3d6000fd5b50600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600860006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555061099b565b60028114156108ab57600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6003549081150290604051600060405180830381858888f19350505050158015610842573d6000803e3d6000fd5b50600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600860006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555061099a565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc60026003548115156108f557fe5b049081150290604051600060405180830381858888f19350505050158015610921573d6000803e3d6000fd5b50600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc600260035481151561096c57fe5b049081150290604051600060405180830381858888f19350505050158015610998573d6000803e3d6000fd5b505b5b50565b600560149054906101000a900460ff1681565b60078054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610a475780601f10610a1c57610100808354040283529160200191610a47565b820191906000526020600020905b815481529060010190602001808311610a2a57829003601f168201915b505050505081565b60068054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610ae55780601f10610aba57610100808354040283529160200191610ae5565b820191906000526020600020905b815481529060010190602001808311610ac857829003601f168201915b505050505081565b60025481565b60015481565b60005481565b3373ffffffffffffffffffffffffffffffffffffffff16600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161480610ba857503373ffffffffffffffffffffffffffffffffffffffff16600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16145b1515610bb357600080fd5b6000600860146101000a81548160ff021916908315150217905550565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600860149054906101000a900460ff161515610c1157600080fd5b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6001549081150290604051600060405180830381858888f19350505050158015610c7b573d6000803e3d6000fd5b50600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6002549081150290604051600060405180830381858888f19350505050158015610ce6573d6000803e3d6000fd5b50565b600860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16815600a165627a7a7230582034d44b922bd1a84b336c9930454f5c7d2cce9ad2d1635df5e378b88231e8a0650029';

    myContract.deploy({
      arguments: [_better2, _teamName1, _teamName2]
    })
    .send({
      from: '0x627306090abaB3A6e1400e9345bC60c78a8BEf57',
      value: _amount*this.state.weiConversion,
      gas: 1500000,
      gasPrice: '300000000'
      
    })
    .then((newContractInstance) => {
      console.log(newContractInstance.options.address)
      // contractAddress = " " + newContractInstance.options.address
      this.setState({contractAddress: newContractInstance.options.address});
      // this.contractAddress = newContractInstance.options.address;
    });
    
}

 handleInputChange(e) {
   this.setState({InputAmount: e.target.value*this.state.weiConversion});
 }
   handleInputChangeAddress(e) {
   this.setState({friendAddress: e.target.value});
 }

   handleInputChangeTeam1(e) {
   this.setState({team1: e.target.value});
 }

handleInputChangeTeam2(e) {
   this.setState({team2: e.target.value});
 }

 handleInputChangeInputAmount(e) {
    this.setState({InputAmount: e.target.value});
 }

  test(){
    console.log(this.state.friendAddress)
    console.log(this.state.team1)
    console.log(this.state.team2)
    console.log(this.state.InputAmount)

  }


 render(){
       return(
         <div>
           <h3>Create a bet</h3>
           <hr/>
           <h5> Enter an Address of recipient</h5>
           <div className="input-group">
               <span className="input-group-addon">@</span>
               <input type="text" className="form-control"  onChange={this.handleInputChangeAddress} />
           </div>
           <h5> Enter Name of your Prefered Team</h5>
           <div className="input-group">
               <span className="input-group-addon">Team 1</span>
               <input type="text" className="form-control" onChange={this.handleInputChangeTeam1} />
           </div>
            <h5> Enter Name of recipient Team</h5>
           <div className="input-group">
               <span className="input-group-addon">Team 2</span>
               <input type="text" className="form-control" onChange={this.handleInputChangeTeam2}/>
           </div>
           <h5> Enter amount for bet</h5>
           <div className="input-group">
               <span className="input-group-addon"> ETH </span>
               <input type="number" min="0" max="999" className="form-control" onChange={this.handleInputChangeInputAmount} />
               
           </div>
          
           <br/>
           <button onClick={this.contractDeploy}>Deploy Contract</button>
           <br/>
           <hr/>
           <h3> Latest Deployed Contract:</h3>
      <p>Address: {this.state.contractAddress}</p>
         </div>
       )

   }



}

export default TeamA;

