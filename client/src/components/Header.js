import { NavLink } from "react-router-dom";

import styled from "styled-components";
import "./Header.css";
// import AuthenticationButton from "./authentication-button";
import { TbWorld } from "react-icons/tb";

const Header = ({ setSearchTerm, inputElement }) => {
  // For OLD dropmenu close

  // const [hide, setHide] = useState(true);

  // const handleClick = () => {
  //   setHide(current => !current);
  //   }

  // FOR SEARCH

  // const clearSearch = () => {
  //   setSearchTerm("");
  //   inputElement.current.value = "";
  // };

  // this goes into link  onClick={clearSearch}  or onClick={()=>{ setSearchTerm("")}}   I removed the clearSearch because it was throwing an error. setSearchTerm seems to work

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

        <Links>
          <NavLink
            className={({ isActive }) => (isActive ? "link-active" : "link")}
            onClick={() => {
              setSearchTerm("");
            }}
            end
            to="/countries"
          >
            Countries
          </NavLink>

          <NavLink
            className={({ isActive }) => (isActive ? "link-active" : "link")}
            to="/about"
          >
            About
          </NavLink>
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

  position: fixed; // added this
  top: 0; // added this
  left: 0; // added this
  background: black; // add background color to prevent content slip through
  z-index: 1000; // make sure the header is always on top
  @media (max-width: 880px) {
    display: block;
    width: 100%;
  }

  @media (max-width: 390px) {
    padding: 20px;
  }
`;

// const Genre = styled.button`
//   :hover {
//     color: #f8d6fe;
//   }

//   @media (max-width: 720px) {
//     display: block;
//     margin: 0;
//     padding: 0;
//   }
// `;

const Head = styled(NavLink)`
  text-decoration: none;
  color: inherit;

  flex-shrink: 0;
  display: flex;

  :hover {
    color: #f8d6fe;
  }
`;

const Title = styled.span`
  font-family: inherit;
  font-size: 0.4em;
`;
const Logo = styled.div`
  font-size: 2.7em;
  margin-bottom: 16px;

  @media (max-width: 430px) {
    font-size: 2em;
  }
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

// OLD CSS FOR NAVLINKS

// const Linked = styled(NavLink)`

//   position: relative;
//   margin: 30px;
//   text-decoration: none;
//   font-size: 18px;
//   color: inherit;
//   font-family: inherit;
//   :hover {
//     color: #f8d6fe;
//   }

// new code for underline animation *not for mobile

//   @media (min-width: 650px) {
//     :before {
//       position: absolute;
//       bottom: 0;
//       left: 50%;
//       content: "";
//       background-color: #f8d6fe;
//       width: 0%;
//       height: 2px;
//       transition: width 1s, left 1s;
//       // remove left 1s  and change left: 0, if want mid.
//     }

//     :hover:before {
//       width: 100%;
//       left: 0%;

//       //  remove left don't want it moving from middle out
//     }
//   }

//   @media (max-width: 650px) {
//     display: inline-block;

//     padding: 7px;
//     margin: 0;
//     width: fit-content;
//     font-size: 1.2em;
//     margin-right: 25px;
//   }

//   @media (max-width: 380px) {
//     font-size: 1.1em;
//     display: inline-block;
//   }
// `;

export default Header;
