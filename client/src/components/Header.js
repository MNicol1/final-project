import { NavLink, Link } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import styled from "styled-components";
import "./Header.css";
// import AuthenticationButton from "./authentication-button";
import { TbWorld } from "react-icons/tb";
import { useState } from "react";



const Header = ({setSearchTerm, inputElement}) => {
 
// For dropmenu close 


const [hide, setHide] = useState(true);

const handleClick = () => {
  setHide(current => !current);
  } 


  //for search 


  const clearSearch = () => {
    setSearchTerm("");
    inputElement.current.value = "";
  };


// this goes into link  onClick={clearSearch}  or onClick={()=>{ setSearchTerm("")}}

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
          <Linked onClick={clearSearch} to="/countries">Countries</Linked>
{/* 
          <div className="dropdown">
            <button onClick={handleClick} className="dropbtn">
              By Genre{" "}
              <span>
                <FaAngleDown />
              </span>
            </button>
            <div style={{display: hide || 'none'}}className="dropdown-content">
              <Link onClick={handleClick} to="?genre=pop">Pop</Link>
              <Link onClick={handleClick} to="?genre=classical">Classical</Link>
              <Link onClick={handleClick} to="?genre=jazz">Jazz</Link>
              <Link onClick={handleClick} to="?genre=rock">Rock</Link>
              <Link onClick={handleClick} to="?genre=hiphop">Hiphop</Link>
              <Link onClick={handleClick} to="?genre=house">House</Link>
              <Link onClick={handleClick} to="?genre=folk">Folk</Link>
              <Link onClick={handleClick} to="?genre=country">Country</Link>
              <Link onClick={handleClick} to="?genre=electronic">Electronic</Link>
              <Link onClick={handleClick} to="?genre=chillout">Chillout</Link>
              <Link onClick={handleClick} to="?genre=indie">Indie</Link>
              <Link onClick={handleClick} to="?genre=80s">80s</Link>
              <Link onClick={handleClick} to="?genre=90s">90s</Link>
            </div>
          </div> */}
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

  @media (max-width: 390px) {
    padding: 20px;
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
    font-size: 2.0em;
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

const Linked = styled(NavLink)`
  margin: 30px;
  text-decoration: none;
  font-size: 18px;
  color: inherit;
  font-family: inherit;
  :hover {
    color: #f8d6fe;
  }



  @media (max-width: 650px) {
    display: inline-block;

    padding: 7px;
    margin: 0;
    width: fit-content;
    font-size: 1.2em;
    margin-right: 25px;
  }


  @media (max-width: 380px) {
    font-size: 1em;
    display: inline-block;
  }

`;

export default Header;
