const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ from: accounts[0], gas: '1000000'  });

        await factory.methods.createCampaign('100').send({
            from: accounts[0],
            gas: '1000000'
        });
        // es6 descructing an array . take the first element from the array that returns from getDepoloyedCampaigns and assing it to the variable campaignAddress
        [campaignAddress] = await factory.methods.getDeployedCampaigns().call();

        campaign = new web3.eth.Contract(
            JSON.parse(compiledCampaign.interface), 
            campaignAddress
        );
});


describe('Campaign', () => {

    it('shuold have address if deployed', () => {
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
    });

    it('marks caller as campaign manager', async () => {
        const manager = await campaign.methods.manager().call();
        assert.equal(accounts[0], manager);
    });

    it('allow pepole to contribue money and marks them as approvers', async () => {
        await campaign.methods.contribute().send({
            value: '200',
            from: accounts[2]
        });

       const isContributor =  await campaign.methods.approvers(accounts[2]).call();
       assert(isContributor);
    });

    it('require minimum to contribute', async () => {
        try {
            await campaign.methods.contribute().send({
                value: '50',
                from: accounts[3]
            });

            assert(false);
        } catch (err) {
            assert(err);
        }
    });

    it('allow a manger to take a payment request',async () => {
        await campaign.methods
            .createRequest("Buy Pie", '100', accounts[1])
            .send({
                from: accounts[0],
                gas:'1000000'
        });
        const request = await campaign.methods.requests(0).call();
        assert.equal('Buy Pie', request.description);
    });

    it('process request' ,async () => {
        await campaign.methods.contribute().send({
            from: accounts[0],
            value: web3.utils.toWei('10', 'ether')
        });
        await campaign.methods
            .createRequest('A', web3.utils.toWei('5', 'ether'), accounts[1])
            .send({ from: accounts[0], gas:'1000000' });

        await campaign.methods.approveRequest(0).send({
            from: accounts[0],
            gas: '1000000'
        });

        await campaign.methods.finalizeRequest(0).send({
            from: accounts[0],
            gas: '100000'
        });

        let balance = await web3.eth.getBalance(accounts[1]);
        balance = web3.utils.fromWei(balance,'ether');
        balance = parseFloat(balance);
        console.log(balance);
        // an assemption of 
        assert(balance > 104);
    });

});