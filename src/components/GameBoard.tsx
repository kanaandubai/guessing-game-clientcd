import React from 'react';
import { Typography } from '@mui/material';

interface GameBoardProps {
  multiplier: number;
}

const GameBoard: React.FC<GameBoardProps> = ({ multiplier }) => {
  return (
    <div>
      <Typography variant="h5">Multiplier: {multiplier}</Typography>
      {/* Graph component to visualize multiplier would go here */}
    </div>
  );
};

export default GameBoard;
