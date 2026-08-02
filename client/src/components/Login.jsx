import Notification from "./Notification";
import styled from "styled-components";

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 13rem;
`;

const Label = styled.label`
  color: #5a5a5a;
  font-size: 1rem;
  margin-left: 10px;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid #9a9a9a;
  padding: 6px 0;
  font-size: 1rem;
  outline: none;
  &:focus {
    border-bottom: 1px solid black;
  }
`;

const LoginButton = styled.button`
  background-color: #2b71b2;
  color: #ffffff;
  border-radius: 4px;
  padding: 8px 10px;
  width: 60px;
  cursor: pointer;
  border: none;
  margin-top: 10px;

  &:hover {
    background-color: #112f4b;
  }
`;

const Login = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
  errorMessage,
}) => {
  return (
    <div>
      <Notification message={errorMessage} />
      <form onSubmit={handleLogin}>
        <h2 style={{ marginBottom: "35px" }}>Log in to application</h2>
        <FieldWrapper>
          <Label>username</Label>
          <Input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </FieldWrapper>
        <FieldWrapper>
          <Label>password</Label>
          <Input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />

          <LoginButton type="submit">LOGIN</LoginButton>
        </FieldWrapper>
      </form>
    </div>
  );
};

export default Login;
