# Football-Wager

### Overview
Football-Wager is a project that was inspired by some of the bets I take with my friends during the FIFA World Cup and Premier League matches. I often take a bet that is in the form of me backing one team and a friend backing another. This is often much less confusing than the odds the bookies place on matches, a simple all or nothing bet with a friend. 

A Football-Wager can be created by using the interface provided by the frontend created in this repo in conjuction with Metamask. Enter in your friends address, the two names of the teams that the two of you support and the desired ether amount to bet. Once the contract is deployed, your friend can access the contract by using its address and accepting the bet. 

The idea and vision for this project was to use an oracle to provide the winner of the desired football match so that the smart contract could act on this real world outcome. This funcitonality was not achieved due to difficulties faced when implementing it and due to time constraints. In absentia of this feature a function was implemented to simulate this behaviour by passing in 1 or 2 to determine who won the bet.

### How to run project 
Please ensure that you have truffle, ganache and npm installed. Please clone this repository and cd into the directory. Please then enter the following commands to run the code:

```
npm install
```
Please launch ganahce-cli or ganache gui and run on localhost: HTTP://127.0.0.1:8545. Enter the following command to compile the contract, migrate and test.

```
truffle compile
truffle migrate
truffle test
```
In order to run the dapp frontend, please have metamask installed and connected to the local ganache instance. Run the following command and then navigate to http://localhost:3000/.

```
npm start
```

Here you can interact with contract through a web interface and sign transactions with metamask.




### 
