import { useEffect, useState, useReducer, useCallback } from "react";
import Web3Modal from "web3modal";
import Web3 from "web3";
import { providers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import {
    AppBar,
    Toolbar,
    Button,
    Input,
    useTheme,
    Typography,
    ToggleButtonGroup,
    ToggleButton,
} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import sampleABI from "../abi/Sample.json";
import config from "../config";
import "./Sample.css";

const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider, // required
        options: {
            infuraId: config.INFURA_ID, // required
        },
    },
};

const initialState = {
    provider: null,
    web3Provider: null,
    address: null,
    chainId: null,
};

let web3Modal;
if (typeof window !== "undefined") {
    web3Modal = new Web3Modal({
        network: "mainnet", // optional
        cacheProvider: true,
        providerOptions, // required
        theme: "dark",
    });
}

const getAddress = (address) => {
    const chainID = config.chainID;
    return address[chainID] ? address[chainID] : address[0];
};

const web3 = new Web3(window.ethereum);
const sampleContract = new web3.eth.Contract(
    sampleABI,
    config.Sample[config.chainID]
);
function reducer(state, action) {
    switch (action.type) {
        case "SET_WEB3_PROVIDER":
            return {
                ...state,
                provider: action.provider,
                web3Provider: action.web3Provider,
                address: action.address,
                chainId: action.chainId,
            };
        case "SET_ADDRESS":
            return {
                ...state,
                address: action.address,
            };
        case "SET_CHAIN_ID":
            return {
                ...state,
                chainId: action.chainId,
            };
        case "RESET_WEB3_PROVIDER":
            return initialState;
        default:
            throw new Error();
    }
}

