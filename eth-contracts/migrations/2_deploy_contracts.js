// migrating the appropriate contracts
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier");
var Verifier = artifacts.require("./Verifier");

module.exports = function(deployer) {
  deployer.deploy(SolnSquareVerifier);
  deployer.deploy(Verifier);
};
