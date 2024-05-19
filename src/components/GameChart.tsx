import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis } from 'recharts';
import { useTheme } from '@mui/material/styles';

interface RoundData {
  name: string;
  multiplier: number;
}

interface GameChartProps {
  rounds: RoundData[];
  animationSpeed: number; // New prop for animation speed
}

const GameChart: React.FC<GameChartProps> = ({ rounds, animationSpeed }) => {
  const theme = useTheme();

  return (  
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={rounds}>
        <XAxis dataKey="name" domain={[0, 10]} />
        <Line
          type="monotone"
          dataKey="multiplier"
          stroke={theme.palette.text.additional}
          label={false}
          dot={false}
          animationDuration={animationSpeed *100} // Set animation duration here
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default GameChart;
