import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PoliticianSummaryType } from "../../components/PoliticianSummary/PoliticianSummary";
import "./PoliticianListPage.css";
import PoliticianSummary from "../../components/PoliticianSummary/PoliticianSummary";
import NavBar from "../../components/NavBar/NavBar";
import SearchBar from "../../components/SearchBar/SearchBar";
import { AppDispatch } from "../../store";
import {
  fetchPoliticians,
  selectPolitician,
} from "../../store/slices/politician";

const PoliticianListPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const politicianState = useSelector(selectPolitician);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("name");
  const onSearchBarChangeHandler = (e: any) => {
    setSearch(e.target.value);
  };

  const onFilterChangeHandler = (e: any) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    dispatch(fetchPoliticians());
  }, []);
  let filterName = politicianState.politicians.filter((p) => {
    if (search != "")
      return p.name.replace(" ", "").includes(search.replace(" ", ""));
  });
  let filterElect = politicianState.politicians.filter((p) => {
    if (search != "")
      return p.election_precinct
        .replace(" ", "")
        .includes(search.replace(" ", ""));
  });
  if (filterName.length > 6) {
    filterName = filterName.slice(0, 6);
  }
  if (filterElect.length > 6) {
    filterElect = filterElect.slice(0, 6);
  }
  return (
    <div className="PoliticianListPage">
      <NavBar />
      <div className="FilterAndSearchBar">
        <select onChange={onFilterChangeHandler}>
          <option value="name">이름으로 검색</option>
          <option value="elect-precinct">선거구로 검색</option>
        </select>
        <SearchBar onChange={onSearchBarChangeHandler} search={search} />
      </div>
      <div className="PoliticianSummarys">
        {filter == "name"
          ? filterName.map((data) => {
              return (
                <div className="SummaryComponent" key={data.id}>
                  <PoliticianSummary
                    id={data.id}
                    image_src={data.image_src}
                    name={data.name}
                    elect={data.election_precinct}
                    birthdate={data.birth_date}
                    politicalParty={data.political_party}
                    position={data.job}
                  />
                </div>
              );
            })
          : filterElect.map((data) => {
              return (
                <div className="SummaryComponent" key={data.id}>
                  <PoliticianSummary
                    id={data.id}
                    image_src={data.image_src}
                    name={data.name}
                    elect={data.election_precinct}
                    birthdate={data.birth_date}
                    politicalParty={data.political_party}
                    position={data.job}
                  />
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default PoliticianListPage;
