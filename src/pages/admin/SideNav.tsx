import {Menu, MenuItem, Sidebar} from "react-pro-sidebar";
import PersonIcon from '@mui/icons-material/Person';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import {NavLink} from "react-router-dom";
import {Typography, useTheme} from "@mui/material";

function SideNav() {
  const theme = useTheme();

  return (
    <Sidebar style={{
      height: '100%',
      top: 'auto',
    }} breakPoint="md" backgroundColor={theme.palette.neutral.light}>
      <Typography variant="h6" sx={{
        fontWeight: 600,
        pl: 2,
        pt: 2,
      }}>User</Typography>
      <Menu menuItemStyles={{
        button: {
          // the active class will be added automatically by react router
          // so we can use it to style the active menu item
          [`&.active`]: {
            backgroundColor: '#366391',
            color: '#b6c8d9',
          },
          [`&:hover`]: {
            backgroundColor: '#6485a8',
            color: '#b6c8d9',
          },
        },
      }}>
        <MenuItem component={<NavLink to="/admin/user-manage" />} active icon={<PersonIcon />}>사용자 관리</MenuItem>
        <MenuItem component={<NavLink to="/admin/role-manage" />} active icon={<ManageAccountsIcon />}>권한 관리</MenuItem>
      </Menu>
    </Sidebar>
  );
}

export default SideNav;
