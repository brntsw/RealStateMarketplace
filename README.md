# Udacity Blockchain Capstone

The capstone will build upon the knowledge you have gained in the course in order to build a decentralized housing product.

# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)

## About the project

This Dapp is a house listing service

### Problems to solve

- Property titles are often paper-based, creating opportunities for errors and fraud
- Title professionals find defects in 25% of all titles during the transaction process, according to the American Land Title Association
- Any identified defect makes it illegal to transfer a property title to a buyer until it's rectified (property owners often incur high legal fees to ensure authenticity and accuracy of their property titles).
- Title fraud poses a risk to homeowners worldwide. US losses associated with title fraud reportedly averaged around $ 103,000 per case in 2015, compelling many property buyers to purchase title insurance.

### Solution

The title management issues could potentially be mitigated by using Blockchain technology to build immutable digital records of land titles and using blockchain for transparent transactions. This approach could simplify property title management, making it more transparent and helping to reduce the risk of title fraud and the need for additional insurance.
Some companies and governments around the globe have already implemented blockchain technology for the title management process.

### Steps of the project
- Mint own tokens to represent the title to the properties
    - Before minting a token, it's needed to verify the owner of the property
    - It's used zkSNARKs to create a verification system which can prove I have title to the property without revealing that specific information on the property
- After the token as been verified I will place it on blockchain market place (Open sea) for others to purchase.

### About OpenSea
This is a descentralized marketplace used for selling crypto assets that are powered off Ethereum.
It's used in this project to list the property tokens for sale.