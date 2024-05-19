import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, Slider, Box } from "@mui/material";
import { IoIosSpeedometer } from "react-icons/io";
import io, { Socket } from "socket.io-client";
import CurrentRound from "./components/CurrentRound";
import Ranking from "./components/Ranking";
import Chat from "./components/Chat";
import GameChart from "./components/GameChart";
import { useTheme } from "@mui/material/styles";
import { IoMdChatboxes } from "react-icons/io";
import { FaRankingStar } from "react-icons/fa6";
import { FaMedal } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import { FcAlarmClock } from "react-icons/fc";
import PlayerInputs from "./components/PlayerInput";
import JoinGame from "./components/JoinGame";
import KeyValuePair from "./components/KeyValuePair";

const socket: Socket = io("http://localhost:3000", {
  transports: ["websocket", "polling"],
});

interface Player {
  id: string;
  name: string;
  points: number;
  guess?: {
    points: number;
    multiplier: number;
  };
  totalPoints: number;
}

interface RoundData {
  name: string;
  multiplier: number;
}

const App: React.FC = () => {
  const theme = useTheme();
  const defaultBackground = theme.palette.background.paper;
  const [players, setPlayers] = useState<Player[]>([]);
  const [multiplier, setMultiplier] = useState<number>(1);
  const [messages, setMessages] = useState<{ player: string; message: string }[]>([]);
  const [roundResult, setRoundResult] = useState<{ name: string; multiplier: number } | null>(null);
  const [speed, setSpeed] = useState<number>(0);
  const [rounds, setRounds] = useState<RoundData[]>([]);
  const [playerId, setPlayerId] = useState<string>("");
  const [playerName, setPlayerName] = useState<string>("");

  const handleSpeedChange = (event: Event, newValue: number | number[]) => {
    setSpeed(newValue as number);
  };

  const marks = [
    { value: 1, label: "1x" },
    { value: 2, label: "2x" },
    { value: 3, label: "3x" },
    { value: 4, label: "4x" },
    { value: 5, label: "5x" },
  ];

  useEffect(() => {
    socket.on("players", (players: Player[]) => {
      setPlayers(players);
    });

    socket.on("multiplier", (multiplier: number) => {
      setMultiplier(multiplier);
    });

    socket.on("chat", (message: { player: string; message: string }) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { player: message.player, message: message.message },
      ]);
    });

    socket.on("roundResult", (result: { name: string; multiplier: number }) => {
      console.log("Round result received:", result);
      setRoundResult(result);
    });

    socket.on("chartUpdate", (data: { multiplier: number }) => {
      setRounds((prevRounds) => [
        ...prevRounds,
        { name: `${prevRounds.length}`, multiplier: data.multiplier },
      ]);
    });

    return () => {
      socket.off("players");
      socket.off("multiplier");
      socket.off("chat");
      socket.off("roundResult");
      socket.off("chartUpdate");
    };
  }, []);

  const calculateWinner = () => {
    if (!roundResult) {
      console.log("No round result available");
      return null;
    }

    let closestPlayerId = "";
    let closestDifference = Infinity;

    players.forEach((player) => {
      if (player.guess) {
        const difference = Math.abs(player.guess.multiplier - roundResult.multiplier);
        console.log(`Player ${player.name} difference: ${difference}`);
        if (difference < closestDifference) {
          closestDifference = difference;
          closestPlayerId = player.id;
        }
      }
    });

    console.log("Closest difference:", closestDifference);

    const winner = players.find((player) => player.id === closestPlayerId);
    if (winner) {
      console.log("Winner:", winner.name);
    } else {
      console.log("No winner found");
    }

    return winner;
  };

  useEffect(() => {
    if (roundResult) {
      const winner = calculateWinner();
      console.log("Winner:", winner);
    }
  }, [roundResult, players]);

  const joinGame = (name: string) => {
    const newPlayerId = `player-${Date.now()}`;
    setPlayerId(newPlayerId);
    setPlayerName(name);
    socket.emit("join", { playerId: newPlayerId, name, points: 100 });
  };

  const handlePlaceBet = (points: number, multiplier: number) => {
    if (!playerId) return;

    // Emit bet for the current player
    socket.emit("guess", { playerId, guess: { points, multiplier } });

    // Emit fake bets for other players
    players.forEach((player) => {
      if (player.id !== playerId) {
        const fakePoints = Math.floor(Math.random() * 100) + 1;
        const fakeMultiplier = Math.floor(Math.random() * 5) + 1;
        socket.emit("guess", { playerId: player.id, guess: { points: fakePoints, multiplier: fakeMultiplier } });
      }
    });
  };

  const setGameSpeed = (value: number) => {
    setSpeed(value);
    socket.emit("setSpeed", { speed: value });
  };

  const sendMessage = (message: string) => {
    if (!playerId) return;
    socket.emit("chat", { playerId, message });
  };

  const startRound = () => {
    socket.emit("startRound");
  };

  useEffect(() => {
    const data1: RoundData[] = [
      { name: "0", multiplier: 0 },
      { name: "1", multiplier: 1 },
      { name: "8", multiplier: 8 },
      { name: "9", multiplier: 9 },
      { name: "10", multiplier: 44 },
    ];
    setRounds(data1);
  }, []);

  return (
    <Box sx={{ backgroundColor: defaultBackground }}>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            {playerName ? (
              <PlayerInputs onPlaceBet={handlePlaceBet} />
            ) : (
              <JoinGame joinGame={joinGame} />
            )}
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ display: "flex", flexDirection: "row", marginTop: "1vh" }}>
              <KeyValuePair icon={<FaMedal />} value="Value" />
              <KeyValuePair icon={<FaUserTie />} value="Value" />
              <KeyValuePair icon={<FcAlarmClock />} value="Value" />
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid container spacing={1} mt={2}>
            <Grid item xs={6}>
              <CurrentRound players={players} />
              <Typography variant="h6" sx={{ color: theme.palette.text.primary, marginTop: "1vh" }}>
                <IoIosSpeedometer color={theme.palette.text.additional} /> Speed
              </Typography>
              <Box sx={{ backgroundColor: theme.palette.background.additional }} padding={2} borderRadius={2}>
                <Slider
                  value={speed}
                  onChange={handleSpeedChange}
                  min={1}
                  max={5}
                  step={1}
                  marks={marks}
                  valueLabelDisplay="auto"
                  sx={{ color: theme.palette.text.additional }}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <div style={{ margin: "0", height: "100%", display: "flex", flexDirection: "column" }}>
                <div style={{ flex: 1 }}>
                  <GameChart rounds={rounds} animationSpeed={speed} />
                </div>
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={1} mt={0}>
            <Grid item xs={6}>
              <FaRankingStar size={25} color={theme.palette.text.additional} />
              <Ranking players={players} />
            </Grid>
            <Grid item xs={6}>
              <IoMdChatboxes size={25} color={theme.palette.text.additional} />
              <Chat messages={messages} sendMessage={sendMessage} />
            </Grid>
          </Grid>
          {roundResult && (
            <Grid container spacing={1} mt={2}>
              <Grid item xs={12}>
                <Typography variant="h5" sx={{ color: theme.palette.text.primary }}>
                  Winner: {calculateWinner()?.name || "No winner"}
                </Typography>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default App;
