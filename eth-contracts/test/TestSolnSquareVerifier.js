var CustomERC721Token = artifacts.require('CustomERC721Token');
var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');

contract('TestSolnSquareVerifier', async(accounts) => {
    beforeEach(async function () { 
        this.solnSquareVerifier = await SolnSquareVerifier.new({from: accounts[0]});
        this.contract = await CustomERC721Token.new({from: accounts[0]});  
    });

    // Test if a new solution can be added for contract - SolnSquareVerifier
    it('a new solution can be added for contract', async function () { 
        let a = ["0x00f3c6739bd6582a14a426b43f3c7dd1a82051f4174cd738c4d70e500ea9c7b3",
                    "0x0c601baa13b3f38516e7f0b27ed644fb36cf833c3e40b0018ccd588cca2a3f2e"];

        let b = [
            ["0x127a1bef749e4fdac7b4465d726239bcb546ebe70e58f1078038a123bdf43ed7",
            "0x00097ac97825a7f11c20c113ed88dca12793d3bc16241d863238521b275d5bf0"],
            ["0x2eced7c5aaeedd6e5eb44cbfb981385726b3a57ec61f7a909287cd50e509a411",
            "0x0da4fee8872d5f225eca77daef7c6b93ff421a564e5d4dd2cc55935a4618b34e"]
        ];
        let c = ["0x04256c19529a883485d47ad25f3cd68d5ca934e988683802b8637f4f0f2b14c9",
                "0x2c5493e29ee807342c6bee40f59f10827edefb2b3d82db9b4fd7f51899d233bc"];
        let inputs = ["0x00000000000000000000000000000000000000000000000000000000000d995b",
                    "0x0000000000000000000000000000000000000000000000000000000000000000"];

        await this.solnSquareVerifier.add(a, b, c, inputs, {from: accounts[0]});

        let solutions = await this.solnSquareVerifier.solutions(0);
        assert.equal(0, solutions.index, "One solution should be added with index 0.");
        assert.equal(accounts[0], solutions.sender, "One solution should be added by msg.sender.");
    })

    // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
    it('an ERC721 token can be minted for contract', async function () { 
        let a = ["0x00f3c6739bd6582a14a426b43f3c7dd1a82051f4174cd738c4d70e500ea9c7b3",
                    "0x0c601baa13b3f38516e7f0b27ed644fb36cf833c3e40b0018ccd588cca2a3f2e"];

        let b = [
            ["0x127a1bef749e4fdac7b4465d726239bcb546ebe70e58f1078038a123bdf43ed7",
            "0x00097ac97825a7f11c20c113ed88dca12793d3bc16241d863238521b275d5bf0"],
            ["0x2eced7c5aaeedd6e5eb44cbfb981385726b3a57ec61f7a909287cd50e509a411",
            "0x0da4fee8872d5f225eca77daef7c6b93ff421a564e5d4dd2cc55935a4618b34e"]
        ];
        let c = ["0x04256c19529a883485d47ad25f3cd68d5ca934e988683802b8637f4f0f2b14c9",
                "0x2c5493e29ee807342c6bee40f59f10827edefb2b3d82db9b4fd7f51899d233bc"];
        let inputs = ["0x00000000000000000000000000000000000000000000000000000000000d995b",
                    "0x0000000000000000000000000000000000000000000000000000000000000000"];

        let tokenId = 2;

        await this.solnSquareVerifier.verifyAndMint(a, b, c, inputs, tokenId, {from: accounts[0]});

        let solutions = await this.solnSquareVerifier.solutions(0);
        assert.equal(0, solutions.index, "One solution should be added with index 0.");
        assert.equal(accounts[0], solutions.sender, "One solution should be added by msg.sender.");

        let totalSupply = await this.solnSquareVerifier.totalSupply.call();
        assert.equal(1, totalSupply, "There should be three tokens minted.");

        let balance = await this.solnSquareVerifier.balanceOf.call(accounts[0]);
        assert.equal(1, balance, "Account_two should have one token on its own.");
    })
})
