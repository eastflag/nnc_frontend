import {Box, Button, MenuItem, Pagination, Select, Stack, TextField, Typography} from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridEventListener, GridRowEditStopReasons,
  GridRowId, GridRowModel,
  GridRowModes,
  GridRowModesModel
} from "@mui/x-data-grid";
import {ChangeEvent, useEffect, useState} from "react";
import customAxios from "../../../utils/customAxios.ts";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import {useConfirm} from "material-ui-confirm";

function UserManage() {
  // grid
  const [users, setUsers] = useState([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  // 검색
  const [email, setEmail] = useState('');
  // pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  // material-ui-confirm
  const confirm = useConfirm();

  useEffect(() => {
    getUserList();
  }, [page, pageSize]);

  // useEffect(() => {
  //   const pageCount = Math.floor(total / pageSize) + (total % pageSize > 0 ? 1 : 0);
  //   setCount(pageCount);
  // }, [pageSize, total]);

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const deleteRow = async (id: GridRowId) => {
    const response = await customAxios.delete(`/api/v1/admin/user/${id}`);
    console.log(response);
  }

  const handleDeleteClick =  (id: GridRowId) => () => {
    console.log(id);
    // setRows(rows.filter((row) => row.id !== id));
    confirm({ description: `Are you sure to want to delete ${id}` })
      .then(() => {
        deleteRow(id);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    // const editedRow = rows.find((row) => row.id === id);
    // if (editedRow!.isNew) {
    //   setRows(rows.filter((row) => row.id !== id));
    // }
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    console.log('handleRowModesModelChange', newRowModesModel);
    setRowModesModel(newRowModesModel);
  };

  const  handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    console.log('handleRowEditStop');
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const processRowUpdate = async (newRow: GridRowModel, oldRow: GridRowModel) => {
    // add or update
    console.log('processRowUpdate: ', newRow);
    const updatedRow = { ...newRow, isNew: false };
    // setUsers(users.map((user: any) => (user.id === newRow.id ? updatedRow : user)));

    try {
      const response = await customAxios.put("/api/v1/admin/user", newRow);
      console.log(response);
      return updatedRow;
    } catch(e: any) {
      return oldRow;
    }
  };

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
      editable: true,
    },
    {
      field: 'role',
      headerName: 'role',
      width: 200,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['ADMIN', 'MANAGER', 'USER'],
    },
    {
      field: 'created',
      headerName: 'created date',
      width: 200,
    },
    {
      field: 'updated',
      headerName: 'updated date',
      width: 200,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ]

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

  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
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
        <DataGrid
          columns={columns}
          rows={users}
          editMode="row"  /* row 전체가 edit 모드로 된다. 컬럼 더블클릭시 actions가 바뀐다. */
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
        />
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
