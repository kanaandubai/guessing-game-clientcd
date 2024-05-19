import React, { useState } from 'react';
import { TextField, Button, Typography, Box, useTheme } from '@mui/material';

interface JoinGameProps {
  joinGame: (name: string) => void;
}

const JoinGame: React.FC<JoinGameProps> = ({ joinGame }) => {
  const [name, setName] = useState('');
  const theme = useTheme();

  const handleJoin = () => {
    if (name.trim() !== '') {
      joinGame(name.trim());
    }
  };

  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      position={"absolute"}
      marginTop={'3vh'}
      width="35vw" 
      zIndex={'99'}
      height="350px"
      sx={{
        backgroundColor: theme.palette.background.additional, // Use a suitable color from the theme
        boxShadow: theme.shadows[4], // Use a shadow level from the theme
        p: 4, // Add padding
        marginLeft:-3,
        borderRadius: 2, // Add border radius for rounded corners
      }}
    >
      <Typography variant="h4" align="center" sx={{ mb: 2,color:"#424b60" }}>
        Welcome
      </Typography>
      <Typography variant="body1" align="center" sx={{ mb: 2,color:"#424b60",textTransform:"capitalize" }}>
        plese insert your name
      </Typography>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        sx={{ mb: 2,color:"#424b60" }}
        InputProps={{
            sx: {
              '& .MuiInputBase-input::placeholder': {
                color: '#424b60',
                opacity: 1, // Ensure the opacity is set to 1 to see the color
              },
            },
          }}
      />
      <Button 
        variant="contained" 
        color="primary" 
        fullWidth 
        onClick={handleJoin}
        sx={{backgroundColor:"#202632"}}
      >
        Accept
      </Button>
    </Box>
  );
};

export default JoinGame;
