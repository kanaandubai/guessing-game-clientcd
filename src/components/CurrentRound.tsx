import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { GiTrophyCup } from "react-icons/gi";
import { useTheme } from '@mui/material/styles';

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

interface CurrentRoundProps {
  players: Player[];
}

const CurrentRound: React.FC<CurrentRoundProps> = ({ players }) => {
  const theme = useTheme();

  const cellStyle = {
    border: 'none', // Remove border from cells
  };

  return (
    <div style={{ height: '200px', overflowY: 'scroll' }}>
      <Typography variant="h6" color={theme.palette.text.primary}><GiTrophyCup color={theme.palette.text.additional}/> Current Round</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={cellStyle}>Name</TableCell>
            <TableCell style={cellStyle}>Points</TableCell>
            <TableCell style={cellStyle}>Guess Points</TableCell>
            <TableCell style={cellStyle}>Guess Multiplier</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map((player, index) => (
            <TableRow key={player.id} style={{ backgroundColor: index % 2 === 0 ? theme.palette.background.additional: theme.palette.background.paper  }}>
              <TableCell style={cellStyle}>{player.name}</TableCell>
              <TableCell style={cellStyle}>{player.points}</TableCell>
              <TableCell style={cellStyle}>{player.guess?.points}</TableCell>
              <TableCell style={cellStyle}>{player.guess?.multiplier}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CurrentRound;
