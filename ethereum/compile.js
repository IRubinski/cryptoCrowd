const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, 'contracts' , 'Campaign.sol');
console.log(campaignPath, 'campaignPath');
const source = fs.readFileSync(campaignPath , 'utf8');
const output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath); // Check if exist if not create one
console.log(buildPath, 'buildPath');
for (let contract in output) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract.replace(':','') + '.json'),
        output[contract]
        );
}


 