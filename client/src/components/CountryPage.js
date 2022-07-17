import { useParams } from "react-router-dom";
import useRadio from "../hooks/useRadio";
import { GiMusicalNotes } from "react-icons/gi";
import ReactPaginate from "react-paginate";
import Radio from "./Radio";
import { RadioContainer, RadioList } from "./styles";
import styled from "styled-components";
import { useState } from "react";
import "./pagination.css";

const CountryPage = () => {
  const { country } = useParams();

  const stations = useRadio({ country: country, limit: 160 });

  const [page, setPage] = useState(0);
  const stationsPerPage = 12;
  const numberOfStationsVistited = page * stationsPerPage;
  const displayStations = stations
    .slice(numberOfStationsVistited, numberOfStationsVistited + stationsPerPage)
    .map((item) => {
      return <Radio item={item} key={item.id} />;
    });

  const totalPages = Math.ceil(stations.length / stationsPerPage);
  const changePage = ({ selected }) => {
    setPage(selected);
  };

  if (stations.length === 0) {
    return (
      <Main>
        <Msg>
          <GiMusicalNotes size={22} /> loading.......no stations found
        </Msg>
      </Main>
    );
  }

  return (
    <RadioContainer>
      <Name>{country}</Name>
      <RadioList>{displayStations}</RadioList>
      <Page>
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          pageCount={totalPages}
          onPageChange={changePage}
          containerClassName={"navigationButtons"}
          previousLinkClassName={"previousButton"}
          nextLinkClassName={"nextButton"}
          disabledClassName={"navigationDisabled"}
          activeClassName={"navigationActive"}
        />
      </Page>
    </RadioContainer>
  );
};

const Name = styled.h3`
  /* text-decoration: underline;     
            text-decoration-color: white;  */
  /* border-bottom: 1px solid white;
            width: fit-content; */
`;

const Main = styled.div`
  display: flex;
  justify-content: center;
`;
const Msg = styled.h3`
  margin-top: 150px;

  @media (max-width: 1200px) {
    font-size: 14px;
  }
`;

const Page = styled.div`
  padding: 30px 0px;
  position: relative;
`;

export default CountryPage;
