var Betting = artifacts.require("./Betting.sol");

module.exports = function(deployer) {
  deployer.deploy(Betting, 0xf17f52151EbEF6C7334FAD080c5704D77216b732, "", "");
};