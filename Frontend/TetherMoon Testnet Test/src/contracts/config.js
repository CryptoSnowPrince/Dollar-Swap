const dotenv = require("dotenv");

dotenv.config();

const config = {
    ArcadeGame: {
        0: '0x0000000000000000000000000000000000000000',
        56: '',
        97: '0x5100179C0BA0f864Ab67561f48d279598F497853',
    },
    AnchorEarnBSC: {
      0: "0x0000000000000000000000000000000000000000",
      56: "0x0EA7C4c6A230e091e930b0E6fD9D5c18a6699Cbc",
      97: "0x80de92df50F270e49bb4E269502D00cAB753A55a",
    },
    StakingVault: {
      0: "0x0000000000000000000000000000000000000000",
      56: "0x07CD66cdc4571aAb645D4819E3A91F61D847792E",
      97: "0xd6861aB260a8c2f060d3E541Df7696dDBC9AB682",
    },
    BlockExplorerURL: {
      56: "https://bscscan.com",
      97: "https://testnet.bscscan.com",
    },
    RpcURL: {
      56: "https://bsc-dataseed1.defibit.io/",
      97: "https://speedy-nodes-nyc.moralis.io/03eb35954a0b7ed092444a8e/bsc/testnet",
    },
    chainHexID: {
      56: "0x38",
      97: "0x61",
    },
    INFURA_ID: process.env.INFURA_ID,
    chainID: 56,
    privateKey: process.env.PRIVATE_KEY,
  };
  
  export default config;
  