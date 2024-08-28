import {Button} from "@mui/material";
import {useDispatch} from "react-redux";
import {toastActions} from "../../store/toastSlice.ts";

export const ToastSample = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(toastActions.open({
      isOpened: true,
      severity: 'success',
      message: 'success message'
    }));
  };

  return (
    <div>
      <Button onClick={handleClick}>Open Snackbar</Button>
    </div>
  );
}