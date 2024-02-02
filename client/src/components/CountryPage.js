import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import useRadio from "../hooks/useRadio";
import { GiMusicalNotes } from "react-icons/gi";
import ReactPaginate from "react-paginate";
import Radio from "./Radio";
import { RadioContainer, RadioList } from "./styles";
import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import "./pagination.css";
import "./suggestion.css";

import { ImSpinner2 } from "react-icons/im";

import { BiMessageAltError } from "react-icons/bi";

import "./Header.css";

import BasicMenu from "./BasicMenu";

import { FiSearch } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";

const CountryPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  const { country } = useParams();
  const [params] = useSearchParams();
  const currentGenre = params.get("genre");

  const { stations, loading, error } = useRadio({
    country: country,
    limit: 6050,
  });

  const [suggestions, setSuggestions] = useState([]);

  const [nameSearchTerm, setNameSearchTerm] = useState("");
  const [filteredStations, setFilteredStations] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const [searchResults, setSearchResults] = useState([]);

  const [page, setPage] = useState(0);
  const stationsPerPage = 12;
  const numberOfStationsVisited = page * stationsPerPage;

  //Implementation of navigate back by url search paramas

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const searchTermFromURL = searchParams.get("search");
    let pageFromURL = parseInt(searchParams.get("page"), 10);

    // Convert to zero-based index for internal use
    pageFromURL = !isNaN(pageFromURL) ? pageFromURL - 1 : 0;

    setNameSearchTerm(searchTermFromURL);
    setPage(pageFromURL);

    if (searchTermFromURL) {
      const results = stations.filter((station) =>
        station.name.toLowerCase().includes(searchTermFromURL.toLowerCase())
      );
      setSearchResults(results);
      setHasSearched(true);
    }
  }, [searchParams, stations]);

  //genre handling (with url search params )

  useEffect(() => {
    const searchTermFromURL = searchParams.get("search");

    if (currentGenre) {
      const filtered = stations.filter((station) =>
        station.tags
          ?.map((tag) => tag.toLowerCase())
          .includes(currentGenre.toLowerCase())
      );
      setFilteredStations(filtered);
      setSearchResults([]); // Clear search results on genre change
      setHasSearched(false);

      // Only reset the page if it's a new genre and there's no page info in URL
      if (!searchParams.get("page")) {
        setPage(0);
      }
    } else {
      setFilteredStations(stations); // Display all stations if no genre is selected
      if (!searchParams.get("page")) {
        setPage(0);
      }
    }

    if (!searchTermFromURL) {
      setNameSearchTerm(""); // Clear search term when genre changes and no search term in URL
    }
  }, [currentGenre, stations, searchParams]);

  const stationsToDisplay = hasSearched ? searchResults : filteredStations;

  const totalPages = Math.max(
    1,
    Math.ceil(stationsToDisplay.length / stationsPerPage)
  );

  const changePage = ({ selected }) => {
    setPage(selected);

    // Check if a genre is selected and include it in the URL parameters
    const urlParams = currentGenre
      ? { genre: currentGenre, page: selected + 1 }
      : { search: nameSearchTerm, page: selected + 1 };
    setSearchParams(urlParams);

    window.scrollTo({
      top: 1,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleSearch = () => {
    const results = stations.filter((station) =>
      station.name.toLowerCase().includes(nameSearchTerm.toLowerCase())
    );

    setSearchResults(results);
    setFilteredStations([]); // Clear genre filtering on search
    setHasSearched(true);
    setPage(0);

    window.scrollTo(0, 1);

    // navigate(`?search=${encodeURIComponent(nameSearchTerm)}`);
    setSearchParams({ search: nameSearchTerm });
    // Optionally, you might want to clear the genre in the URL here as well
  };

  const handleInputChange = (e) => {
    const userInput = e.target.value;
    setNameSearchTerm(userInput);

    if (userInput.length > 1) {
      const filteredSuggestions = stations
        .filter((station) =>
          station.name.toLowerCase().includes(userInput.toLowerCase())
        )
        .map((station) => station.name)
        .slice(0, 10); // Limit the number of suggestions

      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const inputRef = useRef(null);

  const handleSearchWithSuggestion = (suggestion) => {
    const exactMatchStation = stations.filter(
      (station) => station.name.toLowerCase() === suggestion.toLowerCase()
    );
    navigate(`/countries/${country}`);
    setSearchResults(exactMatchStation);
    setHasSearched(true);
    setPage(0);
    window.scrollTo(0, 1);
  };

  const handleBlur = () => {
    // Logic to scroll to the top of page
    window.scrollTo(0, 1);
  };

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSuggestions([]); // Close the dropdown
      }
    };

    // Bind the event listeners
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      // Unbind the event listeners on clean up
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  if (loading) {
    return (
      <Main>
        <Msg>
          <ImSpinner2 className="spin-icon-two" />
        </Msg>
      </Main>
    );
  }

  if (error) {
    return (
      <ErrorMessage>
        <span>
          <BiMessageAltError size={40} />
        </span>
        An error occurred on the server end: Please refresh or try again later.
      </ErrorMessage>
    );
  }

  if (loading) {
    return (
      <Main>
        <Msg>
          <ImSpinner2 className="spin-icon" />
        </Msg>
      </Main>
    );
  }

  if (error) {
    return (
      <ErrorMessage>
        <span>
          <BiMessageAltError size={40} />
        </span>
        An error occurred on the server end: Please refresh or try again later.
      </ErrorMessage>
    );
  }

  return (
    <RadioContainer>
      <Name>{country} </Name>

      <SearchBarContainer>
        <Close
          title="Clear"
          size={20}
          onClick={() => {
            setPage(0); // Reset pagination to the first page
            setNameSearchTerm(""); // Clear the search term
            setHasSearched(false); // Reset the search status
            setSearchResults([]); // Clear search results
            setFilteredStations(stations); // Show all stations
            navigate(`/countries/${country}`); // Navigate to the country page without any genre or search parameters
          }}
        />

        <SearchInput
          ref={inputRef}
          title="Search"
          type="text"
          placeholder="Search station name..."
          value={nameSearchTerm}
          onBlur={handleBlur}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSearch();
              e.target.blur(); // this will make the keyboard close
              setSuggestions([]);
            }
          }}
        />

        {suggestions.length > 0 && (
          <ul className="autocomplete-dropdown" ref={dropdownRef}>
            <div className="suggestion-title">suggested stations</div>
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                // onTouchStart={() => {
                //   if (inputRef.current) {
                //     inputRef.current.blur(); // Explicitly blur the input
                //   }
                // }}
                onClick={() => {
                  console.log(
                    "Suggestion clicked, current ref:",
                    inputRef.current
                  );
                  setNameSearchTerm(suggestion);
                  setSuggestions([]);
                  handleSearchWithSuggestion(suggestion);
                }}
              >
                <div className="icon-container">
                  {" "}
                  <Icon style={{ color: "black" }} />
                </div>
                <div className="text-container"> {suggestion}</div>
              </li>
            ))}
          </ul>
        )}

        <Icon size={20} onClick={handleSearch} title="Search" />
      </SearchBarContainer>

      <hr style={{ backgroundColor: "white" }} />
      <NCContainer>
        <BasicMenu />

        {currentGenre && (
          <GenreInfo>
            <GenreTitle>
              {currentGenre.charAt(0).toUpperCase() + currentGenre.slice(1)}
            </GenreTitle>
            <TotalStations>({filteredStations.length} results)</TotalStations>
          </GenreInfo>
        )}
      </NCContainer>

      <RadioList>
        {stationsToDisplay.length > 0 ? (
          stationsToDisplay
            .slice(
              numberOfStationsVisited,
              numberOfStationsVisited + stationsPerPage
            )
            .map((station) => <Radio item={station} key={station.id} />)
        ) : (
          <Main2>
            <Msg2>
              <GiMusicalNotes size={22} /> No stations match your search, please
              try again.
            </Msg2>
          </Main2>
        )}
      </RadioList>
      <Page>
        <ReactPaginate
          //modified force page to remove error, it normally is just {page}
          forcePage={Math.min(page, totalPages - 1)}
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

