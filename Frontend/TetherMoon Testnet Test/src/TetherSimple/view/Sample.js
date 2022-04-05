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
    const [newString, setNewString] = useState("");

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
        console.log("pass");
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

    function handlesetStringInput(evt) {
        setNewString(evt.target.value);
    }

    // Get functions

    async function getHello() {
        try {
            const str = await sampleContract.methods.hello().call();
            setResult("");
            setStatus(
                `Hello state variable: ${str}`
            );
        } catch (error) {
            console.log(error);
        }
    }

    // Transactions

    async function setString() {
        setPendingTx(true);
        console.log(newString);
        console.log("type of newString", typeof newString);
        console.log(account);
        console.log("type of account", typeof account);
        try {
            const ret = await sampleContract.methods.setInt(parseInt(newString)).send({
                from: account
            });
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
                                TetherMoon Contract Testing Page
                            </Typography>
                            <Typography textAlign="center" variant="h5">
                                Contract Address on TetherMoon Testnet is
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
                                    onClick={getHello}
                                >
                                    Hello
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
                                        id="gameIDofParticpateInGame"
                                        placeholder="Input new string"
                                        value={newString}
                                        onChange={handlesetStringInput}
                                        style={{ width: "150px", padding: "5px" }}
                                    />
                                </span>
                                <span style={{ marginLeft: "10px", marginRight: "10px" }}>
                                    <Button
                                        style={{ textTransform: "none" }}
                                        onClick={setString}
                                    >
                                        SetString
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
