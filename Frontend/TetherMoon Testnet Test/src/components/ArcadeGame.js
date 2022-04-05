import { useWeb3React } from "@web3-react/core";
import {
  AppBar,
  Toolbar,
  Button,
  Input,
  useTheme,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Icon,
} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import arcadeGameABI from "../contracts/abi/ArcadeGame.json";
import config from "../contracts/config";
import { useEffect, useState } from "react";
import "./ArcadeGame.css";

export default function ArcadeGame(props) {
  const { toggleTheme } = props;
  const theme = useTheme();

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

  const { active, library, account, chainId, activate, deactivate } =
    useWeb3React();
  var showAccount = account + "";
  showAccount =
    showAccount.substring(0, 3) +
    "..." +
    showAccount.substring(showAccount.length - 4, showAccount.length);

  useEffect(() => {
    if (config.chainID !== chainId && active)
      alert("Change network to BSC mainnet!");
  }, [chainId, active]);

  const getAddress = (address) => {
    const chainID = config.chainID;
    return address[chainID] ? address[chainID] : address[0];
  };

  async function connect() {
    console.log("connect");
    // try {
    //   await activate(injected);
    // } catch (err) {
    //   console.error(err);
    // }
  }

  async function disconnect() {
    // try {
    //   deactivate();
    // } catch (err) {
    //   console.error(err);
    // }
  }

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
    const arcadeGameContract = new library.eth.Contract(
      arcadeGameABI,
      getAddress(config.ArcadeGame)
    );
    arcadeGameContract.methods
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
    const arcadeGameContract = new library.eth.Contract(
      arcadeGameABI,
      getAddress(config.ArcadeGame)
    );
    arcadeGameContract.methods
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
    const arcadeGameContract = new library.eth.Contract(
      arcadeGameABI,
      getAddress(config.ArcadeGame)
    );
    arcadeGameContract.methods
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
    const arcadeGameContract = new library.eth.Contract(
      arcadeGameABI,
      getAddress(config.ArcadeGame)
    );
    arcadeGameContract.methods
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
    const arcadeGameContract = new library.eth.Contract(
      arcadeGameABI,
      getAddress(config.ArcadeGame)
    );
    arcadeGameContract.methods
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
    const arcadeGameContract = new library.eth.Contract(
      arcadeGameABI,
      getAddress(config.ArcadeGame)
    );
    arcadeGameContract.methods
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
    const arcadeGameContract = await new library.eth.Contract(
      arcadeGameABI,
      getAddress(config.ArcadeGame)
    );
    try {
      const result = await arcadeGameContract.methods
        .PRICE_PER_GAME(parseInt(level))
        .call();
      setResult("");
      setStatus(
        `You must have at least ${library.utils.fromWei(
          result
        )} BNB to participate in this game.`
      );
      return library.utils.fromWei(result);
    } catch (error) {
      setStatus(`Something went wrong: ${JSON.stringify(error)}`);
      return 0;
    }
  }

  async function getGameFee() {
    const arcadeGameContract = new library.eth.Contract(
      arcadeGameABI,
      getAddress(config.ArcadeGame)
    );
    arcadeGameContract.methods
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
    const arcadeGameContract = await new library.eth.Contract(
      arcadeGameABI,
      getAddress(config.ArcadeGame)
    );
    try {
      const result = await arcadeGameContract.methods
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
    const arcadeGameContract = new library.eth.Contract(
      arcadeGameABI,
      getAddress(config.ArcadeGame)
    );

    if (library.utils.isAddress(playerAddressOfGetPlayerInfo) !== true) {
      setStatus(`Invalid Address! Please input address correctly.`);
      return;
    }

    arcadeGameContract.methods
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
    const arcadeGameContract = await new library.eth.Contract(
      arcadeGameABI,
      getAddress(config.ArcadeGame)
    );
    setPendingTx(true);
    try {
      const ret = await arcadeGameContract.methods
        .setGameFee(
          parseInt(fee1SetGameFee),
          parseInt(fee2SetGameFee),
          parseInt(fee3SetGameFee)
        )
        .send({
          from: account,
        });
      setResult(
        `✅ Check out your transaction on bscscan: ${config.BlockExplorerURL[chainId]}/tx/${ret.transactionHash}`
      );
      setStatus(`${JSON.stringify(ret)}`);
    } catch (error) {
      setStatus(`Something went wrong: ${JSON.stringify(error)}`);
    }
    setPendingTx(false);
  }

  async function setPricePerGame() {
    const arcadeGameContract = await new library.eth.Contract(
      arcadeGameABI,
      getAddress(config.ArcadeGame)
    );
    setPendingTx(true);
    try {
      const ret = await arcadeGameContract.methods
        .setPricePerGame(
          library.utils.toWei(
            parseFloat(price1ofSetPricePerGameVal).toString(),
            "ether"
          ),
          library.utils.toWei(
            parseFloat(price2ofSetPricePerGameVal).toString(),
            "ether"
          ),
          library.utils.toWei(
            parseFloat(price3ofSetPricePerGameVal).toString(),
            "ether"
          )
        )
        .send({
          from: account,
        });
      setResult(
        `✅ Check out your transaction on bscscan: ${config.BlockExplorerURL[chainId]}/tx/${ret.transactionHash}`
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

    const arcadeGameContract = await new library.eth.Contract(
      arcadeGameABI,
      getAddress(config.ArcadeGame)
    );

    setPendingTx(true);
    try {
      const ret = await arcadeGameContract.methods
        .createNewGameAndPlay(
          parseInt(gameKindOfCreateNewGameAndPlayVal),
          parseInt(gameLevelOfCreateNewGameAndPlayVal)
        )
        .send({
          from: account,
          value: library.utils.toWei(price.toString(), "ether"),
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

    const arcadeGameContract = await new library.eth.Contract(
      arcadeGameABI,
      getAddress(config.ArcadeGame)
    );

    setPendingTx(true);
    try {
      const ret = await arcadeGameContract.methods
        .particpateInGame(parseInt(gameIDofParticpateInGameVal))
        .send({
          from: account,
          value: library.utils.toWei(price.toString(), "ether"),
        });
      setResult(`${JSON.stringify(ret)}`);
      setStatus(`${ret.transactionHash}`);
    } catch (error) {
      setStatus(`Something went wrong: ${JSON.stringify(error)}`);
    }
    setPendingTx(false);
  }

  async function setGameInfoAndGivePrize() {
    const arcadeGameContract = await new library.eth.Contract(
      arcadeGameABI,
      getAddress(config.ArcadeGame)
    );

    const inputArray = gameScoreArrayofSetGameInfoAndGivePrizeVal.split(',');

    setPendingTx(true);
    try {
      const ret = await arcadeGameContract.methods
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
    const arcadeGameContract = await new library.eth.Contract(
      arcadeGameABI,
      getAddress(config.ArcadeGame)
    );

    setPendingTx(true);
    try {
      const ret = await arcadeGameContract.methods
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
    const arcadeGameContract = await new library.eth.Contract(
      arcadeGameABI,
      getAddress(config.ArcadeGame)
    );

    setPendingTx(true);
    try {
      const ret = await arcadeGameContract.methods
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
    const arcadeGameContract = await new library.eth.Contract(
      arcadeGameABI,
      getAddress(config.ArcadeGame)
    );

    if (library.utils.isAddress(newOwnerofTransferOwnershipVal) !== true) {
      setStatus(`Invalid Address! Please input new owner address correctly.`);
      return;
    }

    setPendingTx(true);
    try {
      const ret = await arcadeGameContract.methods
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
          {active ? (
            <div style={{ float: "right", textAlign: "right" }}>
              <Button onClick={disconnect} style={{ textTransform: "none" }}>
                {showAccount}
              </Button>
            </div>
          ) : (
            <Button onClick={connect}>Connect</Button>
          )}
        </Toolbar>
      </AppBar>
      <div>
        {active ? (
          <div
            style={{
              textAlign: "center",
            }}
          >
            {/* Title */}
            <div style={{ margin: "20px" }}>
              <Typography textAlign="center" variant="h3">
                Gaming Arcade Contract Testing Page
              </Typography>
              <Typography textAlign="center" variant="h5">
                Contract Address on BSC Testnet is
                {" " + getAddress(config.ArcadeGame)}
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
              startIcon={
                <Icon style={{ height: "4vh", width: "4vh" }}>
                  <img
                    src="./img/Logo_MetaMask.svg"
                    alt=""
                    style={{
                      verticalAlign: "top",
                      height: "4vh",
                      width: "4vh",
                    }}
                  />
                </Icon>
              }
            >
              Connect to MetaMask
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