export default function Sample(props) {
    const { toggleTheme } = props;
    const theme = useTheme();

    // connect wallet
    const [state, dispatch] = useReducer(reducer, initialState);
    const [showAccountAddress, setShowAccountAddress] = useState("");
    const [account, setAccount] = useState("");
    const [signer, setSigner] = useState();
    const { provider, web3Provider } = state;

    // result values to show
    const [status, setStatus] = useState("");
    const [result, setResult] = useState("");

    // transaction state value
    const [pendingTx, setPendingTx] = useState(false);

    // Handler values
    const [gameLevelOfGetPricePerGame, setGameLevelOfGetPricePerGame] =
        useState("");
    const [gameLevelOfGetGameFee, setGameLevelOfGetGameFee] = useState("");
    const [gameIDOfGetGameInfo, setGameIDOfGetGameInfo] = useState("");
    const [playerAddressOfGetPlayerInfo, setPlayerAddressOfGetGameInfo] =
        useState("");
    const [fee1SetGameFee, setFee1SetGameFee] = useState("");
    const [fee2SetGameFee, setFee2SetGameFee] = useState("");
    const [fee3SetGameFee, setFee3SetGameFee] = useState("");
    const [
        gameKindOfCreateNewGameAndPlayVal,
        setGameKindOfCreateNewGameAndPlayVal,
    ] = useState("");
    const [
        gameLevelOfCreateNewGameAndPlayVal,
        setGameLevelOfCreateNewGameAndPlayVal,
    ] = useState("");
    const [price1ofSetPricePerGameVal, setPrice1ofSetPricePerGameVal] =
        useState("");
    const [price2ofSetPricePerGameVal, setPrice2ofSetPricePerGameVal] =
        useState("");
    const [price3ofSetPricePerGameVal, setPrice3ofSetPricePerGameVal] =
        useState("");
    const [newOwnerofTransferOwnershipVal, setNewOwnerofTransferOwnership] =
        useState("");
    const [gameIDofParticpateInGameVal, setGameIDofParticpateInGameVal] =
        useState("");
    const [
        gameIDofSetGameInfoAndGivePrizeVal,
        setGameIDofSetGameInfoAndGivePrizeVal,
    ] = useState("");
    const [
        gameScoreArrayofSetGameInfoAndGivePrizeVal,
        setGameScoreArrayofSetGameInfoAndGivePrizeVal,
    ] = useState("");
    const [
        winnerIndexofSetGameInfoAndGivePrizeVal,
        setWinnerIndexofSetGameInfoAndGivePrizeVal,
    ] = useState("");
    const [
        loserIndexofSetGameInfoAndGivePrizeVal,
        setLoserIndexofSetGameInfoAndGivePrizeVal,
    ] = useState("");

    const connect = useCallback(async function () {
        console.log("connect wallet");
        try {
            const provider = await web3Modal.connect();
            if (window.ethereum) {
                // check if the chain to connect to is installed
                await window.ethereum.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: config.chainHexID[config.chainID] }], // chainId must be in hexadecimal numbers
                });
            } else {
                alert(
                    "MetaMask is not installed. Please consider installing it: https://metamask.io/download.html"
                );
            }

            const web3Provider = new providers.Web3Provider(provider);
            const signer = web3Provider.getSigner();
            const account = await signer.getAddress();
            const network = await web3Provider.getNetwork();
            const show_address =
                account.slice(0, 5) + "..." + account.slice(-4, account.length);
            setSigner(web3Provider.getSigner());
            setShowAccountAddress(show_address);
            setAccount(account);
            dispatch({
                type: "SET_WEB3_PROVIDER",
                provider,
                web3Provider,
                show_address,
                chainId: network.chainId,
            });
        } catch (error) {
            if (error.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: "wallet_addEthereumChain",
                        params: [
                            {
                                chainId: config.chainHexID[config.chainID],
                                rpcUrl: config.RpcURL[config.chainID],
                            },
                        ],
                    });
                } catch (addError) {
                    console.log(addError);
                }
            } else if (error.code === 4001) {
                console.log(error);
            }
            console.log(`${error}`);
        }
    }, []);

    const disconnect = useCallback(async function () {
        console.log("disconnect wallet");
        await web3Modal.clearCachedProvider();
        setSigner(null);
        setShowAccountAddress(null);
        setAccount(null);
        dispatch({
            type: "RESET_WEB3_PROVIDER",
        });
    }, []);

    useEffect(() => {
        if (web3Modal.cachedProvider) {
            connect();
        }
    }, [connect]);

    useEffect(() => {
        if (provider) {
          const handleAccountsChanged = (accounts) => {
            connect();
            dispatch({
              type: "SET_ADDRESS",
              address: accounts[0],
            });
          };
    
          // https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
          const handleChainChanged = (_hexChainId) => {
            window.location.reload();
          };
    
          provider.on("accountsChanged", handleAccountsChanged);
          provider.on("chainChanged", handleChainChanged);
    
          // Subscription Cleanup
          return () => {
            if (provider.removeListener) {
              provider.removeListener("accountsChanged", handleAccountsChanged);
              provider.removeListener("chainChanged", handleChainChanged);
            }
          };
        }
      }, [connect, provider]);

    // Handlers
    function handleGameLevelOfGetPricePerGameInput(evt) {
        setGameLevelOfGetPricePerGame(evt.target.value);
    }

    function handleGameLevelOfGetGameFeeInput(evt) {
        setGameLevelOfGetGameFee(evt.target.value);
    }

    function handleGameIDOfGetGameInfoInput(evt) {
        setGameIDOfGetGameInfo(evt.target.value);
    }

    function handlePlayerAddressOfGetPlayerInfoInput(evt) {
        setPlayerAddressOfGetGameInfo(evt.target.value);
    }

    function handlefee1SetGameFeeInput(evt) {
        setFee1SetGameFee(evt.target.value);
    }

    function handlefee2SetGameFeeInput(evt) {
        setFee2SetGameFee(evt.target.value);
    }

    function handlefee3SetGameFeeInput(evt) {
        setFee3SetGameFee(evt.target.value);
    }

    function handleGameKindOfCreateNewGameAndPlayValInput(evt) {
        setGameKindOfCreateNewGameAndPlayVal(evt.target.value);
    }

    function handlegameLevelOfCreateNewGameAndPlayValInput(evt) {
        setGameLevelOfCreateNewGameAndPlayVal(evt.target.value);
    }

    function handlePrice1ofSetPricePerGameValInput(evt) {
        setPrice1ofSetPricePerGameVal(evt.target.value);
    }

    function handlePrice2ofSetPricePerGameValInput(evt) {
        setPrice2ofSetPricePerGameVal(evt.target.value);
    }

    function handlePrice3ofSetPricePerGameValInput(evt) {
        setPrice3ofSetPricePerGameVal(evt.target.value);
    }

    function handlenewOwnerofTransferOwnershipValInput(evt) {
        setNewOwnerofTransferOwnership(evt.target.value);
    }

    function handlegameIDofParticpateInGameValInput(evt) {
        setGameIDofParticpateInGameVal(evt.target.value);
    }

    function handlegameIDofSetGameInfoAndGivePrizeValInput(evt) {
        setGameIDofSetGameInfoAndGivePrizeVal(evt.target.value);
    }

    function handlegameScoreArrayofSetGameInfoAndGivePrizeValInput(evt) {
        setGameScoreArrayofSetGameInfoAndGivePrizeVal(evt.target.value);
    }

    function handlewinnerIndexofSetGameInfoAndGivePrizeValInput(evt) {
        setWinnerIndexofSetGameInfoAndGivePrizeVal(evt.target.value);
    }

    function handleloserIndexofSetGameInfoAndGivePrizeValInput(evt) {
        setLoserIndexofSetGameInfoAndGivePrizeVal(evt.target.value);
    }

    // Get functions

    async function getTreasuryWalletAddress() {
        sampleContract.methods
            .TREASURY()
            .call()
            .then((treasury) => {
                setResult("");
                setStatus(
                    `Treasury Wallet must be Multi-sig Wallet. Treasury Wallet Address is ${treasury}.`
                );
            })
            .catch((error) => {
                setStatus(`Something went wrong: ${JSON.stringify(error)}`);
            });
    }

    async function getActiveGameCounter() {
        sampleContract.methods
            .activeGameCounter_()
            .call()
            .then((result) => {
                setResult("");
                setStatus(`The number of game in progress is ${result}.`);
            })
            .catch((error) => {
                setStatus(`Something went wrong: ${JSON.stringify(error)}`);
            });
    }

    async function getGameCounter() {
        sampleContract.methods
            .gameCounter_()
            .call()
            .then((result) => {
                setResult("");
                setStatus(`Total number of game is ${result}.`);
            })
            .catch((error) => {
                setStatus(`Something went wrong: ${JSON.stringify(error)}`);
            });
    }

    async function getPlayerCounter() {
        sampleContract.methods
            .playerCounter_()
            .call()
            .then((result) => {
                setResult("");
                setStatus(`Total number of player is ${result}.`);
            })
            .catch((error) => {
                setStatus(`Something went wrong: ${JSON.stringify(error)}`);
            });
    }

    async function getOwnerOfContract() {
        sampleContract.methods
            .owner()
            .call()
            .then((result) => {
                setResult("");
                setStatus(`Owner of the gaming arcade contract is ${result}.`);
            })
            .catch((error) => {
                setStatus(`Something went wrong: ${JSON.stringify(error)}`);
            });
    }

    async function getOwnInfo() {
        sampleContract.methods
            .getOwnInfo()
            .call({ from: account })
            .then((result) => {
                setResult("");
                setStatus(`Your information is ${result}.`);
            })
            .catch((error) => {
                setStatus(`Something went wrong: ${JSON.stringify(error)}`);
            });
    }

    async function getPricePerGame(level) {

        try {
            const result = await sampleContract.methods
                .PRICE_PER_GAME(parseInt(level))
                .call();
            setResult("");
            setStatus(
                `You must have at least ${web3.utils.fromWei(
                    result
                )} BNB to participate in this game.`
            );
            return web3.utils.fromWei(result);
        } catch (error) {
            setStatus(`Something went wrong: ${JSON.stringify(error)}`);
            return 0;
        }
    }

    async function getGameFee() {

        sampleContract.methods
            .GAME_FEE(parseInt(gameLevelOfGetGameFee))
            .call()
            .then((result) => {
                setResult("");
                setStatus(
                    `Game Fee of Level ${parseInt(
                        gameLevelOfGetGameFee
                    )} is ${result} percent.`
                );
            })
            .catch((error) => {
                setStatus(`Something went wrong: ${JSON.stringify(error)}`);
            });
    }

    async function getGameInfo(gameID) {
        try {
            const result = await sampleContract.methods
                .allGames_(parseInt(gameID))
                .call();
            setResult(result);
            setStatus(`Game Information of ID ${parseInt(gameID)} is as follows:`);
            return result;
        } catch (error) {
            setStatus(`Something went wrong: ${JSON.stringify(error)}`);
        }
    }

    async function getPlayerInfo() {
        if (web3.utils.isAddress(playerAddressOfGetPlayerInfo) !== true) {
            setStatus(`Invalid Address! Please input address correctly.`);
            return;
        }

        sampleContract.methods
            .allPlayers_(playerAddressOfGetPlayerInfo)
            .call()
            .then((result) => {
                console.log(result);
                setResult(result);
                setStatus(
                    `Player Information of Address ${playerAddressOfGetPlayerInfo} is as follows:`
                );
            })
            .catch((error) => {
                setStatus(`Something went wrong: ${JSON.stringify(error)}`);
            });
    }

    // Transactions

    async function setGameFee() {
        setPendingTx(true);
        try {
            const ret = await sampleContract.methods
                .setGameFee(
                    parseInt(fee1SetGameFee),
                    parseInt(fee2SetGameFee),
                    parseInt(fee3SetGameFee)
                )
                .send({
                    from: account,
                });
            setResult(
                `✅ Check out your transaction on bscscan: ${config.BlockExplorerURL[config.chainID]}/tx/${ret.transactionHash}`
            );
            setStatus(`${JSON.stringify(ret)}`);
        } catch (error) {
            setStatus(`Something went wrong: ${JSON.stringify(error)}`);
        }
        setPendingTx(false);
    }

    async function setPricePerGame() {
        setPendingTx(true);
        try {
            const ret = await sampleContract.methods
                .setPricePerGame(
                    web3.utils.toWei(
                        parseFloat(price1ofSetPricePerGameVal).toString(),
                        "ether"
                    ),
                    web3.utils.toWei(
                        parseFloat(price2ofSetPricePerGameVal).toString(),
                        "ether"
                    ),
                    web3.utils.toWei(
                        parseFloat(price3ofSetPricePerGameVal).toString(),
                        "ether"
                    )
                )
                .send({
                    from: account,
                });
            setResult(
                `✅ Check out your transaction on bscscan: ${config.BlockExplorerURL[config.chainID]}/tx/${ret.transactionHash}`
            );
            setStatus(`${JSON.stringify(ret)}`);
        } catch (error) {
            setStatus(`Something went wrong: ${JSON.stringify(error)}`);
        }
        setPendingTx(false);
    }

    async function createNewGameAndPlay() {
        const price = await getPricePerGame(gameLevelOfCreateNewGameAndPlayVal);

        if (parseFloat(price) === 0.0) {
            setStatus(`Fail to get price.`);
            return NaN;
        }

        setPendingTx(true);
        try {
            const ret = await sampleContract.methods
                .createNewGameAndPlay(
                    parseInt(gameKindOfCreateNewGameAndPlayVal),
                    parseInt(gameLevelOfCreateNewGameAndPlayVal)
                )
                .send({
                    from: account,
                    value: web3.utils.toWei(price.toString(), "ether"),
                });
            setResult(`${ret.returnValues.gameID}`); // fix
            setStatus(`${ret.transactionHash}`);
        } catch (error) {
            setStatus(`Something went wrong: ${JSON.stringify(error)}`);
        }
        setPendingTx(false);
    }

    async function particpateInGame() {
        if (parseInt(gameIDofParticpateInGameVal) < 1) {
            setStatus(`Game ID must be greater than 0.`);
            return;
        }
        const gameInfo = await getGameInfo(parseInt(gameIDofParticpateInGameVal));

        if (!gameInfo) {
            setStatus(`Fail to get Game Info.`);
            return;
        } else {
            setStatus(`${gameInfo.gameLevel}`);
        }

        const price = await getPricePerGame(gameInfo.gameLevel);

        if (parseFloat(price) === 0.0) {
            setStatus(`Fail to get price.`);
            return;
        } else {
            setStatus(`${price}`);
        }

        setPendingTx(true);
        try {
            const ret = await sampleContract.methods
                .particpateInGame(parseInt(gameIDofParticpateInGameVal))
                .send({
                    from: account,
                    value: web3.utils.toWei(price.toString(), "ether"),
                });
            setResult(`${JSON.stringify(ret)}`);
            setStatus(`${ret.transactionHash}`);
        } catch (error) {
            setStatus(`Something went wrong: ${JSON.stringify(error)}`);
        }
        setPendingTx(false);
    }

    async function setGameInfoAndGivePrize() {

        const inputArray = gameScoreArrayofSetGameInfoAndGivePrizeVal.split(',');

        setPendingTx(true);
        try {
            const ret = await sampleContract.methods
                .setGameInfoAndGivePrize(
                    parseInt(gameIDofSetGameInfoAndGivePrizeVal),
                    inputArray,
                    parseInt(winnerIndexofSetGameInfoAndGivePrizeVal),
                    parseInt(loserIndexofSetGameInfoAndGivePrizeVal)
                )
                .send({
                    from: account,
                });
            setResult(`${JSON.stringify(ret)}`);
            setStatus(`${ret.transactionHash}`);
        } catch (error) {
            setStatus(`Something went wrong: ${JSON.stringify(error)}`);
        }
        setPendingTx(false);
    }

    async function endGameProject() {


        setPendingTx(true);
        try {
            const ret = await sampleContract.methods
                .endArcadeGameProject()
                .send({ from: account });
            setResult(`${JSON.stringify(ret)}`);
            setStatus(`${ret.transactionHash}`);
        } catch (error) {
            setStatus(`Something went wrong: ${JSON.stringify(error)}`);
        }
        setPendingTx(false);
    }

    async function renounceOwnership() {


        setPendingTx(true);
        try {
            const ret = await sampleContract.methods
                .renounceOwnership()
                .send({ from: account });
            setResult(`${JSON.stringify(ret)}`);
            setStatus(`${ret.transactionHash}`);
        } catch (error) {
            setStatus(`Something went wrong: ${JSON.stringify(error)}`);
        }
        setPendingTx(false);
    }

    async function transferOwnership() {


        if (web3.utils.isAddress(newOwnerofTransferOwnershipVal) !== true) {
            setStatus(`Invalid Address! Please input new owner address correctly.`);
            return;
        }

        setPendingTx(true);
        try {
            const ret = await sampleContract.methods
                .transferOwnership(newOwnerofTransferOwnershipVal)
                .send({ from: account });
            setResult(`${JSON.stringify(ret)}`);
            setStatus(`${ret.transactionHash}`);
        } catch (error) {
            setStatus(`Something went wrong: ${JSON.stringify(error)}`);
        }
        setPendingTx(false);
    }

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <ToggleButtonGroup
                        value={theme.palette.mode}
                        exclusive
                        onChange={(event, value) => {
                            if (value) {
                                toggleTheme(value);
                            }
                        }}
                        sx={{ flexGrow: 1 }}
                    >
                        <ToggleButton
                            value="dark"
                            aria-label="dark"
                            title="Dark Mode"
                            alt="Dark Mode"
                        >
                            <DarkModeIcon />
                        </ToggleButton>
                        <ToggleButton
                            value="light"
                            aria-label="light"
                            title="Light Mode"
                            alt="Light Mode"
                        >
                            <LightModeIcon />
                        </ToggleButton>
                    </ToggleButtonGroup>
                    {web3Provider ? (
                        <div style={{ float: "right", textAlign: "right" }}>
                            <Button onClick={disconnect} style={{ textTransform: "none" }}>
                                {showAccountAddress}
                            </Button>
                        </div>
                    ) : (
                        <Button onClick={connect}>Connect</Button>
                    )}
                </Toolbar>
            </AppBar>
            <div>
                {web3Provider ? (
                    <div
                        style={{
                            textAlign: "center",
                        }}
                    >
                        {/* Title */}
                        <div style={{ margin: "20px" }}>
                            <Typography textAlign="center" variant="h3">
                                Web3 Sample Page
                            </Typography>
                            <Typography textAlign="center" variant="h5">
                                Contract Address on BSC Testnet is
                                {" " + getAddress(config.Sample)}
                            </Typography>
                        </div>

                        {/* Get Functions */}

                        <div style={{ margin: "20px" }}>
                            <Typography textAlign="center" variant="h4">
                                Get Functions
                            </Typography>
                        </div>

                        <div>
                            <div style={{ margin: "20px" }}>
                                <Button
                                    style={{ textTransform: "none" }}
                                    onClick={getTreasuryWalletAddress}
                                >
                                    Treasury Address
                                </Button>
                            </div>

                            <div style={{ margin: "20px" }}>
                                <Button
                                    style={{ textTransform: "none" }}
                                    onClick={getActiveGameCounter}
                                >
                                    Number of Game in Progress
                                </Button>
                            </div>

                            <div style={{ margin: "20px" }}>
                                <Button
                                    style={{ textTransform: "none" }}
                                    onClick={getGameCounter}
                                >
                                    Total Number of Game
                                </Button>
                            </div>

                            <div style={{ margin: "20px" }}>
                                <Button
                                    style={{ textTransform: "none" }}
                                    onClick={getPlayerCounter}
                                >
                                    Total Number of Player
                                </Button>
                            </div>

                            <div style={{ margin: "20px" }}>
                                <Button
                                    style={{ textTransform: "none" }}
                                    onClick={getOwnerOfContract}
                                >
                                    Owner of The Gaming Arcade Contract
                                </Button>
                            </div>

                            <div style={{ margin: "20px" }}>
                                <Button style={{ textTransform: "none" }} onClick={getOwnInfo}>
                                    Your Information
                                </Button>
                            </div>

                            <div style={{ margin: "20px" }}>
                                <span style={{ marginLeft: "10px", marginRight: "10px" }}>
                                    <Input
                                        id="gameLevelofGetPricePerGame"
                                        placeholder="Input Game Level"
                                        value={gameLevelOfGetPricePerGame}
                                        onChange={handleGameLevelOfGetPricePerGameInput}
                                        style={{ width: "150px", padding: "5px" }}
                                    />
                                </span>
                                <Button
                                    style={{ textTransform: "none" }}
                                    onClick={() => getPricePerGame(gameLevelOfGetPricePerGame)}
                                >
                                    BNB Amount as Game Level
                                </Button>
                            </div>

                            <div style={{ margin: "20px" }}>
                                <span style={{ marginLeft: "10px", marginRight: "10px" }}>
                                    <Input
                                        id="gameLevelofGetGameFee"
                                        placeholder="Input Game Level"
                                        value={gameLevelOfGetGameFee}
                                        onChange={handleGameLevelOfGetGameFeeInput}
                                        style={{ width: "150px", padding: "5px" }}
                                    />
                                </span>
                                <Button style={{ textTransform: "none" }} onClick={getGameFee}>
                                    Game Fee as Level
                                </Button>
                            </div>

                            <div style={{ margin: "20px" }}>
                                <span style={{ marginLeft: "10px", marginRight: "10px" }}>
                                    <Input
                                        id="gameIDofGetGameInfo"
                                        placeholder="Input Game ID"
                                        value={gameIDOfGetGameInfo}
                                        onChange={handleGameIDOfGetGameInfoInput}
                                        style={{ width: "150px", padding: "5px" }}
                                    />
                                </span>
                                <Button
                                    style={{ textTransform: "none" }}
                                    onClick={() => getGameInfo(gameIDOfGetGameInfo)}
                                >
                                    Game Information by ID
                                </Button>
                            </div>

                            <div style={{ margin: "20px" }}>
                                <span style={{ marginLeft: "10px", marginRight: "10px" }}>
                                    <Input
                                        id="playerAddressofGetPlayerInfo"
                                        placeholder="Input Player Address"
                                        value={playerAddressOfGetPlayerInfo}
                                        onChange={handlePlayerAddressOfGetPlayerInfoInput}
                                        style={{ width: "420px", padding: "5px" }}
                                    />
                                </span>
                                <Button
                                    style={{ textTransform: "none" }}
                                    onClick={getPlayerInfo}
                                >
                                    Player Information by Address
                                </Button>
                            </div>
                        </div>

                        {/* Transactions */}

                        <div style={{ margin: "20px" }}>
                            <Typography textAlign="center" variant="h4">
                                Transactions
                            </Typography>
                        </div>

                        <div className={pendingTx ? "diabledDiv" : ""}>
                            <div style={{ margin: "20px" }}>
                                <span style={{ marginLeft: "10px", marginRight: "10px" }}>
                                    <Input
                                        id="fee1ofSetGameFee"
                                        placeholder="Input Game Fee of Level 1(Percent)"
                                        value={fee1SetGameFee}
                                        onChange={handlefee1SetGameFeeInput}
                                        style={{ width: "280px", padding: "5px" }}
                                    />
                                </span>
                                <span style={{ marginLeft: "10px", marginRight: "10px" }}>
                                    <Input
                                        id="fee2ofSetGameFee"
                                        placeholder="Input Game Fee of Level 2(Percent)"
                                        value={fee2SetGameFee}
                                        onChange={handlefee2SetGameFeeInput}
                                        style={{ width: "280px", padding: "5px" }}
                                    />
                                </span>
                                <span style={{ marginLeft: "10px", marginRight: "10px" }}>
                                    <Input
                                        id="fee3ofSetGameFee"
                                        placeholder="Input Game Fee of Level 3(Percent)"
                                        value={fee3SetGameFee}
                                        onChange={handlefee3SetGameFeeInput}
                                        style={{ width: "280px", padding: "5px" }}
                                    />
                                </span>
                                <Button style={{ textTransform: "none" }} onClick={setGameFee}>
                                    Set Game Fee
                                </Button>
                            </div>

                            <div style={{ margin: "20px" }}>
                                <span style={{ marginLeft: "10px", marginRight: "10px" }}>
                                    <Input
                                        id="price1ofSetPricePerGame"
                                        placeholder="Input BNB Amount for Level 1"
                                        value={price1ofSetPricePerGameVal}
                                        onChange={handlePrice1ofSetPricePerGameValInput}
                                        style={{ width: "230px", padding: "5px" }}
                                    />
                                </span>
                                <span style={{ marginLeft: "10px", marginRight: "10px" }}>
                                    <Input
                                        id="price2ofSetPricePerGame"
                                        placeholder="Input BNB Amount for Level 2"
                                        value={price2ofSetPricePerGameVal}
                                        onChange={handlePrice2ofSetPricePerGameValInput}
                                        style={{ width: "230px", padding: "5px" }}
                                    />
                                </span>
                                <span style={{ marginLeft: "10px", marginRight: "10px" }}>
                                    <Input
                                        id="price3ofSetPricePerGame"
                                        placeholder="Input BNB Amount for Level 3"
                                        value={price3ofSetPricePerGameVal}
                                        onChange={handlePrice3ofSetPricePerGameValInput}
                                        style={{ width: "230px", padding: "5px" }}
                                    />
                                </span>
                                <Button
                                    style={{ textTransform: "none" }}
                                    onClick={setPricePerGame}
                                >
                                    Set BNB Amount by Level
                                </Button>
                            </div>

                            <div style={{ margin: "20px" }}>
                                <span style={{ marginLeft: "10px", marginRight: "10px" }}>
                                    <Input
                                        id="gameKindOfCreateNewGameAndPlay"
                                        placeholder="Input Game Kind"
                                        value={gameKindOfCreateNewGameAndPlayVal}
                                        onChange={handleGameKindOfCreateNewGameAndPlayValInput}
                                        style={{ width: "150px", padding: "5px" }}
                                    />
                                </span>
                                <span style={{ marginLeft: "10px", marginRight: "10px" }}>
                                    <Input
                                        id="gameLevelOfCreateNewGameAndPlay"
                                        placeholder="Input Game Level"
                                        value={gameLevelOfCreateNewGameAndPlayVal}
                                        onChange={handlegameLevelOfCreateNewGameAndPlayValInput}
                                        style={{ width: "150px", padding: "5px" }}
                                    />
                                </span>
                                <span style={{ marginLeft: "10px", marginRight: "10px" }}>
                                    <Button
                                        style={{ textTransform: "none" }}
                                        onClick={createNewGameAndPlay}
                                    >
                                        Create New Game And Play
                                    </Button>
                                </span>
                            </div>

                            <div style={{ margin: "20px" }}>
                                <span style={{ marginLeft: "10px", marginRight: "10px" }}>
                                    <Input
                                        id="gameIDofParticpateInGame"
                                        placeholder="Input Game ID"
                                        value={gameIDofParticpateInGameVal}
                                        onChange={handlegameIDofParticpateInGameValInput}
                                        style={{ width: "120px", padding: "5px" }}
                                    />
                                </span>
                                <span style={{ marginLeft: "10px", marginRight: "10px" }}>
                                    <Button
                                        style={{ textTransform: "none" }}
                                        onClick={particpateInGame}
                                    >
                                        Particpate In Game
                                    </Button>
                                </span>
                            </div>

                            <div style={{ margin: "20px" }}>
                                <span style={{ marginLeft: "10px", marginRight: "10px" }}>
                                    <Input
                                        id="gameIDofSetGameInfoAndGivePrize"
                                        placeholder="Input Game ID"
                                        value={gameIDofSetGameInfoAndGivePrizeVal}
                                        onChange={handlegameIDofSetGameInfoAndGivePrizeValInput}
                                        style={{ width: "120px", padding: "5px" }}
                                    />
                                </span>
                                <span style={{ marginLeft: "10px", marginRight: "10px" }}>
                                    <Input
                                        id="gameScoreArrayofSetGameInfoAndGivePrize"
                                        placeholder="Input Game Score Array(For example: 10,20,30)"
                                        value={gameScoreArrayofSetGameInfoAndGivePrizeVal}
                                        onChange={
                                            handlegameScoreArrayofSetGameInfoAndGivePrizeValInput
                                        }
                                        style={{ width: "400px", padding: "5px" }}
                                    />
                                </span>
                                <span style={{ marginLeft: "10px", marginRight: "10px" }}>
                                    <Input
                                        id="winnerIndexofSetGameInfoAndGivePrize"
                                        placeholder="Input Winner Index"
                                        value={winnerIndexofSetGameInfoAndGivePrizeVal}
                                        onChange={
                                            handlewinnerIndexofSetGameInfoAndGivePrizeValInput
                                        }
                                        style={{ width: "150px", padding: "5px" }}
                                    />
                                </span>
                                <span style={{ marginLeft: "10px", marginRight: "10px" }}>
                                    <Input
                                        id="loserIndexofSetGameInfoAndGivePrize"
                                        placeholder="Input Loser Index"
                                        value={loserIndexofSetGameInfoAndGivePrizeVal}
                                        onChange={handleloserIndexofSetGameInfoAndGivePrizeValInput}
                                        style={{ width: "150px", padding: "5px" }}
                                    />
                                </span>
                                <span style={{ marginLeft: "10px", marginRight: "10px" }}>
                                    <Button
                                        style={{ textTransform: "none" }}
                                        onClick={setGameInfoAndGivePrize}
                                    >
                                        Set Game Info And Give Prize
                                    </Button>
                                </span>
                            </div>

                            <div style={{ margin: "20px" }}>
                                <span style={{ marginLeft: "10px", marginRight: "10px" }}>
                                    <Button
                                        style={{ textTransform: "none", backgroundColor: "red" }}
                                        onClick={endGameProject}
                                    >
                                        Game Contract Destruct
                                    </Button>
                                </span>
                            </div>

                            <div style={{ margin: "20px" }}>
                                <span style={{ marginLeft: "10px", marginRight: "10px" }}>
                                    <Button
                                        style={{ textTransform: "none", backgroundColor: "red" }}
                                        onClick={renounceOwnership}
                                    >
                                        Renounce Ownership
                                    </Button>
                                </span>
                            </div>

                            <div style={{ margin: "20px" }}>
                                <span style={{ marginLeft: "10px", marginRight: "10px" }}>
                                    <Input
                                        id="newOwnerofTransferOwnership"
                                        placeholder="Input New Owner Address"
                                        value={newOwnerofTransferOwnershipVal}
                                        onChange={handlenewOwnerofTransferOwnershipValInput}
                                        style={{ width: "420px", padding: "5px" }}
                                    />
                                </span>
                                <span style={{ marginLeft: "10px", marginRight: "10px" }}>
                                    <Button
                                        style={{ textTransform: "none", backgroundColor: "red" }}
                                        onClick={transferOwnership}
                                    >
                                        Transfer Ownership
                                    </Button>
                                </span>
                            </div>
                        </div>

                        <div style={{ margin: "20px" }}>
                            <Typography textAlign="center" variant="h5">
                                {status}
                            </Typography>
                        </div>
                        <div style={{ margin: "20px" }}>
                            <Typography textAlign="center" variant="h5">
                                {result ? JSON.stringify(result) : ""}
                            </Typography>
                        </div>
                    </div>
                ) : (
                    <div
                        style={{
                            position: "absolute",
                            left: "50%",
                            top: "35%",
                            transform: "translate(-50%, -50%)",
                            textAlign: "center",
                        }}
                    >
                        <Typography variant="h2">Connect your wallet.</Typography>
                        <br />
                        <Button
                            onClick={connect}
                            variant="outlined"
                            style={{ fontWeight: "bold" }}
                        >
                            Connect
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
}
