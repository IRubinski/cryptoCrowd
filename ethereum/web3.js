import Web3 from 'web3';

let web3;
if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  web3 = new Web3(window.web3.currentProvider);
} else {
  // were on the server or user dosent has metamast
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/99aa31551d574456a44bd30ca07b58e5',
  );

  web3 = new Web3(provider);
}

export default web3;
