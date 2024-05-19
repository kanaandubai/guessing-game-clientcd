import React, { ReactNode } from 'react';
import { Box, Typography, Grid } from '@mui/material';

interface KeyValuePairProps {
  icon: ReactNode;
  value: string | number;
}

const KeyValuePair: React.FC<KeyValuePairProps> = ({ icon, value }) => (
  <Grid container alignItems="center" spacing={1}>
    <Grid item xs={12}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        border={"2px solid 202632"}
        borderRadius={2}
        p={2}
        width="98%"
        boxSizing="border-box"
        margin="1vw"
        sx={{
          background: 'linear-gradient(45deg, #202632, #15191F)',
        }}
      >
        {icon && <span>{icon}</span>}
        <Typography variant="body1" sx={{ marginLeft: icon ? 1 : 0,color:'#fff' }}>{value}</Typography>
      </Box>
    </Grid>
  </Grid>
);

export default KeyValuePair;
