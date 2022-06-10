import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <LogoutBtn
      // className="btn btn-danger btn-block"
      onClick={() =>
        logout({
          returnTo: window.location.origin,
        })
      }
    >
      Log Out
    </LogoutBtn>
  );
};

const LogoutBtn = styled.button`
	background: none;
	color: inherit;
	border: 1px solid;
	padding: 2;
	font: inherit;
	cursor: pointer;
	outline: inherit;
  margin: 30px;
`

export default LogoutButton;