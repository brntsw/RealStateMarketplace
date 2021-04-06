// migrating the appropriate contracts
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier");
var Verifier = artifacts.require("./Verifier");
var CustomERC721Token = artifacts.require("./CustomERC721Token");

module.exports = function(deployer) {
  deployer.deploy(SolnSquareVerifier);
  deployer.deploy(Verifier);
  deployer.deploy(CustomERC721Token);
};
