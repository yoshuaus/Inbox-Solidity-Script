// deploy code will go here
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
    'mnemonic goes here',
    'https://rinkeby.infura.io/v3/e807e76ce0e24d9b830c6f74ca4dfacc'
);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to Deploy from Account:', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hello Sol'] })
        .send({ gas: '1000000', from: accounts[0] });

    console.log('Contract Deployed to:', result.options.address);
    provider.engine.stop();
};
deploy();