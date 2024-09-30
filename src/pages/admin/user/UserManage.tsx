import {Box, Typography} from "@mui/material";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {useEffect, useState} from "react";
import customAxios from "../../../utils/customAxios.ts";

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

/*const users = [
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
];*/

function UserManage() {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    getUserList();
  }, [email, page, pageSize]);

  const getUserList = async () => {
    const params = {
      email: email,
      page: page-1,
      size: pageSize,
    }
    try {
      const response = await customAxios.get('/api/v1/admin/user/paged_list',
        {params});
      console.log(response);
      setUsers(response.data.content);
    } catch(e) {
      console.log(e);
    }
  }

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
