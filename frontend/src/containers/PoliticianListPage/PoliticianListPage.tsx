import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PoliticianSummary from "../../components/PoliticianSummary/PoliticianSummary";
import SearchBar from "../../components/SearchBar/SearchBar";
import { AppDispatch } from "../../store";
import Card from "react-bootstrap/Card";
import { Row, Col } from "react-bootstrap";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  fetchPoliticians,
  selectPolitician,
} from "../../store/slices/politician";
import "./PoliticianListPage.css";
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";
import { getAllJSDocTagsOfKind } from "typescript";

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
  const dummyPolitician = {
    "id": -1,
    "name": "",
    "birth_date": "",
    "job": "",
    "image_src": "",
    "political_party": "",
    "election_precinct": "",
    "committee": "",
    "committees": "",
    "reelection": "",
    "election_units": "",
    "email": "",
    "career_summary": "",
    "mona_code": "",
    "proposals": ""
}

  const filterName = politicianState.politicians.filter((p) => {
    return p.name.replace(" ", "").includes(search.replace(" ", ""));
  });
  if(filterName.length%5 !== 0){
    const length = filterName.length;
    for(let i=0; i<5-length%5; i++){
      filterName.push(dummyPolitician);
    }
  }
  const filterElect = politicianState.politicians.filter((p) => {
    return p.election_precinct
      .replace(" ", "")
      .includes(search.replace(" ", ""));
  });
  if(filterElect.length%5 !== 0){
    const length = filterElect.length;
    for(let i=0; i<5-length%5; i++){
      filterElect.push(dummyPolitician);
    }
  }
  // if (filterName.length > 6) {
  //   filterName = filterName.slice(0, 6);
  // }
  // if (filterElect.length > 6) {
  //   filterElect = filterElect.slice(0, 6);
  // }

  const handleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value as string);
  };

  const getAlign = () => {
    return <Col></Col>
  }

  return (
    <div className="PoliticianListPage">
      {/* <NavBar /> */}
      <div className="FilterAndSearchBar">
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              width: 1000,
              height: 100,
            },
          }}
        >
          <Paper className="Search-paper" elevation={1} variant="outlined">
            <PersonSearchOutlinedIcon
              className="Search-Icon"
              sx={{ fontSize: 50 }}
            ></PersonSearchOutlinedIcon>
            <FormControl className="Search-option">
              <InputLabel id="demo-simple-select-label">검색 기준</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filter}
                label="정치인 검색"
                onChange={handleChange}
              >
                <MenuItem value={"name"}>이름으로 검색</MenuItem>
                <MenuItem value={"area"}>선거구로 검색</MenuItem>
              </Select>
            </FormControl>
            <SearchBar onChange={onSearchBarChangeHandler} search={search} />
          </Paper>
        </Box>

        {/* <select onChange={onFilterChangeHandler} placeholder="filter">
          <option value="name">이름으로 검색</option>
          <option value="elect-precinct">선거구로 검색</option>
        </select> */}
      </div>
      <div className="PoliticianSummarys">
        <Row>
          {filter === "name"
            ? filterName.map((data) => {
                return (
                  data.id === -1 ?<Col></Col>:
                  <Col>
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
                  </Col>
                );
              })
            : filterElect.map((data) => {
                return (
                  data.id === -1 ?<Col></Col>:
                  <Col>
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
                  </Col>
                );
              })
          }
        </Row>
      </div>
    </div>
  );
};

export default PoliticianListPage;
