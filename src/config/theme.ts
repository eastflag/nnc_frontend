import {createTheme} from "@mui/material";
import {grey} from "@mui/material/colors";

// 팔레트에 사용자 변수를 추가하기 위한 Module Agmentation
// https://mui.com/material-ui/customization/palette/
declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
  }

  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
  }
}

const theme = createTheme({
  palette: {
    // primary: {
    //   main: '#FF5733',
    // light: will be calculated from palette.primary.main,
    // dark: will be calculated from palette.primary.main,
    // contrastText: will be calculated to contrast with palette.primary.main
    // },
    // 변수 추가
    neutral: {
      main: grey[500],
      light: grey[50],
      dark: grey[900],
      contrastText: grey['A100'],
    },
    background: {
      paper: '#ffffff',
    },
    text: {
      primary: '#173A5E',
      secondary: '#46505A',
    },
    action: {
      active: '#001E3C',
    }
  },
  typography: {
    fontSize: 16
  },
});

// typography 커스터마이징
// https://mui.com/material-ui/customization/typography/
// theme.typography.h3 = {
//   fontSize: '1.2rem',
//   '@media (min-width:600px)': {
//     fontSize: '1.5rem',
//   },
//   [theme.breakpoints.up('md')]: {
//     fontSize: '2.4rem',
//   },
// };

console.log(theme);

export {theme}
