var ERC721MintableComplete = artifacts.require('CustomERC721Token');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    const name = "CustomToken";
    const symbol = "CST";
    const uri = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/";

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new(name, symbol, {from: account_one});

            // TODO: mint multiple tokens
            await this.contract.mint(account_one, 1, { from: account_one });
            await this.contract.mint(account_one, 2, { from: account_one });
            await this.contract.mint(account_one, 3, { from: account_one });
            await this.contract.mint(account_two, 4, { from: account_one });
        })

        it('should return total supply', async function () {
            let totalSupply = await this.contract.totalSupply.call();
            assert.equal(4, totalSupply, "There should be 4 tokens minted.");
        })

        it('should get token balance', async function () { 
            let balanceOne = await this.contract.balanceOf.call(account_one);
            assert.equal(3, balanceOne, "Account_one should have three tokens on its own.");
            let balanceTwo = await this.contract.balanceOf.call(account_two);
            assert.equal(1, balanceTwo, "Account_two should have one token on its own.");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () {
            let tokenUriOne = await this.contract.tokenURI.call(1);
            assert.equal("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1", tokenUriOne, "URI of token with ID = 1 is not correct.");
            let tokenUriTwo = await this.contract.tokenURI.call(2);
            assert.equal("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/2", tokenUriTwo, "URI of token with ID = 2 is not correct.");
            let tokenUriThree = await this.contract.tokenURI.call(3);
            assert.equal("https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/3", tokenUriThree, "URI of token with ID = 3 is not correct.");
        })

        it('should transfer token from one owner to another', async function () {
            try {
                await this.contract.transferFrom(account_one, account_two, 3, { from: account_one });
            } catch(e) {
                console.log('TransferFrom failed.', e);
            }
            const newTokenOwner = await this.contract.ownerOf.call(3);
            assert.equal(newTokenOwner, account_two, 'Token id 3 ownership is not transferred correctly');

            // let ownerOfOne = await this.contract.ownerOf.call(1);
            // console.log("OwnerOfOne: " + ownerOfOne);
            // console.log("Account one: " + account_one);
            // assert.equal(account_one, ownerOfOne, "Oner of token with ID = 1 is not correct.");
            // let ownerOfTwo = await this.contract.ownerOf.call(2);
            // assert.equal(account_two, ownerOfTwo, "Oner of token with ID = 2 is not correct.");
            // let ownerOfThree = await this.contract.ownerOf.call(3);
            // assert.equal(account_two, ownerOfThree, "Oner of token with ID = 3 is not correct.");
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new(name, symbol, { from: account_one });
        })

        it('should fail when minting when address is not contract owner', async function () {
            let accessDenied = false;
            try  {
                await this.contract.mint(account_one, 4, { from: account_two });
            } catch(e) {
                accessDenied = true;
            }
            assert.equal(true, accessDenied, "Mint action not authorized for this account.");
            let balanceTwo = await this.contract.balanceOf.call(account_two);
            assert.equal(0, balanceTwo, "Account_two should have zero token on its own.");
        })

        it('should return contract owner', async function () {
            let owner = await this.contract.getOwner.call();
            assert.equal(account_one, owner, "The contract owner should be account_one.");
        })

    });
})