import { Alert } from "@mui/material";
const SuccessNotification = ({ message }) => {
  if (message === null) {
    return null;
  }
  return (
    <Alert style={{ color: "green", marginTop: 10, marginBottom: 10 }}>
      {message}
    </Alert>
  );
};

export default SuccessNotification;
