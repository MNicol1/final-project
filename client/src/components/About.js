import styled from "styled-components";
import { GiMusicalNotes } from "react-icons/gi";
import { ImEarth } from "react-icons/im";
import { useEffect } from "react";

import { FaRegCopyright } from "react-icons/fa";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, -30);
  }, []);

  return (
    <Container>
      <Main>
        <p>
          WWR emerged as a student-designed project from the Concordia
          University Web Development Bootcamp in the spring of 2022, with love
          for accessible user experience (UX), ad-free design and all things
          music. WWR gives a big special thanks to the community-driven
          radio-browser.
        </p>
        <p>
          This site allows users to experience the myriad radio waves that
          surround the globe. Freely browse radio stations by country, filter
          stations by music genre or search for specific radio station names.
          Also create a favorites list based on recent plays. Some stations
          provide geolocation coordinates, allowing you to view the station's
          location on an integrated map.
        </p>
        <p>
          This is a free to use site for non-commercial, personal and
          educational purposes only, for the listening enjoyment of streamed
          radio broadcasts. There is no guarantee to the accuracy of any of the
          data at all times. All related stations data is public domain and
          provided by the community-driven effort{" "}
          <AnchorLink href="https://www.radio-browser.info/">
            radio-browser
          </AnchorLink>
          . Happy listening!
        </p>
        <Icons>
          <GiMusicalNotes size={26} /> <ImEarth size={26} />
        </Icons>
        {/* <Copy>
          <FaRegCopyright /> 2022
        </Copy> */}
      </Main>
    </Container>
  );
};

// const Copy = styled.div`
//   position: absolute;
//   bottom: 10px;
//   font-size: 0.8em;
// `;

const AnchorLink = styled.a`
  color: white;
`;

const Container = styled.div`
  padding: 40px 250px;
  margin-top: 5px;
  @media (max-width: 800px) {
    display: inline-block;
    padding: 30px 15px;
    margin-top: 20px;
    padding-bottom: 80px;
  }

  @media (max-width: 380px) {
    display: inline-block;
    padding: 15px 10px;
    margin-top: 20px;
    padding-bottom: 80px;
  }
`;
const Icons = styled.div`
  margin: 30px 0;

  @media (max-width: 380px) {
    margin: 30px 0 55px 0;
  }
`;
const Main = styled.div`
  position: relative;
  text-align: left;
  border: 1px solid white;
  padding-bottom: 25px;
  padding-left: 25px;
  padding-right: 25px;
  padding-top: 25px;

  @media (max-width: 680px) {
    padding-bottom: 55px;
  }

  @media (max-width: 380px) {
    padding: 15px 20px;
  }
`;

export default About;
