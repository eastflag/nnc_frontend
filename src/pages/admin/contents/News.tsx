import {useEffect, useMemo, useRef, useState} from "react";
import customAxios from "../../../utils/customAxios.ts";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography
} from "@mui/material";
import {useForm} from "react-hook-form";
import {Input} from "../../../components/Input.tsx";
import ReactQuill from "react-quill";

interface Category {
  id: number;
  name: string;
}

interface FormValue {
  title: string;
  // content: string;
}

function News() {
  // new category
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
  }, []);

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