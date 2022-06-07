import { NavLink, Link } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import styled from "styled-components";
import "./Header.css";
import AuthenticationButton from "./authentication-button"

const Header = () => {
  return (
    <>
      <HeaderContainer>
        <AuthenticationButton/>
        <Logo>&#5615; &#5615; &#5511;</Logo>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/countries">Countries</NavLink>

        <div className="dropdown">
          <button className="dropbtn">
            By Genre <span><FaAngleDown /></span></button>
          <div className="dropdown-content">
            <Link to="?genre=classical">Classical</Link>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
            <a href="#">Link 3</a>
            <a href="#">Link 3</a>
            <a href="#">Link 3</a>
            <a href="#">Link 3</a>
          </div>
        </div>
      </HeaderContainer>
    </>
  );
};

const Logo = styled.p`
font-size: 1.2em;
`

const HeaderContainer = styled.header`
  border-bottom: 2px solid black;
  padding: 20px 40px;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  display: flex;
  /* position: fixed; */
  z-index: 3;
`;

export default Header;
