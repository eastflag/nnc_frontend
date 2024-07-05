import {useForm} from "react-hook-form";
import {Input} from "../../components/Input.tsx";

interface FormValue {
  name?: string;
  password?: string;
}

export const MuiHookForm = () => {
  const { control, handleSubmit } = useForm<FormValue>({
    defaultValues: {
      name: "",
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="name"
          control={control}
          rules={{ required: "필수!" }}
          textFieldProps={{
            label: "Name",
          }}
        />
        <Input
          name="password"
          control={control}
          rules={{ required: "필수!" }}
          textFieldProps={{
            label: "Password",
          }}
        />
        <button type="submit">submit</button>
      </form>
    </>
  );
}