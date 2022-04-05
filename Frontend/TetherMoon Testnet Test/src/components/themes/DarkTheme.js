import { createTheme } from '@mui/material/styles';
const darkTheme = createTheme({
  palette: {
    mode:'dark',
    primary: {
      main: '#a4ffa1',
      light: '#42f5a1',
      dark : '#59c456',
    }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          border: '1px solid #a4ffa1',
        },
      },
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          backgroundColor: '#121212',
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
export default darkTheme
