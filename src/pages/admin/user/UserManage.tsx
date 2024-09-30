import {Box, Button, MenuItem, Pagination, Select, Stack, TextField, Typography} from "@mui/material";
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
    field: 'role',
    headerName: 'role',
    width: 200,
  },
  {
    field: 'created',
    headerName: 'created date',
    width: 200,
  }
]

function UserManage() {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    getUserList();
  }, [page, pageSize]);

  // useEffect(() => {
  //   const pageCount = Math.floor(total / pageSize) + (total % pageSize > 0 ? 1 : 0);
  //   setCount(pageCount);
  // }, [pageSize, total]);

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
      setTotal(response.data.totalElements);
      setCount(response.data.totalPages);
    } catch(e) {
      console.log(e);
    }
  }

  const handleEmail = (event: any) => {
    setEmail(event.target.value);
  };

  const handleSize = (event: any) => {
    console.log(event);
    setPageSize(event.target.value)
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Box>
      <Typography variant="h5" sx={{
        mb: 2
      }}>User Management</Typography>

      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2,
      }}>
        <Stack direction="row" alignItems="center">
          <Typography variant="body1" sx={{mr: 2}}>email:</Typography>
          <TextField size="small" label="" variant="outlined" value={email} onChange={handleEmail} />
        </Stack>
        <Button variant="outlined" color="primary" onClick={getUserList}>검  색</Button>
      </Box>

      <Box sx={{
        borderBottom: 1,
        borderColor: 'divider'
      }}>
        <DataGrid columns={columns} rows={users}></DataGrid>
      </Box>

      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        mt: 1,
      }}>
        <Stack direction="row" alignItems="center">
          <Select
            size="small"
            value={pageSize}
            label="size"
            onChange={handleSize}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
          <Typography variant="body1" sx={{ml: 2}}>total: {total}</Typography>
        </Stack>
        <Pagination count={count} page={page} onChange={handleChange} />
      </Box>
    </Box>
  );
}

export default UserManage;
