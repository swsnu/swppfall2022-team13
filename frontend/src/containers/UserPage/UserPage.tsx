import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { type } from "node:os";
import NewsArticle from "../../components/NewsArticle/NewsArticle";
import { Fab } from "@mui/material";
import { Col, Row } from "react-bootstrap";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PoliticianSummary from "../../components/PoliticianSummary/PoliticianSummary";
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import "./UserPage.css";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

const UserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [likeArticles, setLikeArticles] = useState([]);
  const [likePoliticians, setLikePoliticians] = useState([]);
  const [userinfo, setUserinfo] = useState();

  async function logoutHandler() {
    await axios.get("/api/user/signout");
    navigate("/main/");
  }
  const dummyPolitician = {
    id: -1,
    name: "",
    birth_date: "",
    job: "",
    image_src: "",
    political_party: "",
    election_precinct: "",
    committee: "",
    committees: "",
    reelection: "",
    election_units: "",
    email: "",
    career_summary: "",
    mona_code: "",
    proposals: "",
  };

  const getLikeArticles = async () => {
    const user_id = await axios.get("/api/user/islogin/");
    setUserinfo(user_id.data);
    await axios.get(`/api/article/like/${user_id.data.id}/`).then((res) => {
      setLikeArticles(res.data);
    });
  };

  const getLikePoliticians = async () => {
    const user_id = await axios.get("/api/user/islogin/");
    await axios.get(`/api/politician/like/${user_id.data.id}/`).then((res) => {
      setLikePoliticians(res.data);
    });
  };
  if (likePoliticians.length % 3 !== 0) {
    const length = likePoliticians.length;
    for (let i = 0; i < 3 - (length % 3); i++) {
      likePoliticians.push(dummyPolitician);
    }
  }

  useEffect(() => {
    getLikeArticles();
    getLikePoliticians();
  }, []);

  console.log(userinfo);
  return (
    <>
      <div>
        <h1 className="title">MyPage</h1>
        <p className="description">이 페이지에서는 좋아요 누른 기사와 정치인을 모아볼 수 있습니다!</p>
      </div>
      <div id="myPage">
        <div id="likedArticle">
          <div id="header">Liked News</div>
          <div>
            {likeArticles.length === 0
            ? (
              <div className="no-article">
                <WarningAmberIcon />
                <p>아직 좋아요를 누른 기사가 없어요!</p>
              </div>
              )
            : likeArticles.map((td) => {
              return (
                <NewsArticle
                  key={td.id}
                  url={td.url}
                  id={td.id}
                  datetime_str={td.datetime_str}
                  detail_link_postfix={td.detail_link_postfix}
                  preview_prologue={td.preview_prologue}
                  journal_name={td.journal_name}
                  preview_img_path={td.preview_img_path}
                  detail_img_path={td.detail_img_path}
                  width={150}
                  height={100}
                  title={td.title}
                  detail_text={td.content}
                  article_type="relatedNews"
                />
              );
            })}
          </div>
        </div>
        <div id="likedPoliticians">
          <div id="header">Liked Politicians</div>
          <div className="PoliticianSummarys">
            <Row>
              {likePoliticians.length === 0
                ? (
                  <div className="no-politician">
                    <WarningAmberIcon />
                    <p>아직 좋아요를 누른 정치인이 없어요!</p>
                  </div>
                  )
                :likePoliticians.map((data) => {
                return data.id === -1 ? (
                  <Col></Col>
                ) : (
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
              })}
            </Row>
          </div>
        </div>
      </div>
      <Button id="btn-logout" sx={{bgcolor: '#b68763', ':hover': {bgcolor: '#e8bb98'}}} variant="contained" onClick={logoutHandler}>👋🏻 Log out</Button>
    </>
  );
};

export default UserPage;

