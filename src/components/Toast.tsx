import {Alert, Slide, SlideProps, Snackbar, SnackbarCloseReason} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {toastActions, ToastState} from "../store/toastSlice.ts";

export const Toast = () => {
  const toastState: ToastState = useSelector((state: any) => state.toast);
  const dispatch = useDispatch();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(toastActions.close());
  };

  function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="up" />;
  }

  return (
    <Snackbar
      open={toastState.isOpened}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      autoHideDuration={3000}
      TransitionComponent={SlideTransition}
      onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={toastState.severity}
        variant="filled"
        sx={{width: '100%'}}
      >
        {toastState.message}
      </Alert>
    </Snackbar>
  );
}