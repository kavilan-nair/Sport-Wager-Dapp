
import React, { Component } from 'react';
import {Grid,Row,Col} from 'react-bootstrap';
// import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import getWeb3 from './utils/getWeb3.js';
import BettingContract from './contracts/Betting.json';
import './App.css';

let ABI_ARRAY = [{"constant":false,"inputs":[],"name":"stopContract","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"better2","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isActive","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalPot","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptBet","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"isStopped","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_winningTeamID","type":"uint256"}],"name":"getWinner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"isAccepted","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"teamName2","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"teamName1","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"betAmount2","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"betAmount1","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"minimumBet","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"resumeContract","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"better1","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"emergencyWithdraw","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"winner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_better2","type":"address"},{"name":"_teamName1","type":"string"},{"name":"_teamName2","type":"string"}],"payable":true,"stateMutability":"payable","type":"constructor"}]


class TeamA extends Component {
  constructor(){
    super();
    this.state={
      web3: '',
      address: '',
      Amount: '',
      InputAmount: '',
      weiConversion : 1000000000000000000,
      wagerAddress: '',
      better1: "",
      better2: '',
      betAmount1: '',
      betAmount2: '',
      teamName1: '',
      teamName2: '',
      totalPot: '',
    }

    // this.getAmount = this.getAmount.bind(this);
    this.getContract = this.getContract.bind(this);
    this.acceptWager = this.acceptWager.bind(this);
    this.acceptWager = this.acceptWager.bind(this);
    this.makeTeam1win = this.makeTeam1win.bind(this);
    this.makeTeam2win = this.makeTeam2win.bind(this);
    // this.makeTeam2win = this.makeTeam2win.bind(this);

    this.handleInputChangeAddress = this.handleInputChangeAddress.bind(this);
    // this.MakeWin = this.MakeWin.bind(this);

    // this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount(){
    getWeb3.then(results => {
      /*After getting web3, we save the informations of the web3 user by
      editing the state variables of the component */
      results.web3.eth.getAccounts( (error,acc) => {
        //this.setState is used to edit the state variables
        this.setState({
          web3: results.web3,
          address: acc[0],
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

  getContract(){
    if (this.state.wagerAddress !== ''){
      // let ABI_ARRAY = [{"constant":true,"inputs":[],"name":"better2","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalPot","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptBet","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_winningTeamID","type":"uint256"}],"name":"getWinner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"teamName2","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"teamName1","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"betters","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getBetAmount2","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getBetAmount1","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"betAmount2","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"betAmount1","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"minimumBet","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"better1","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"betterDetails","outputs":[{"name":"betAmount","type":"uint256"},{"name":"selectedTeam","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_better2","type":"address"},{"name":"_teamName1","type":"string"},{"name":"_teamName2","type":"string"}],"payable":true,"stateMutability":"payable","type":"constructor"}]
      // let temp = this.state.web3.eth.contract(ABI_ARRAY).at(0xbaAA2a3237035A2c7fA2A33c76B44a8C6Fe18e87);
      var contract = new this.state.web3.eth.Contract(ABI_ARRAY, this.state.wagerAddress)
      contract.methods.better1().call().then((result) => {
        console.log(result)
          this.setState({
            better1: result
          });
      });

      contract.methods.better2().call().then((result) => {
        console.log(result)
          this.setState({
            better2: result
          });
      });

      contract.methods.betAmount1().call().then((result) => {
        console.log(result)
          this.setState({
            betAmount1: parseFloat(result) 
          });
      });

      contract.methods.teamName1().call().then((result) => {
        console.log(result)
          this.setState({
            teamName1: result
          });
      });

      contract.methods.teamName2().call().then((result) => {
        console.log(result)
          this.setState({
            teamName2: result
          });
      });
    }
    contract.methods.totalPot().call().then((result) => {
        console.log(result)
          this.setState({
            totalPot: result
          });
      });
    
  }
  acceptWager(){
      let ABI_ARRAY = [{"constant":true,"inputs":[],"name":"better2","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalPot","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptBet","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_winningTeamID","type":"uint256"}],"name":"getWinner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"teamName2","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"teamName1","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"betters","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getBetAmount2","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getBetAmount1","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"betAmount2","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"betAmount1","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"minimumBet","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"better1","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"betterDetails","outputs":[{"name":"betAmount","type":"uint256"},{"name":"selectedTeam","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_better2","type":"address"},{"name":"_teamName1","type":"string"},{"name":"_teamName2","type":"string"}],"payable":true,"stateMutability":"payable","type":"constructor"}]
      // let temp = this.state.web3.eth.contract(ABI_ARRAY).at(0xbaAA2a3237035A2c7fA2A33c76B44a8C6Fe18e87);
      var contract = new this.state.web3.eth.Contract(ABI_ARRAY, this.state.wagerAddress)
      console.log(this.state.betAmount1)
      contract.methods.acceptBet().send({
        from: this.state.better2,
        gas: 1500000,
        value: this.state.betAmount1
      })
      
  }

  
  makeTeam1win() {
      var contract = new this.state.web3.eth.Contract(ABI_ARRAY, this.state.wagerAddress)
      contract.methods.getWinner(1).send({
        from: this.state.address,
        gas: 1500000
      })
  }

  makeTeam2win() {
      var contract = new this.state.web3.eth.Contract(ABI_ARRAY, this.state.wagerAddress)
      contract.methods.getWinner(2).send({
        from: this.state.address,
        gas: 1500000
      })
  }

  handleInputChangeAddress(e) {
    this.setState({wagerAddress: e.target.value});
  }

  MakeWin(){
    const contract = require('truffle-contract');
    const Betting = contract(BettingContract);
    Betting.setProvider(this.state.web3.currentProvider);
    var BettingInstance;
    this.state.web3.eth.getAccounts((error, accounts) => {
        Betting.deployed().then((instance) => {
          BettingInstance = instance
        }).then((result) => {
          return BettingInstance.getWinner(1, {from: accounts[0]})
        }).catch(() => {
          console.log("Error with distributing prizes")
        })
      })
  }




  render(){
        return(
          <div>
            <h3>Accept a Wager</h3>
            <hr/>
            <h5> Enter an Address of Wager Contract</h5>
            <div className="input-group">
                <span className="input-group-addon">@</span>
                <input type="text" className="form-control" onChange={this.handleInputChangeAddress} /> 
            </div>                         
            <br/>
            <button onClick={this.getContract.bind(this)}>View wager Details </button>
            <br/>
            <h5> Better 1: {this.state.better1}</h5>
            <h5> Better 2: {this.state.better2}</h5>
            <h5> Bet Amount: {this.state.betAmount1 / this.state.weiConversion}</h5>
            <h5> Team 1: {this.state.teamName1}</h5>
            <h5> Team 2: {this.state.teamName2}</h5>
            <h5> Pot: {this.state.totalPot}</h5>
            <hr/>
            <button onClick={this.acceptWager}>Accept wager</button>
            <br/>
            <hr/>
            <h5> Select Winner </h5>
            <button onClick={this.makeTeam1win}>Team 1</button>
            <br/>
            <br/>
            <button onClick={this.makeTeam2win}>Team 2</button>
            <br/>
          </div>
        )

    }



}

export default TeamA;