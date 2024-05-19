import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Typography, Box, Paper } from '@mui/material';
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

interface RankingProps {
  players: Player[];
}

const Ranking: React.FC<RankingProps> = ({ players }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        borderRadius: 2,
        boxShadow: 3,
        p: 2,
        mt: 0,
        height: '200px',
        overflowY: 'hidden', // Enable vertical scrolling
      }}
    >
      <Paper sx={{ marginBottom: '8px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', border: 'none' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', border: 'none' }}>Total Points</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players
              .sort((a, b) => b.totalPoints - a.totalPoints)
              .map((player, index) => (
                <TableRow
                  key={player.id}
                  sx={{
                    backgroundColor: index % 2 === 0 ? theme.palette.background.additional : theme.palette.background.paper,
                  }}
                >
                  <TableCell sx={{ border: 'none' }}>{player.name}</TableCell>
                  <TableCell sx={{ border: 'none' }}>{player.totalPoints}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default Ranking;
