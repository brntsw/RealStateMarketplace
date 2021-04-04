pragma solidity >=0.4.21 <0.6.0;

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
import './../../zokrates/code/square/verifier.sol';
import './ERC721Mintable.sol';

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is RealestokenERC721Token, Verifier {
    uint indexCounter = 0;

    // TODO define a solutions struct that can hold an index & an address
    struct Solution {
        uint index;
        address sender;
    }

    // TODO define an array of the above struct
    Solution[] public solutions;

    // TODO define a mapping to store unique solutions submitted
    mapping(bytes32 => Solution) public submitted;

    // TODO Create an event to emit when a solution is added
    event Added(uint index, address sender);

    // TODO Create a function to add the solutions to the array and emit the event
    function add(uint[2] memory a, uint[2][2] memory b, uint[2] memory c, uint[2] memory input) public {
        Solution memory newSolution = Solution({
                index: indexCounter++,
                sender: msg.sender
            });
            
        bytes32 key = keccak256(abi.encodePacked(a, b, c, input));
        submitted[key] = newSolution;
        solutions.push(newSolution);
        
        emit Added(newSolution.index, newSolution.sender);
    }

    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSuplly
    function verifyAndMint(uint[2] memory a, uint[2][2] memory b, uint[2] memory c, uint[2] memory input, uint256 tokenId) public {
        bytes32 key = keccak256(abi.encodePacked(a, b, c, input));
        require(submitted[key].sender == address(0), 'The solution has already been submitted');
        require(verifyTx(a, b, c, input), 'The solution is not valid');
        add(a, b, c, input);
        mint(msg.sender, tokenId);
    }
}

  


























