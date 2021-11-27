// compile code will go here

const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol'); // will generate a path that connects directly to the inbox.sol file
const source = fs.readFileSync(inboxPath, 'utf8');// reads in content of file

module.exports = solc.compile(source, 1).contracts[':Inbox']; //specify the amount of contracts we need to compile