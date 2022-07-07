import { NavLink, Link } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import styled from "styled-components";
import "./Header.css";
// import AuthenticationButton from "./authentication-button";
import { TbWorld } from "react-icons/tb";

const Header = () => {
  return (
    <>
      <HeaderContainer>
        <Head to="/">
          <Logo>
            <span>
              <TbWorld />
            </span>{" "}
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
              <Link to="?genre=pop">Pop</Link>
              <Link to="?genre=classical">Classical</Link>
              <Link to="?genre=jazz">Jazz</Link>
              <Link to="?genre=rock">Rock</Link>
              <Link to="?genre=hiphop">Hiphop</Link>
              <Link to="?genre=house">House</Link>
              <Link to="?genre=folk">Folk</Link>
              <Link to="?genre=country">Country</Link>
              <Link to="?genre=electronic">Electronic</Link>
              <Link to="?genre=chillout">Chillout</Link>
              <Link to="?genre=indie">Indie</Link>
              <Link to="?genre=80s">80s</Link>
              <Link to="?genre=90s">90s</Link>
            </div>
          </div>
          <Linked to="/about">About</Linked>

          {/* <AuthenticationButton /> */}
        </Links>
      </HeaderContainer>
    </>
  );
};

const HeaderContainer = styled.header`
  border-bottom: 2px solid white;
  padding: 20px 40px;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  display: flex;
  /* max-width: 100%; */
  @media (max-width: 880px) {
    display: block;
    width: 100%;
  }
`;

const Genre = styled.button`
  :hover {
    color: #f8d6fe;
  }

  @media (max-width: 720px) {
    display: block;
    margin: 0;
    padding: 0;
  }
`;

const Head = styled(NavLink)`
  text-decoration: none;
  color: inherit;
  flex-shrink: 0;
  display: flex;
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
  flex-shrink: 0;

  @media (max-width: 650px) {
    display: block;
    margin: 0;
    padding: 5px 0px;
  }
`;

const Linked = styled(NavLink)`
  margin: 30px;
  text-decoration: none;
  font-size: inherit;
  color: inherit;
  font-family: inherit;
  :hover {
    color: #f8d6fe;
  }
  @media (max-width: 650px) {
    display: block;
    padding: 7px;
    margin: 0;
  }
`;

export default Header;
