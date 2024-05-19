import React, { useState } from "react";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Box,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface ChatProps {
  messages: { player: string; message: string }[]; // Update messages prop to include player name
  sendMessage: (message: string) => void;
}

const Chat: React.FC<ChatProps> = ({ messages, sendMessage }) => {
  const theme = useTheme();
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim() === "") return; // Avoid sending empty messages
    sendMessage(message);
    setMessage("");
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.additional,
        height: "200px",
        overflowY: "auto",
        borderRadius: 2,
        boxShadow: 3,
        p: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <List
        sx={{
          flex: "1 1 auto",
          maxHeight: "calc(100% - 56px)",
          overflow: "auto",
        }}
      >
        {messages.map((msg, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={
                <Typography>
                  <Typography
                    component="span"
                    variant="subtitle2"
                    sx={{ color: theme.palette.text.additional,fontSize: "0.8rem"  }}
                  >
                    {msg.player}:
                  </Typography>{" "}
                  <Typography
                    component="span"
                    sx={{ color: theme.palette.text.primary,fontSize: "0.8rem"  }}
                  >
                    {msg.message}
                  </Typography>
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <TextField
          label="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          fullWidth
          variant="outlined"
          margin="normal"
          sx={{fontSize: "0.8rem" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSendMessage}
          sx={{ ml: 1,fontSize: "0.8rem"  }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default Chat;
