import {Button} from "@mui/material";
import {useDispatch} from "react-redux";
import {toastActions} from "../../store/toastSlice.ts";

export const ToastSample = () => {
  const dispatch = useDispatch();

  const handleClick = (type: 'success' | 'warning' | 'info' | 'error') => {
    dispatch(toastActions.open({
      isOpened: true,
      severity: type,
      message: 'success message'
    }));
  };

  return (
    <div>
      <Button onClick={() => handleClick('success')}>Success Snackbar</Button>
      <Button onClick={() => handleClick('warning')}>Warning Snackbar</Button>
      <Button onClick={() => handleClick('info')}>Info Snackbar</Button>
      <Button onClick={() => handleClick('error')}>Error Snackbar</Button>
    </div>
  );
}