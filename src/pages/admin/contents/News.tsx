import {ChangeEvent, useEffect, useMemo, useRef, useState} from "react";
import customAxios from "../../../utils/customAxios.ts";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Stack, TextField,
  Typography
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {useForm} from "react-hook-form";
import {Input} from "../../../components/Input.tsx";
import ReactQuill from "react-quill";
import {DataGrid, GridColDef, GridRowParams, useGridApiRef} from "@mui/x-data-grid";
import {toastActions} from "../../../store/toastSlice.ts";
import {useDispatch} from "react-redux";

interface Category {
  id: number;
  name: string;
}

interface UpdateFormValue {
  title: string;
  // content: string;
}

interface FormValue {
  title: string;
  // content: string;
}

function News() {
  const dispatch = useDispatch();
  // grid
  const [newsList, setNewsList] = useState([]);
  // 검색
  const [title, setTitle] = useState('');
  // pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  // news category
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState<string>('');

  useEffect(() => {
    getCategoryList();
  }, []);

  useEffect(() => {
    getNewsList();
  }, [categoryId])

  // grid start --------------------------------------------
  const apiRef = useGridApiRef();
  const [selectedRowId, setSelectedRowId] = useState<number>(0);

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

  const handleRowClick = (e: GridRowParams) => {
    console.log(e);
    console.log('selected: ', apiRef.current.isRowSelected(e.id));

    // click 이벤트가 select 이벤트 보다 먼저 일어난다.
    if (!apiRef.current.isRowSelected(e.id)) {
      // update form binding
      getNews(e.id as number);
    } else {
      // reset update form
      setValue("title", "");
      setUpdateEditorHtml("");
      setSelectedRowId(0);
    }
  }

  const getNews = async (id: number) => {
    try {
      const response = await customAxios.get(`/api/v1/manager/board/${id}`);
      console.log(response);
      setUpdateEditorHtml(response.data.content);
      setValue("title", response.data.title);
      setSelectedRowId(id);
    } catch(e) {
      console.log(e);
    }
  }
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

  // Update News start-----------------------------------------
  const updateQuillRef = useRef<any>(null);
  const [updateEditorHtml, setUpdateEditorHtml] = useState<string>('');
  const { control: updateControl, handleSubmit: handleUpdateSubmit, setValue } = useForm<UpdateFormValue>({
    defaultValues: {
      title: "",
      // content: ""
    },
  });

  const updateModules = useMemo(() => ({
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
        image: updateImageHandler
      }
    },
  }), []);

  function updateImageHandler(){
    const editor = updateQuillRef?.current.getEditor();
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

  const handleUpdateChangeEditor = (html: any) => {
    setUpdateEditorHtml(html);
  }

  const onUpdateSubmit = async (data: FormValue) => {
    if (!selectedRowId) {
      return;
    }

    const body = {
      id: selectedRowId,
      title: data.title,
      content: updateEditorHtml,
    }
    const response = await customAxios.put('/api/v1/manager/board', body);
    console.log(response);
    // reset form
    // updateReset({
    //   title: ''
    // });
    // setUpdateEditorHtml("");
    // refresh grid
    getNewsList();
    // toast
    dispatch(toastActions.open({
      isOpened: true,
      severity: 'success',
      message: 'update success'
    }));
  };
  // Update News end -----------------------------------------------

  // Add News start-----------------------------------------
  const quillRef = useRef<any>(null);
  const [editorHtml, setEditorHtml] = useState<string>('');
  const { control, handleSubmit, reset } = useForm<FormValue>({
    defaultValues: {
      title: "",
      // content: ""
    },
  });

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

  const handleChangeEditor = (html: any) => {
    setEditorHtml(html);
  }

  const onSubmit = async (data: FormValue) => {
    const body = {
      title: data.title,
      content: editorHtml,
      category_id: categoryId,
    }
    const response = await customAxios.post('/api/v1/manager/board', body);
    console.log(response);
    // reset form
    reset({
      title: '',
    });
    setEditorHtml('');
    // refresh grid
    getNewsList();
    // toast
    dispatch(toastActions.open({
      isOpened: true,
      severity: 'success',
      message: 'news created!!'
    }));
  };
  // Add News end -----------------------------------------------

  const handleChangeTitle = (event: any) => {
    setTitle(event.target.value);
  };

  const getNewsList = async () => {
    if (!categoryId) {
      return;
    }

    const category = categoryList.find((category: Category) => category.id === parseInt(categoryId));

    const params = {
      title: title,
      page: page-1,
      size: pageSize,
      categoryName: category?.name,
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
      setCategoryId(response.data[0].id);
    }
  }

  const handleChangeCategory = (event: SelectChangeEvent) => {
    setCategoryId(event.target.value);
  };

  return (
    <Box id="news">
      {/*제목*/}
      <Grid container spacing={1}>
        <Grid size="auto">
          <Typography variant="h5" sx={{
            mb: 2
          }}>News Management</Typography>
        </Grid>
        <Grid size="grow">
        </Grid>
        <Grid size="auto">
          <FormControl variant="outlined" sx={{ m: 1, minWidth: 200 }} size="small">
            <InputLabel id="news-category-label">News Category</InputLabel>
            <Select labelId="news-category-label"
                    value={categoryId} onChange={handleChangeCategory} label="News Category">
              {
                categoryList.map((category) => (<MenuItem value={category.id} key={category.id}>{category.name}</MenuItem>))
              }
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* 검색 */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2,
      }}>
        <Stack direction="row" alignItems="center">
          <Typography variant="body1" sx={{mr: 2}}>title:</Typography>
          <TextField size="small" label="" variant="outlined" value={title} onChange={handleChangeTitle} />
        </Stack>
        <Button variant="outlined" color="primary" onClick={getNewsList}>검  색</Button>
      </Box>

      {/* 그리드 */}
      <Box sx={{
        borderBottom: 1,
        borderColor: 'divider'
      }}>
        <DataGrid
          apiRef={apiRef}
          checkboxSelection
          disableMultipleRowSelection
          columns={columns}
          rows={newsList}
          onRowClick={handleRowClick}
        />
      </Box>

      {/* 페이지네이션 */}
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

      {/* Update News */}
      <Box sx={{ mt: 5 }} >
        <Typography variant="h5" sx={{fontWeight: 'bold'}}>Update News</Typography>
        <Box component="form" onSubmit={handleUpdateSubmit(onUpdateSubmit)}>
          <Input
            name="title"
            control={updateControl}
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
            ref={updateQuillRef}
            theme="snow"
            modules={updateModules}
            value={updateEditorHtml}
            onChange={handleUpdateChangeEditor}
            style={{
              width: '100%',
              height: '500px'
            }}
          />
          <Box sx={{pt: 4}}>
            <Button type="submit" fullWidth variant="contained" color="warning"
                    sx={{ mt: 3 }}>Update</Button>
          </Box>
        </Box>
      </Box>

      {/* Add News */}
      <Box sx={{ mt: 5 }} >
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
            <Button type="submit" fullWidth variant="contained" color="primary"
                    sx={{ mt: 3 }}>Add</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default News;