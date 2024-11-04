import {Menu, MenuItem, Sidebar} from "react-pro-sidebar";
import PersonIcon from '@mui/icons-material/Person';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import {NavLink} from "react-router-dom";
import {Typography, useTheme} from "@mui/material";
import {useSelector} from "react-redux";

function SideNav() {
  const theme = useTheme();
  const collapsed = useSelector((state: any) => state.admin.collapsed);

  const titleStyle = {
    fontWeight: 600,
    pl: 2,
    pt: 2,
  };

  const menuStyle = {
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
  };

  return (
    <Sidebar style={{
      height: '100%',
      top: 'auto',
    }} breakPoint="md" backgroundColor={theme.palette.neutral.light} collapsed={collapsed}>
      <Typography variant="h6" sx={titleStyle}>Management</Typography>
      <Menu menuItemStyles={menuStyle}>
        <MenuItem component={<NavLink to="/admin/user" />} active icon={<PersonIcon />}>사용자 관리</MenuItem>
        <MenuItem component={<NavLink to="/admin/category" />} active icon={<PersonIcon />}>카테고리 관리</MenuItem>
      </Menu>
      <Typography variant="h6" sx={titleStyle}>Contents</Typography>
      <Menu menuItemStyles={menuStyle}>
        <MenuItem component={<NavLink to="/admin/news" />} active icon={<ManageAccountsIcon />}>News 관리</MenuItem>
      </Menu>
    </Sidebar>
  );
}

export default SideNav;
