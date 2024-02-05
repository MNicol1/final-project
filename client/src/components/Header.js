import { NavLink } from "react-router-dom";

import styled from "styled-components";
import "./Header.css";
// import AuthenticationButton from "./authentication-button";
import { TbWorld } from "react-icons/tb";

const Header = ({ setSearchTerm, inputElement }) => {
  return (
    <>
      <HeaderContainer>
        <Head to="/">
          <Logo className="logo">
            <span className="blink">
              <TbWorld />
            </span>{" "}
            &#5615; &#5615; &#5511;<Title> World.Wave.Radio</Title>
          </Logo>
        </Head>

        <div className="links">
          <NavLink
            className={({ isActive }) => (isActive ? "link-active" : "link")}
            onClick={() => {
              setSearchTerm("");
            }}
            to="/countries"
          >
            Countries
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "link-active" : "link")}
            to="/playlist"
          >
            Playlist
          </NavLink>

          <NavLink
            className={({ isActive }) => (isActive ? "link-active" : "link")}
            to="/about"
          >
            About
          </NavLink>
        </div>
      </HeaderContainer>
    </>
  );
};

const HeaderContainer = styled.header`
  /* border-bottom: 2px solid white; */
  box-shadow: 0px 2px 0px 0px white;

  padding: 10px 40px;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  display: flex;
  /* max-width: 100%; */

  position: fixed; // added this
  top: 0; // added this
  left: 0; // added this
  background: black; // add background color to prevent content slip through
  z-index: 1001; // make sure the header is always on top
  @media (max-width: 880px) {
    display: block;
    width: 100%;
    /* border-bottom: 1px solid white; */
    box-shadow: 0px 1px 0px 0px white;

    padding-bottom: 15px;
  }

  @media (max-width: 390px) {
    padding: 15px;
    box-shadow: 0px 1px 0px 0px white;
  }
`;

const Head = styled(NavLink)`
  text-decoration: none;
  color: inherit;

  flex-shrink: 0;
  display: flex;

  @media (min-width: 769px) {
    :hover {
      color: #f8d6fe;
    }
  }
`;

const Title = styled.span`
  font-family: inherit;
  font-size: 0.4em;
`;
const Logo = styled.div`
  font-size: 2.7em;
  margin-bottom: 16px;

  /* @media (max-width: 430px) {
    font-size: 1.8em;
  } */

  @media (max-width: 430px) {
    font-size: 2.1em;
  }
`;

// const Links = styled.div`
//   display: flex;
//   align-items: center;
//   flex-shrink: 0;

//   @media (max-width: 650px) {
//     display: block;
//     margin: 0;
//     padding: 2px 0px;
//   }
// `;

export default Header;
