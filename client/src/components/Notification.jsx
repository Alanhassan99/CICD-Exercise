import { Alert } from "@mui/material";
const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  return (
    <Alert
      severity="error"
      style={{
        marginTop: 10,
        marginBottom: 10,
        color: "red",
      }}
    >
      {message}
    </Alert>
  );
};

export default Notification;
