import {useEffect, useState} from "react";
import {Pagination, Select, Stack, TextField, Typography, MenuItem} from "@mui/material";

function PaginationSample() {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(155);
  const [count, setCount] = useState<number>(0);

  const handleTotal = (event: any) => {
    setTotal(parseInt(event.target.value, 10));
  };

  const handleSize = (event: any) => {
    console.log(event);
    setPageSize(event.target.value)
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    const pageCount = Math.floor(total / pageSize) + (total % pageSize > 0 ? 1 : 0);
    setCount(pageCount);
  }, [pageSize, total]);

  return (
    <Stack spacing={2} sx={{m:3}}>
      <Typography>page: {page}</Typography>
      <Stack direction="row">
        <Typography>total: </Typography>
        <TextField type="number" size="small" label="Outlined" variant="outlined" value={total} onChange={handleTotal} />
      </Stack>
      <Stack direction="row">
        <Typography>size: </Typography>
        <Select
          size="small"
          value={pageSize}
          label="size"
          onChange={handleSize}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
      </Stack>

      <Pagination count={count} page={page} onChange={handleChange} />
    </Stack>
  );
}

export default PaginationSample;
