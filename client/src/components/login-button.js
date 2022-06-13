import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <LoginBtn
      
      onClick={() => loginWithRedirect()}
    >
      Log In
    </LoginBtn>
  );
};

const LoginBtn = styled.button`
	background: none;
	color: inherit;
	border: 1px solid;
	padding: 2;
	font: inherit;
	cursor: pointer;
	outline: inherit;
  margin: 30px;

`

export default LoginButton;