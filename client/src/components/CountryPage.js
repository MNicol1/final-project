import { useParams, useSearchParams } from "react-router-dom";
import useRadio from "../hooks/useRadio";
import { GiMusicalNotes } from "react-icons/gi";
import ReactPaginate from "react-paginate";
import Radio from "./Radio";
import { RadioContainer, RadioList } from "./styles";
import styled from "styled-components";
import { useState, useEffect } from "react";
import "./pagination.css";

import { FaSpinner } from "react-icons/fa";

import "./Header.css";
// import { Link } from "react-router-dom";
// import { FaAngleDown } from "react-icons/fa";
import BasicMenu from "./BasicMenu";

const CountryPage = () => {
  const { country } = useParams();
  const [params] = useSearchParams();
  const currentGenre = params.get("genre");

  const { stations, loading, error } = useRadio({
    country: country,
    limit: 160,
  });

  const [page, setPage] = useState(0);
  const stationsPerPage = 12;
  const numberOfStationsVistited = page * stationsPerPage;

  const uniqueStations = stations.filter((station, index, self) => {
    const nameMatch = index === self.findIndex((s) => s.name === station.name);
    const urlMatch =
      index === self.findIndex((s) => s.urlResolved === station.urlResolved);
    return nameMatch && urlMatch;
  });

  const displayStations = uniqueStations
    .slice(numberOfStationsVistited, numberOfStationsVistited + stationsPerPage)
    .map((item) => {
      return <Radio item={item} key={item.id} />;
    });

  const totalPages = Math.ceil(uniqueStations.length / stationsPerPage);

  const changePage = ({ selected }) => {
    setPage(selected);

    // window.scrollTo(0, 0);
    //   to manage scroll up or down at paginate
  };

  useEffect(() => {
    setPage(0);
  }, [currentGenre]);

  if (loading) {
    return (
      <Main>
        <Msg>
          <FaSpinner size={32} className="spin-icon" />
        </Msg>
      </Main>
    );
  }

  if (!loading && stations.length === 0) {
    return (
      <Main>
        <Msg>
          <GiMusicalNotes size={22} /> No stations found
        </Msg>
      </Main>
    );
  }

  return (
    <RadioContainer>
      <Name>{country}</Name>
      <hr style={{ backgroundColor: "white" }} />
      <NCContainer>
        <BasicMenu />
      </NCContainer>

      <RadioList>{displayStations}</RadioList>
      <Page>
        <ReactPaginate
          breakLabel="..."
          previousLabel={"<"}
          nextLabel={">"}
          pageCount={totalPages}
          onPageChange={changePage}
          containerClassName={"navigationButtons"}
          previousLinkClassName={"previousButton"}
          nextLinkClassName={"nextButton"}
          disabledClassName={"navigationDisabled"}
          activeClassName={"navigationActive"}
          // added these to try paginate fix  break label on next click

          pageRangeDisplayed={2}
          marginPagesDisplayed={2}

          // this will break label the paginate :  // pageRangeDisplayed={10}

          // disableInitialCallback={true}
        />
      </Page>
    </RadioContainer>
  );
};

const NCContainer = styled.div`
  padding: 2px 0px;
  /* display: flex;
align-items: center; */
  /* justify-content: space-between; */
`;

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
