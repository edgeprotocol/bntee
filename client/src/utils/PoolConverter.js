import Web3 from 'web3'
const LiquidityPoolConverter = require('../contracts/LiquidityPoolV1Converter.json');
const CURRENT_NETWORK = Number(process.env.REACT_APP_NETWORK_ID);

let RPC_URL = process.env.REACT_APP_MAINNET_PROVIDER_URL;
let BNT_ADDRESS = process.env.REACT_APP_BNT_TOKEN_MAINNET;

if (CURRENT_NETWORK === 3) {
  RPC_URL = process.env.REACT_APP_ROPSTEN_PROVIDER_URL;
  BNT_ADDRESS = process.env.REACT_APP_BNT_TOKEN_ROPSTEN;
}

const providerWeb3 = new Web3(new Web3.providers.HttpProvider(RPC_URL));
  
export function getTokenListMeta(products) {
  const ProductMetadata = products.map(function(pItem){
    const ConverterContract = new providerWeb3.eth.Contract(LiquidityPoolConverter, pItem.converterAddress);
    return ConverterContract.methods.reserveBalance(pItem.tokenAddress).call().then(function(pItemBalance) {
      return ConverterContract.methods.reserveBalance(BNT_ADDRESS).call().then(function(bntBalance) {
        const pItemBalanceValue = Number(pItemBalance) / Math.pow(10, 8)
        const bntBalanceValue = providerWeb3.utils.fromWei(bntBalance)
        const reserves = {'main': parseFloat(pItemBalanceValue), 'reserve': parseFloat(bntBalanceValue)}
        return Object.assign({}, pItem, {'reserves': reserves});
      });
    })
  });
  return Promise.all(ProductMetadata).then(function(metaResponse){
    return metaResponse;
  })
}