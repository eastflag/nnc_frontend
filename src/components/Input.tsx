import {TextField, TextFieldProps} from "@mui/material";
import {FieldPath, FieldValues, useController, UseControllerProps} from "react-hook-form";

interface MuiProps {
  textFieldProps?: TextFieldProps;
}

export const Input = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
    textFieldProps, // textField를 위한 prop들, mui에서 import 해온다.
    ...props
  }: MuiProps & UseControllerProps<TFieldValues, TName>) => {
  const {
    field,
    fieldState: { error },
  } = useController(props);

  return (
    <TextField
      {...textFieldProps}
      {...field}
      error={!!error}
      helperText={!!error && error.message}
    />
  );
};