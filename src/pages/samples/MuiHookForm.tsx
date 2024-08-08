import {useForm} from "react-hook-form";
import {Input} from "../../components/Input.tsx";
import {Box, Button} from "@mui/material";

interface FormValue {
  email?: string;
  password?: string;
}

export const MuiHookForm = () => {
  const { control, handleSubmit } = useForm<FormValue>({
    defaultValues: {
      email: "",
      password: ""
    },
  });

  const onSubmit = (data: FormValue) => {
    console.log(data);
  };

  return (
    <>
      <h3>MUI Form Validation Sample: MUI + react-hook-form</h3>

      {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
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
            label: "Email Address",
            fullWidth: true,
            margin: "normal",
            size: "small"
          }}
        />
        <Input
          name="password"
          control={control}
          rules={{ /*required: "Password is required",*/
            // custom validation:
            // 예: password 입력란이 두개가 있고 두번째 password는 두번째 password와 동일한지 체크할 경우 이것을 이용
            validate: (value: any, formValues: FormValue) => {
              console.log(`value: ${value}, validate: ${formValues.email === "aaa@gmail.com"}`);
              return formValues.email !== "aaa@gmail.com" || "password error message";
            },
          }}
          textFieldProps={{
            label: "Password",
            fullWidth: true,
            margin: "normal",
            size: "small"
          }}
        />
        <Button type="submit" fullWidth variant="contained"
                sx={{ mt: 2 }}>submit</Button>
      </Box>
    </>
  );
}