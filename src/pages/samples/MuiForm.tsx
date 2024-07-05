import {Box, Button, TextField} from "@mui/material";

export const MuiForm = () => {

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <h3>MUI Form Validation Sample:</h3>

      {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      <Box component="form" onSubmit={onSubmit} noValidate
        sx={{ m: 3}}>
        <TextField
          name="email"
          required
          fullWidth
          label="Email Address"
          margin="normal"
        />
        <TextField
          name="password"
          required
          fullWidth
          label="Password"
          margin="normal"
        />
        <Button type="submit" fullWidth variant="contained"
                sx={{ mt: 1 }}>submit</Button>
      </Box>
    </>
  );
}