import React, { Component } from 'react';
import {Grid,Row,Col} from 'react-bootstrap';
// import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import getWeb3 from './utils/getWeb3.js';
import BettingContract from './contracts/Betting.json';
// import web3 from 'web3';
import './App.css';
// var Web3 = require('web3');


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

    }
	this.contractDeploy = this.contractDeploy.bind(this);
    // this.getAmount = this.getAmount.bind(this);
    // this.Bet = this.Bet.bind(this);
    // this.MakeWin = this.MakeWin.bind(this);
    // this.handleInputChange = this.handleInputChange.bind(this);
	 this.handleInputChangeAddress = this.handleInputChangeAddress.bind(this);
	 this.handleInputChangeTeam1 = this.handleInputChangeTeam1.bind(this);
	 this.handleInputChangeTeam2 = this.handleInputChangeTeam2.bind(this);
	 this.handleInputChangeInputAmount = this.handleInputChangeInputAmount.bind(this);
	 this.test = this.test.bind(this);
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



	getAmount(web3){
	
	}

	contractDeploy(){
		var _better2;
		if (this.friendAddress !== '') {
			_better2 = this.state.friendAddress;
		} else {
			_better2 = '0xf17f52151EbEF6C7334FAD080c5704D77216b732';
		}
		var _teamName1 = "" ;
		var _teamName2 = "" ;
		var myContract = new this.state.web3.eth.Contract([{"constant":true,"inputs":[],"name":"better2","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalPot","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptBet","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_winningTeamID","type":"uint256"}],"name":"getWinner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"teamName2","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"teamName1","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"betters","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getBetAmount2","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getBetAmount1","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"betAmount2","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"betAmount1","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"minimumBet","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"better1","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"betterDetails","outputs":[{"name":"betAmount","type":"uint256"},{"name":"selectedTeam","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_better2","type":"address"},{"name":"_teamName1","type":"string"},{"name":"_teamName2","type":"string"}],"payable":true,"stateMutability":"payable","type":"constructor"}]);
		myContract.options.data = '0x6080604052604051610b5e380380610b5e83398101806040528101908080519060200190929190805182019291906020018051820192919050505033600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555082600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600690805190602001906100d29291906100f9565b5080600790805190602001906100e99291906100f9565b503460018190555050505061019e565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061013a57805160ff1916838001178555610168565b82800160010185558215610168579182015b8281111561016757825182559160200191906001019061014c565b5b5090506101759190610179565b5090565b61019b91905b8082111561019757600081600090555060010161017f565b5090565b90565b6109b1806101ad6000396000f3006080604052600436106100d0576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680631bee51f3146100d557806324b570a91461012c57806330bfcb5f146101575780634129b2c91461016157806378ab1fa6146101ce57806387404da51461025e5780639fda5d62146102ee578063aa7061d81461035b578063b06c0c1714610386578063bdc497ef146103b1578063c318756b146103dc578063c38a8afd14610407578063d7f3193914610432578063d9a7812414610489575b600080fd5b3480156100e157600080fd5b506100ea6104e7565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561013857600080fd5b5061014161050d565b6040518082815260200191505060405180910390f35b61015f610513565b005b34801561016d57600080fd5b5061018c60048036038101908080359060200190929190505050610595565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156101da57600080fd5b506101e361079b565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610223578082015181840152602081019050610208565b50505050905090810190601f1680156102505780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561026a57600080fd5b50610273610839565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156102b3578082015181840152602081019050610298565b50505050905090810190601f1680156102e05780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3480156102fa57600080fd5b50610319600480360381019080803590602001909291905050506108d7565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561036757600080fd5b50610370610915565b6040518082815260200191505060405180910390f35b34801561039257600080fd5b5061039b61091f565b6040518082815260200191505060405180910390f35b3480156103bd57600080fd5b506103c6610929565b6040518082815260200191505060405180910390f35b3480156103e857600080fd5b506103f161092f565b6040518082815260200191505060405180910390f35b34801561041357600080fd5b5061041c610935565b6040518082815260200191505060405180910390f35b34801561043e57600080fd5b5061044761093b565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561049557600080fd5b506104ca600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610961565b604051808381526020018281526020019250505060405180910390f35b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60035481565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561056f57600080fd5b6001543414151561057f57600080fd5b3460028190555060015460025401600381905550565b6000600282111580156105a9575060008210155b15156105b457600080fd5b600182141561062d57600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6003549081150290604051600060405180830381858888f19350505050158015610627573d6000803e3d6000fd5b50610796565b60028214156106a657600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6003549081150290604051600060405180830381858888f193505050501580156106a0573d6000803e3d6000fd5b50610795565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc60026003548115156106f057fe5b049081150290604051600060405180830381858888f1935050505015801561071c573d6000803e3d6000fd5b50600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc600260035481151561076757fe5b049081150290604051600060405180830381858888f19350505050158015610793573d6000803e3d6000fd5b505b5b919050565b60078054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156108315780601f1061080657610100808354040283529160200191610831565b820191906000526020600020905b81548152906001019060200180831161081457829003601f168201915b505050505081565b60068054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156108cf5780601f106108a4576101008083540402835291602001916108cf565b820191906000526020600020905b8154815290600101906020018083116108b257829003601f168201915b505050505081565b6008818154811015156108e657fe5b906000526020600020016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600254905090565b6000600154905090565b60025481565b60015481565b60005481565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600960205280600052604060002060009150905080600001549080600101549050825600a165627a7a72305820fe446bc93a5d0f82a2fad67288bb1e58057fb627723c0d1cd8dcc868780d0c2f0029';

		myContract.deploy({
			arguments: [_better2, _teamName1, _teamName2] 
		})
		.send({
			from: '0x627306090abaB3A6e1400e9345bC60c78a8BEf57',
			value: 11*this.state.weiConversion,
			gas: 1500000,
			gasPrice: '300000000'
			
		})
		.then(function(newContractInstance){
			console.log(newContractInstance.options.address) 
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
            <h4> Total amount : {this.state.Amount} ETH</h4>
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
            <button onClick={this.test}> test</button>
             <br/>
          </div>
        )

    }



}

export default TeamA;