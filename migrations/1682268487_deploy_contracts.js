const CryptoSender = artifacts.require("sendo");

module.exports = function(deployer) {
  deployer.deploy(CryptoSender);
};