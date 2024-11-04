import {useEffect, useState} from "react";
import customAxios from "../../../utils/customAxios.ts";
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography} from "@mui/material";

interface Category {
  id: number;
  name: string;
}

function News() {
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [category, setCategory] = useState<string>('');

  useEffect(() => {
    getCategoryList();
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  const getCategoryList = async () => {
    const response = await customAxios.get('/api/v1/admin/category/list');
    console.log(response);
    setCategoryList(response.data);
    if (response.data.length > 0) {
      setCategory(response.data[0].id);
    }
  }

  return (
    <div>
      <FormControl variant="outlined" sx={{ m: 1, minWidth: 200 }} size="small">
        <InputLabel id="news-category-label">News Category</InputLabel>
        <Select labelId="news-category-label"
          value={category} onChange={handleChange} label="News Category">
          {
            categoryList.map((category) => (<MenuItem value={category.id}>{category.name}</MenuItem>))
          }
        </Select>
      </FormControl>

      <Typography variant="h5" sx={{fontWeight: 'bold'}}>Add News</Typography>
    </div>
  );
}

export default News;