import React, { useState, ChangeEvent } from 'react';
import { TextField, Button, Box, IconButton, InputAdornment } from '@mui/material';
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';

interface PlayerInputsProps {
  onPlaceBet: (points: number, multiplier: number) => void;
}

const PlayerInputs: React.FC<PlayerInputsProps> = ({ onPlaceBet }) => {
  const [points, setPoints] = useState<number>(0);
  const [multiplier, setMultiplier] = useState<number>(1);

  const handlePointsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPoints(parseInt(e.target.value) || 0);
  };

  const handleMultiplierChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMultiplier(parseFloat(e.target.value) || 1);
  };

  const handlePlaceBetClick = () => {
    onPlaceBet(points, multiplier);
    setPoints(0);
    setMultiplier(1);
  };

  const incrementPoints = () => {
    setPoints((prevPoints) => prevPoints + 1);
  };

  const decrementPoints = () => {
    setPoints((prevPoints) => (prevPoints > 0 ? prevPoints - 1 : 0));
  };

  const incrementMultiplier = () => {
    setMultiplier((prevMultiplier) => prevMultiplier + 1);
  };

  const decrementMultiplier = () => {
    setMultiplier((prevMultiplier) => (prevMultiplier > 1 ? prevMultiplier - 1 : 1));
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" gap={2} marginTop={"3vh"}>
        <TextField
          label="Points"
          id="points"
          value={points}
          onChange={handlePointsChange}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton onClick={decrementPoints} sx={{ bgcolor: '#202632', border: '1px solid #fff', borderRadius: '5px', color: '#fff' }}>
                  <IoMdArrowDropdown />
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={incrementPoints} sx={{ bgcolor: '#202632', border: '1px solid #fff', borderRadius: '5px', color: '#fff' }}>
                  <IoMdArrowDropup />
                </IconButton>
              </InputAdornment>
            ),
            sx: {
              color: '#fff',
              backgroundColor: '#15191F',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#202632',
              },
              
            },
          }}
          sx={{
            '& .MuiInputLabel-root': {
              color: '#fff',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#fff',
            },
          }}
        />
        <TextField
          label="Multiplier"
          id="multiplier"
          value={multiplier}
          onChange={handleMultiplierChange}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton onClick={decrementMultiplier} sx={{ bgcolor: '#202632', border: '1px solid #fff', borderRadius: '5px', color: '#fff' }}>
                  <IoMdArrowDropdown />
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={incrementMultiplier} sx={{ bgcolor: '#202632', border: '1px solid #fff', borderRadius: '5px', color: '#fff' }}>
                  <IoMdArrowDropup />
                </IconButton>
              </InputAdornment>
            ),
            sx: {
              color: '#fff',
              backgroundColor: '#15191F',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#202632',
              },
            },
          }}
          sx={{
            '& .MuiInputLabel-root': {
              color: '#fff',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#fff',
            },
          }}
        />
      </Box>
      <Box mt={2}>
        <Button variant="contained" color="primary" fullWidth onClick={handlePlaceBetClick}>
Start        </Button>
      </Box>
    </Box>
  );
};

export default PlayerInputs;
