import {
  Avatar,
  Box,
  Button,
  Container,
  Typography
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {useForm} from "react-hook-form";
import {Input} from "../../components/Input.tsx";
import api from "../../utils/api.ts";

interface FormValue {
  email?: string;
  nickname?: string;
  password?: string;
  password2?: string;
}

export default function SignUp() {
  const { control, handleSubmit } = useForm<FormValue>({
    defaultValues: {
      email: "",
      nickname: "",
      password: "",
      password2: "",
    },
  });

  const onSubmit = async (data: FormValue) => {
    try {
      console.log(data);
      const response = await api.put('/api/v1/auth/signup', data);
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
          Sign Up
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 1 }}>
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
            name="nickname"
            control={control}
            rules={{
              required: "Nickname is required",
              minLength: {value: 3, message: "Nickname must be at least 3 characters long"},
              maxLength: {value: 30, message: "Nickname must be less than 30 characters long"},
            }}
            textFieldProps={{
              label: "Nickname *",
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
          <Input
            name="password2"
            control={control}
            rules={{ /*required: "Password is required",*/
              validate: (value: any, formValues: FormValue) => {
                console.log("validate", value, formValues.password);
                return formValues.password === value || "password is not the same";
              },
            }}
            textFieldProps={{
              type: "password",
              label: "Re Password *",
              fullWidth: true,
              margin: "normal",
              size: "small"
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
