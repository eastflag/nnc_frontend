import {Box, Typography} from "@mui/material";
import {DataGrid, GridColDef} from "@mui/x-data-grid";

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 100,
    // hide: true,
  },
  {
    field: 'email',
    headerName: 'e-mail',
    width: 200,
  },
  {
    field: 'nickname',
    headerName: 'nickname',
    width: 200,
  },
  {
    field: 'created',
    headerName: 'created date',
    width: 200,
  }
]

const users = [
  {
    id: 1,
    email: 'eastflag@gmail.com',
    nickname: 'eastflag',
    created: '2024-09-12 15:31:59.012345'
  },
  {
    id: 2,
    email: 'user1@gmail.com',
    nickname: 'user1',
    created: '2024-09-12 15:30:59.012345'
  }
];

function UserManage() {
  return (
    <Box>
      <Typography variant="h5" sx={{
        mb: 2
      }}>User Management</Typography>
      <Box sx={{
        borderBottom: 1,
        borderColor: 'divider'
      }}>
        <DataGrid columns={columns} rows={users}></DataGrid>
      </Box>
    </Box>
  );
}

export default UserManage;
