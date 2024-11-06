import {ChangeEvent, useEffect, useMemo, useRef, useState} from "react";
import customAxios from "../../../utils/customAxios.ts";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem, Pagination,
  Select,
  SelectChangeEvent, Stack,
  Typography
} from "@mui/material";
import {useForm} from "react-hook-form";
import {Input} from "../../../components/Input.tsx";
import ReactQuill from "react-quill";
import {
  DataGrid,
  GridColDef,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowModel,
  GridRowModesModel
} from "@mui/x-data-grid";

interface Category {
  id: number;
  name: string;
}

interface FormValue {
  title: string;
  // content: string;
}

function News() {
  // grid
  const [newsList, setNewsList] = useState([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  // 검색
  const [title, setTitle] = useState('');
  // pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  // news category
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [category, setCategory] = useState<string>('');
  // new title, content
  const { control, handleSubmit, reset } = useForm<FormValue>({
    defaultValues: {
      title: "",
      // content: ""
    },
  });
  const quillRef = useRef<any>(null);
  const [editorHtml, setEditorHtml] = useState<string>('');

  const modules = useMemo(() => ({
    toolbar: { // 툴바 옵션들
      container: [
        [{size: ['small', false, 'large', 'huge']}],
        [{align: []}],
        ['bold', 'italic', 'underline', 'strike'],
        [{list: 'ordered'}, {list: 'bullet'}],
        [{color: []}, {background: []}],
        ["image", "video"],
      ],
      handlers: {
        image: imageHandler
      }
    },
  }), []);

  useEffect(() => {
    getCategoryList();
    getNewsList();
  }, []);

  // grid start --------------------------------------------
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 100,
      // hide: true,
    },
    {
      field: 'title',
      headerName: 'e-mail',
      width: 200,
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
  ]

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
    // setUsers(users.map((manage: any) => (manage.id === newRow.id ? updatedRow : manage)));

    try {
      const response = await customAxios.put("/api/v1/admin/user", newRow);
      console.log(response);
      return updatedRow;
    } catch(e: any) {
      return oldRow;
    }
  };
  // grid end --------------------------------------------

  // pagination start ------------------------------------
  const handleSize = (event: any) => {
    console.log(event);
    setPageSize(event.target.value)
  };

  const handleChangePage = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  // pagination end --------------------------------------

  function imageHandler(){
    const editor = quillRef?.current.getEditor();
    console.log(editor)
    const input: any = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (/^image\//.test(file.type)) {
        console.log(file);
        const formData = new FormData();
        formData.append("type", file.type);
        formData.append("image", file);
        const response = await customAxios.post('/api/v1/demo/image/upload1', formData)
        const url = response.data?.url;
        editor.insertEmbed(editor.getSelection(), "image", url);
      } else {
        console.log('You could only upload images.');
      }
    };
  }

  const getNewsList = async () => {
    const params = {
      title: title,
      page: page-1,
      size: pageSize,
    }
    try {
      const response = await customAxios.get('/api/v1/manager/board/paged_list',
        {params});
      console.log(response);
      setNewsList(response.data.content);
      setTotal(response.data.totalElements);
      setCount(response.data.totalPages);
    } catch(e) {
      console.log(e);
    }
  }

  const getCategoryList = async () => {
    const response = await customAxios.get('/api/v1/admin/category/list');
    console.log(response);
    setCategoryList(response.data);
    if (response.data.length > 0) {
      setCategory(response.data[0].id);
    }
  }

  const handleChangeCategory = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  const handleChangeEditor = (html: any) => {
    setEditorHtml(html);
  }

  // news write
  const onSubmit = async (data: FormValue) => {
    const body = {
      title: data.title,
      content: editorHtml,
      category_id: category,
    }
    const response = await customAxios.post('/api/v1/manager/board', body);
    console.log(response);
    // reset form
    reset({
      title: ''
    });
    setEditorHtml('');
  };

  return (
    <div>
      <FormControl variant="outlined" sx={{ m: 1, minWidth: 200 }} size="small">
        <InputLabel id="news-category-label">News Category</InputLabel>
        <Select labelId="news-category-label"
          value={category} onChange={handleChangeCategory} label="News Category">
          {
            categoryList.map((category) => (<MenuItem value={category.id} key={category.id}>{category.name}</MenuItem>))
          }
        </Select>
      </FormControl>

      <Box sx={{
        borderBottom: 1,
        borderColor: 'divider'
      }}>
        <DataGrid
          columns={columns}
          rows={newsList}
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
        <Pagination count={count} page={page} onChange={handleChangePage} />
      </Box>

      <section>
        <Typography variant="h5" sx={{fontWeight: 'bold'}}>Add News</Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Input
            name="title"
            control={control}
            rules={{
              required: "title is required",
              minLength: {value: 4, message: "Email must be at least 4 characters long"},
              maxLength: {value: 100, message: "Email must be less than 100 characters long"},
            }}
            textFieldProps={{
              label: "title",
              fullWidth: true,
              margin: "normal",
              size: "small"
            }}
          />
          <ReactQuill
            ref={quillRef}
            theme="snow"
            modules={modules}
            value={editorHtml}
            onChange={handleChangeEditor}
            style={{
              width: '100%',
              height: '500px'
            }}
          />
          <Box sx={{pt: 4}}>
            <Button type="submit" fullWidth variant="contained"
                    sx={{ mt: 3 }}>submit</Button>
          </Box>
        </Box>
      </section>
    </div>
  );
}

export default News;