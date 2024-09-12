import {AppBar, Badge, Box, IconButton, Toolbar, Typography} from "@mui/material";
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

function Header() {
  return (
    <AppBar position="sticky" sx={{bgcolor: 'neutral.light'}}>
      <Toolbar>
        <IconButton>
          <MenuTwoToneIcon />
        </IconButton>
        <Box
          component="img"
          src="https://mui.com/static/logo.png" alt="logo"
          sx={{
            width: '2rem'
          }}/>
        <Typography variant="h6" color="primary" sx={{ml: 2}}>Admin Site</Typography>
        <Box sx={{flexGrow: 1}} />
        <IconButton>
          <Badge badgeContent={5} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton>
          <SettingsIcon />
        </IconButton>
        <IconButton>
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

/** @type {import("@mui/material").SxProps} */
// const styles = {
//   appBar: {
//     bgcolor: 'neutral.main',
//   }
// }

export default Header;
