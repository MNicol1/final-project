import { NavLink, Link } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import styled from "styled-components";
import "./Header.css";
import AuthenticationButton from "./authentication-button";

const Header = () => {
  return (
    <>
      <HeaderContainer>
        <Head to="/">
          <Logo>
            &#5615; &#5615; &#5511;<Title> World.Wave.Radio</Title>
          </Logo>
        </Head>

        <Links>
          <Linked to="/countries">Countries</Linked>

          <div className="dropdown">
            <button className="dropbtn">
              By Genre{" "}
              <span>
                <FaAngleDown />
              </span>
            </button>
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
          <Linked to="/about">About</Linked>

          <AuthenticationButton />
        </Links>
      </HeaderContainer>
    </>
  );
};

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

const Head = styled(NavLink)`
  text-decoration: none;
  color: inherit;
`;

const Title = styled.span`
  font-family: inherit;
  font-size: 0.4em;
`;
const Logo = styled.div`
  font-size: 2.3em;
  margin-bottom: 16px;
`;

const Links = styled.div`
  display: flex;
  align-items: center;
 
`;

const Linked = styled(NavLink)`
  margin: 30px;
  text-decoration: none;
  font-size: inherit;
  color: inherit;
  font-family: inherit;
`;

export default Header;
