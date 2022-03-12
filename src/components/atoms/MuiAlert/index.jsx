// mui component
import { Alert, Button, Snackbar, IconButton } from "@mui/material";

const MuiAlert = ({ open, severity, message, closeAlert }) => {
  const action = (
    <>
      <Button color="secondary" size="small" onClick={closeAlert}>
        CLOSE
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={closeAlert}
      ></IconButton>
    </>
  );

  return (
    <Snackbar
      sx={{
        position: "fixed",
        bottom: 0,
        zIndex: 99999999999,
        transform: "translate(50px, -25px) scale(1.2)",
      }}
      open={open}
      autoHideDuration={6000}
      onClose={closeAlert}
      action={action}
    >
      <Alert onClose={closeAlert} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default MuiAlert;
