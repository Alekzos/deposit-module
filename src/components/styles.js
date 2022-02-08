import { createTheme } from '@mui/material/styles';


const customStyles = createTheme({
    components: {
      MuiButtonBase: {
        styleOverrides: {
          root: {
            borderRadius:'16px !important',
            height: '32px',
            backgroundColor:'rgba(0, 0, 0, 0.08)',
            paddingLeft: '12px',
            paddingRight: '12px',
          },
        },
      },
    },
  });

export default customStyles;