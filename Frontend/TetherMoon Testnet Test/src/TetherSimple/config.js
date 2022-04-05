const dotenv = require("dotenv");

dotenv.config();

const config = {
    Sample: {
        56: '',
        97: '',
        159: '0xe191BF2b08929546feFf169EFa9F53b073645c8a',
        // 159: '0x3CBf85D25d912efD8599AFa37CFdA9E4ba44b1Be',
    },
    BlockExplorerURL: {
        56: "https://bscscan.com",
        97: "https://testnet.bscscan.com",
        159: "https://explorer.tethermoon.io/",
    },
    RpcURL: {
        wss: {
            1: "wss://mainnet.infura.io/ws/v3/9254bae6432742babcfc7d367c7e77cd",
        },
        https: {
            1: "https://mainnet.infura.io/v3/9254bae6432742babcfc7d367c7e77cd",
            56: "https://bsc-dataseed1.defibit.io/",
            97: "https://speedy-nodes-nyc.moralis.io/03eb35954a0b7ed092444a8e/bsc/testnet",
            159: "https://preseed-testnet-1.tethermoon.io/",
        },
    },
    chainHexID: {
        56: "0x38",
        97: "0x61",
        159: "0x9F",
    },
    INFURA_ID: process.env.INFURA_ID,
    chainID: 159,
    privateKey: process.env.PRIVATE_KEY,
};

export default config;
