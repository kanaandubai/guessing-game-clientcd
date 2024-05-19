// theme.js
import { createTheme } from '@mui/material/styles';
declare module '@mui/material/styles' {
  interface TypeBackground {
    additional: string; // Define the additional background color
  }
  interface TypeText {
    additional: string; // Define the additional background color
  }
}
const theme = createTheme({
  palette: {
    primary: {
      main: '#007bff', // Your primary color
    },
    secondary: {
      main: '#ffc107', // Your secondary color
    },
    background: {
      default: '#f0f0f0', // Your default background color
      paper: '#15191F', // Your secondary background color
      additional: '#202632', // Additional background color

    },
    text: {
      primary: '#ffffff', // Your primary text color
      secondary: '#F75652', // Your secondary text color
      additional: '#E3397D', // Additional font color

    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif', // Your default font family
    h1: {
      fontFamily: 'Montserrat, sans-serif', // Your heading font family
    },
    // Add more typography settings as needed
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(135deg, #E3397D, #15191F)', // Button gradient
          borderRadius: '8px', // Add border radius if needed
        },
      },
    },
  },
});

export default theme;
