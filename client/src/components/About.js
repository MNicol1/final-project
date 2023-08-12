import styled from "styled-components";
import { GiMusicalNotes } from "react-icons/gi";
import { ImEarth } from "react-icons/im";

const About = () => {
  return (
    <Container>
      <Main>
        <p>
          WWR is a student-designed project that emerged out of the Concordia
          University Web Development Bootcamp, in the spring of 2022. WWR gives
          thanks to the open source community-driven radio-browser.
        </p>
        <p>
          This site allows users to experience the myriad radio waves that
          surround the globe. Freely browse radio stations by country and filter
          radio stations by your favorite music genre. Happy listening!
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
  margin-top: 29px;
  @media (max-width: 800px) {
    display: inline-block;
    padding: 30px 15px;
    margin-top: 20px;
    padding-bottom: 80px;
  }

  /* @media (width: 880px) {
    display: inline-block;
    padding: 30px 100px;
    margin-top: 20px;

} */
`;
const Icons = styled.div`
  margin-top: 30px;
`;
const Main = styled.div`
  text-align: left;
  border: 1px solid white;
  padding-bottom: 100px;
  padding-left: 25px;
  padding-right: 25px;
  padding-top: 25px;

  @media (max-width: 680px) {
    padding-bottom: 45px;
  }
`;

export default About;
