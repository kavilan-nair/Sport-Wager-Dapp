
import React, { Component } from 'react';
import {Grid,Row,Col} from 'react-bootstrap';
// import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import getWeb3 from './utils/getWeb3.js';
import BettingContract from './contracts/Betting.json';
import './App.css';



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

    // this.getAmount = this.getAmount.bind(this);
    // this.Bet = this.Bet.bind(this);
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
    //Get the contract
//     const contract = require('truffle-contract');
//     const Betting = contract(BettingContract);
//     Betting.setProvider(web3.currentProvider);
//     var BettingInstance;
//     web3.eth.getAccounts((error, accounts) => {
//     Betting.deployed().then((instance) => {

//       //Instantiate the contract in a promise
//       BettingInstance = instance

//     }).then((result) => {
//       //Calling the AmountOne function of the smart-contract
//     //   return BettingInstance.AmountOne.call({from: accounts[0]})
//     }).then((result) => {
//       //Then the value returned is stored in the Amount state var.
//       //Divided by 10000 to convert in ether.
//       this.setState({
//         Amount : result.c / 10000
//       })
//     });
//   })
  }

//   handleInputChange(e) {
//     this.setState({InputAmount: e.target.value*this.state.weiConversion});
//   }

    clickME(){
        console.log("I have been clicked")
    }

  Bet(){
    const contract = require('truffle-contract');
    const Betting = contract(BettingContract);
    Betting.setProvider(this.state.web3.currentProvider);
    var BettingInstance;
    this.state.web3.eth.getAccounts((error, accounts) => {
        Betting.deployed().then((instance) => {
          BettingInstance = instance
        }).then((result) => {
          // Get the value from the contract to prove it worked.
          return BettingInstance.bet(1, {from: accounts[0],
          value: this.state.InputAmount})
        }).catch(() => {
          console.log("Error with betting")
        })
      })
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
          return BettingInstance.distributePrizes(1, {from: accounts[0]})
        }).catch(() => {
          console.log("Error with distributing prizes")
        })
      })
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
                <input type="text" className="form-control" onChange={this.clickME} /> 
            </div>                         
            <br/>
            <button onClick={this.Bet}>Accept Bet</button>
            <br/>
            <hr/>
          </div>
        )

    }



}

export default TeamA;