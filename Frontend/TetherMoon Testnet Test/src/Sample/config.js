const dotenv = require("dotenv");

dotenv.config();

const config = {
    Sample: {
        56: '',
        97: '0x5100179C0BA0f864Ab67561f48d279598F497853',
    },
    BlockExplorerURL: {
        56: "https://bscscan.com",
        97: "https://testnet.bscscan.com",
    },
    RpcURL: {
        wss: {
            1: "wss://mainnet.infura.io/ws/v3/9254bae6432742babcfc7d367c7e77cd",
        },
        https: {
            1: "https://mainnet.infura.io/v3/9254bae6432742babcfc7d367c7e77cd",
            56: "https://bsc-dataseed1.defibit.io/",
            97: "https://speedy-nodes-nyc.moralis.io/03eb35954a0b7ed092444a8e/bsc/testnet",
        },
    },
    chainHexID: {
        56: "0x38",
        97: "0x61",
    },
    INFURA_ID: process.env.INFURA_ID,
    chainID: 97,
    privateKey: process.env.PRIVATE_KEY,
};

export default config;