const ErrorMessage = styled.div`
  color: white;
  padding: 150px;
  display: flex;
  text-align: center;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 70px 30px;
  }
`;

const Icon = styled(FiSearch)`
  width: 22px;
  cursor: pointer;
  color: black;
  padding: 0 5px;
`;

const Close = styled(AiOutlineClose)`
  width: 22px;
  cursor: pointer;
  color: black;
  padding-left: 5px;
  padding-right: 2px;
`;

const SearchBarContainer = styled.div`
  /* border: 2px solid black; */
  position: relative;
  border-radius: 30px;
  height: 20px;
  width: 300px;
  /* background: #a7e1f8; */
  background: white;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* overflow: hidden; */
  margin: 5px 0px 20px 0px;

  @media (max-width: 410px) {
    width: 82%;
  }
`;

const SearchInput = styled.input`
  font-size: inherit;
  font-family: inherit;
  border: 0;
  border-radius: 30px;
  flex-grow: 1;
  outline: none;

  @media (max-width: 410px) {
    width: 90%;
  }
`;

const NCContainer = styled.div`
  padding: 2px 0px;
  /* display: flex;
align-items: center; */
  /* justify-content: space-between; */
`;

const GenreInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 10px 15px 13px 15px;
  margin-bottom: 5px;

  @media (max-width: 769px) {
    margin-bottom: 0;
    padding: 0px 15px;
  }
`;

const GenreTitle = styled.span``;

const TotalStations = styled.span``;

const Name = styled.h3`
  @media (min-width: 1024px) {
    margin-block-start: 10px;
    font-size: 23px;
  }

  @media (max-width: 390px) {
    font-size: 19px;
  }
`;

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center; /* This aligns the child vertically */
  height: 85vh;
`;
const Msg = styled.h3`
  @media (max-width: 1200px) {
    font-size: 14px;
  }
`;

const Main2 = styled.div`
  grid-column: 1 / -1; // This spans the entire width of the grid
  display: flex;
  /* justify-content: center; */
  align-items: center;
  flex-direction: column;
  height: 25vh;
  font-size: 18px;
`;

const Msg2 = styled.h3`
  text-align: center;
  @media (max-width: 650px) {
    font-size: 17px;
    height: 0;
    padding: 0 8px;
  }
`;

const Page = styled.div`
  padding: 30px 0px;
  position: relative;
`;

export default CountryPage;
