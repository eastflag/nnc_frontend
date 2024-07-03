import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {Button, TextField} from "@mui/material";

interface IFormInput {
  name: string
  nickname: string
}

export const MuiHookForm = () => {
  const { control, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = data => console.log(data);

  return (
    <>
      <h3>MUI Form Validation Sample: MUI + react-hook-form</h3>

      {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          render={({field}) => <TextField id="name" label="name" variant="outlined" {...field} />}
        />
        <Controller
          name="nickname"
          control={control}
          render={({field}) => <TextField id="nickname" label="nickname" variant="outlined" {...field} />}
        />
        <Button type="submit" variant="contained">submit</Button>
      </form>
    </>
  );
}