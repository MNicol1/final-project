import styled from "styled-components";
import { GiMusicalNotes } from "react-icons/gi";
import { ImEarth } from "react-icons/im";

const About = () => {
  return (
    <Container>
      <Main>
        <p>
          WWR is a student project emerging out of the Concordia University Web
          Development Bootcamp. With gratitude, WWR is powered by the open
          source community driven radio-browser.
        </p>
        <p>
          This site allows users to experience the myriad radio waves that
          surround the world. Freely browse radio stations by country, and
          filter stations by your favorite music genre. Happy listening!
        </p>
        <Icons>
          <GiMusicalNotes size={28} /> <ImEarth size={28} />
        </Icons>
      </Main>
    </Container>
  );
};

const Container = styled.div`
  padding: 40px 200px;
  margin-top: 30px;
  @media (max-width: 650px) {
    display: inline-block;
    padding: 30px 10px;
    margin-top: 20px;
  }
`;
const Icons = styled.div`
  margin-top: 30px;
`;
const Main = styled.div`
  text-align: justify;
  border: 1px solid white;
  padding-bottom: 100px;
  padding-left: 25px;
  padding-right: 25px;
  padding-top: 25px;
`;
export default About;
