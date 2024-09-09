import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Link,
  Typography
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {useForm} from "react-hook-form";
import customAxios from "../../utils/customAxios.ts";
import {Input} from "../../components/Input.tsx";

interface FormValue {
  email?: string;
  password?: string;
}

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Login() {
  const { control, handleSubmit } = useForm<FormValue>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormValue) => {
    try {
      console.log(data);
      const response = await customAxios.post('/api/v1/auth/login', data);
      console.log(response);
    } catch(error: any) {
      console.log(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <Input
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              minLength: {value: 3, message: "Email must be at least 3 characters long"},
              maxLength: {value: 20, message: "Email must be less than 20 characters long"},
              pattern: {value: /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/, message: "Invalid email address"}
            }}
            textFieldProps={{
              label: "Email Address *",
              fullWidth: true,
              margin: "normal",
              size: "small"
            }}
          />
          <Input
            name="password"
            control={control}
            rules={{ /*required: "Password is required",*/
              required: "password is required",
              minLength: {value: 6, message: "password must be at least 6 characters long"},
            }}
            textFieldProps={{
              type: "password",
              label: "Password *",
              fullWidth: true,
              margin: "normal",
              size: "small"
            }}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/sign-up" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
