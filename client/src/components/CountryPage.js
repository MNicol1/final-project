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
          <GiMusicalNotes size={22} /> Loading...sorry, no stations found
        </Msg>
      </Main>
    );
  }

  return (
    <RadioContainer>
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

const Main = styled.div`
  display: flex;
  justify-content: center;
`;
const Msg = styled.h3`
  margin-top: 150px;
`;

const Page = styled.div`
  padding: 30px 0px;
  position: relative;
`;

export default CountryPage;
