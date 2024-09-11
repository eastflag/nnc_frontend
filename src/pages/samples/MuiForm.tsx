import {Box, Button, TextField} from "@mui/material";
import {useState} from "react";

export const MuiForm = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleEmailChange = (e: any) => {
    console.log(e.target.validity.valid); // html5 속성
    setEmail(e.target.value);
    if (e.target.value.length < 3) {
      setEmailError("Email must be at least 3 characters long");
    } else if (e.target.value.length > 20) {
      setEmailError("Email must be less than 20 characters long");
    } else if (!/^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/.test(e.target.value)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e: any) => {
    console.log(e.target.validity.valid); // html5 속성
    setPassword(e.target.value);
    if (!e.target.validity.valid) {
      setPasswordError("Password is required");
    } else {
      setPasswordError("");
    }
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (emailError || passwordError) {
      return;
    }
    // call API
    console.log(`email: ${email}, password: ${password}`);
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
          size="small"
          value={email}
          onChange={handleEmailChange}
          error={!!emailError}
          helperText={emailError}
        />
        <TextField
          name="password"
          required
          fullWidth
          label="Password"
          margin="normal"
          size="small"
          value={password}
          onChange={handlePasswordChange}
          error={!!passwordError}
          helperText={passwordError}
        />
        <Button type="submit" fullWidth variant="contained"
                sx={{ mt: 2 }}>submit</Button>
      </Box>
    </>
  );
}