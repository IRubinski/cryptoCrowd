const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");

const provider = new HDWalletProvider();
// Replace with mnemonic phrase,
// Replace with infura api endpoint

const web3 = new Web3(provider);

//We use a function so we can use async
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempt to deploy from accounts", accounts[0]);
  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: "1000000", from: accounts[0] });

  console.log("Contract deployed to:", result.options.address);
};

deploy();
