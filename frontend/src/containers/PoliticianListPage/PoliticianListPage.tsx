import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PoliticianSummary from "../../components/PoliticianSummary/PoliticianSummary";
import SearchBar from "../../components/SearchBar/SearchBar";
import { AppDispatch } from "../../store";
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {
  fetchPoliticians,
  selectPolitician,
} from "../../store/slices/politician";
import "./PoliticianListPage.css";

const PoliticianListPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const politicianState = useSelector(selectPolitician);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("name");
  const onSearchBarChangeHandler = (e: any) => {
    setSearch(e.target.value);
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

  const handleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value as string);
  };

  return (
    <div className="PoliticianListPage">
      {/* <NavBar /> */}
      <div className="FilterAndSearchBar">
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">검색 기준</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filter}
                label="검색 기준"
                onChange={handleChange}
              >
                <MenuItem value={10}>이름으로 검색</MenuItem>
                <MenuItem value={20}>선거구로 검색</MenuItem>
              </Select>
          </FormControl>
        </Box>

        {/* <select onChange={onFilterChangeHandler} placeholder="filter">
          <option value="name">이름으로 검색</option>
          <option value="elect-precinct">선거구로 검색</option>
        </select> */}
        <SearchBar onChange={onSearchBarChangeHandler} search={search} />
      </div>
      <div className="PoliticianSummarys">
        {filter === "name"
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
