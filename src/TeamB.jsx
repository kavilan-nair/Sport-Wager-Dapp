
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
    this.load = this.load.bind(this);
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




  laod(){
    // const contract = require('truffle-contract');
    // const Betting = contract(BettingContract);
    // Betting.setProvider(this.state.web3.currentProvider);
    // var BettingInstance;
    // this.state.web3.eth.getAccounts((error, accounts) => {
    //     Betting.deployed().then((instance) => {
    //       BettingInstance = instance
    //     }).then((result) => {
    //       // Get the value from the contract to prove it worked.
    //       return BettingInstance.bet(1, {from: accounts[0],
    //       value: this.state.InputAmount})
    //     }).catch(() => {
    //       console.log("Error with betting")
    //     })
    //   })
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
            <h3>Accept a Wager</h3>
            <hr/>
            <h5> Enter an Address of Wager Contract</h5>
            <div className="input-group">
                <span className="input-group-addon">@</span>
                <input type="text" className="form-control" onChange={this.clickME} /> 
            </div>                         
            <br/>
            <button onClick={this.Bet}>View wager Details</button>
            <br/>
            <hr/>
            <button onClick={this.Bet}>Accept wager</button>
            <br/>
          </div>
        )

    }



}

export default TeamA;