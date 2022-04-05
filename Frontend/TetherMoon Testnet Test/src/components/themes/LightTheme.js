import { createTheme } from '@mui/material/styles';
const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          border: '2px solid #173a61',
        },
      },
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          backgroundColor: '#173a61',
          borderBottom: '1px solid #173a61',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained', 
      },
    },
  },
});
export default lightTheme

