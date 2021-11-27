// contract test code will go here
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider()); //ganache provider can be substituted to main net or any other dif networks
const { interface, bytecode } = require('../compile');

let accounts;   // in order to use the simpler code below we have to first state the variable outside the function
                // we must also add async to the beforeEach function below

let inbox;

beforeEach(async () => {
    // Get a list of all accounts
    // web3.eth.getAccounts() //returns a promise
    //     .then(fetchedAccounts => {
    //         console.log(fetchedAccounts);
    // }); Can be re-written better below

    accounts = await web3.eth.getAccounts();    // when executed it will grab the list of account, wait for that request to be completed and then assign 
                                                // that value to accounts.

    // Use one of those accounts to deplot the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))      // this line teaches web3 what methods an Inbox contract has. ABI
        .deploy({ data : bytecode, arguments: ['hi'] })             // tells eth we want to deploy a new copy of this contract.
        .send({ from : accounts[0], gas:'1000000' });               // instructs web3 to send out a transaction that creates this contract.
}); 

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);                           // returns true if there is an address attached to inbox (tells us if deployed)
        console.log('Contract Address: ', inbox.options.address);   // returns the new contract's address in the console.
    });

    // it('prints accounts', () => {
    //     console.log(accounts);                                   // prints list of ganache/main-net accounts.
    // });

    it('has an initial message', async () => {                      // when calling a contract's method we still need the promise to be returned so we need an asynchronous function
        const message = await inbox.methods.message().call();       // contractName.methods.FunctionWeWannaCall(arguments required).call()function
        assert.equal(message, 'hi');
    });

    it('can change the message', async () => {
        await inbox.methods.setMessage('Bye').send({from: accounts[0], gas: 1000000});          // send, sends a tx. since we want to edit data on the contract we have to send a tx.
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Bye');
    })

});