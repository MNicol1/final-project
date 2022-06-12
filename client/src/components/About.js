import styled from "styled-components";
import {GoRadioTower} from "react-icons/go"
import {GiMusicalNotes} from "react-icons/gi"
import { ImEarth} from "react-icons/im"


const About = () => {
  return (
    <Container>
      <Main>
      <p>
        WWR was created by Mark Nicol, student of the Concordia University Web
        Development Bootcamp. WWR is powered by the open source
        community-drivern Radio-Browser.
      </p>
      <p>
        This site allows users to experience the myriad radio waves that
        surround the world. Freely browse radio stations by country, filter by
        genre, and sign up to like your favorites.
      </p>
      <Icons>
       <GiMusicalNotes size={28} color=""/> <ImEarth size={28} color=""/>
      </Icons>
      </Main>
    </Container>
  );
};

const Container = styled.div`
padding: 40px 200px;
margin-top: 30px;

`
const Icons = styled.div`
margin-top: 30px;
`
const Main = styled.div`
text-align: justify;
border: 1px solid black;
padding-bottom: 100px;
padding-left: 25px;
padding-right: 25px;
padding-top: 25px;
`

export default About;


