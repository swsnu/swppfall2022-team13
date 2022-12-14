import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { resolve } from "node:path/win32";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NavigationIcon from "@mui/icons-material/Navigation";
import { useParams } from "react-router";
import NewsArticle from "../../components/NewsArticle/NewsArticle";
import NumberInfo from "../../components/NumberInfo/NumberInfo";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { AppDispatch } from "../../store";
import { useNavigate } from "react-router-dom";
import {
  fetchPolitician,
  fetchPoliticians,
  selectPolitician,
} from "../../store/slices/politician";
import "./PoliticianDetailPage.css";

const PoliticianDetailPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { id } = useParams();
  const [like, setLike] = useState(false);
  useEffect(() => {
    // Scroll goes up
    window.scrollTo({
      top: 0,
    });

    // dispatch redux
    dispatch(fetchPolitician(Number(id)));
  }, [id]);
  const [career, setCareer] = useState(false);
  const [prop, setProp] = useState(false);
  const [politician_related_articles, set_politician_related_articles] =
    useState([]);
  const onCareerClickHandler = () => setCareer(!career);
  const onPropClickHandler = () => setProp(!prop);
  const politicianState = useSelector(selectPolitician);
  const politician = politicianState.politicians.find((p) => {
    return p.id === Number(id);
  });

  const response_articles = async () => {
    await axios.get(`/api/article/${politician.name}`).then((res) => {
      console.log(res.data);
      set_politician_related_articles(res.data);
    });
  };
  const postLike = async () => {
    const isLogin = await axios.get("/api/user/islogin/");
    if (isLogin.data.status === true) {
      await axios.post("/api/politician/like/" + isLogin.data.id + "/", {
        politician_id: id,
      });
      setLike(!like);
    } else {
      alert("??????????????? ???????????? ???????????? ????????? ??? ?????????!");
      navigate("/login/");
    }
  };

  useEffect(() => {
    response_articles();
    setLikeInit();
  }, []);
  
  const setLikeInit = async () => {
    const user_id = await axios.get("/api/user/islogin/");
    await axios.get(`/api/politician/like/${user_id.data.id}/${id}/`).then((res) => {
      setLike(res.data);
    })
  }


  const getElectedNumber = (elected: string) => {
    if (elected == "??????") {
      return 1;
    } else if (elected == "??????") {
      return 2;
    } else {
      return elected.replace("???", "");
    }
  };
  // useEffect(() => {
  //   dispatch(fetchPoliticians());
  // }, []);
  return (
    <div className="PoliticianDetailPage">
      {/* <NavBar /> */}
      <div>
        <div className="left">
          <img src={politician.image_src} width={200} height={250} />
          <div id="name_and_like">
            <div>
              <h4 id="name">{politician.name + " " + politician.job}</h4>
              <p id="birth-date">{politician.birth_date}</p>
            </div>
            <div id="like">
              <Fab
                id="hello"
                style={like ? { color: "#965727" } : { color: "#DCC4B2" }}
                aria-label="like"
                onClick={postLike}
              >
                <FavoriteIcon />
              </Fab>
            </div>
          </div>
          <div className="political-party">
            <div>
              <img
                id="na-image"
                src="http://www.mcnews.co.kr/imgdata/mcnews_kr/201404/20140408_161951_1f37cd4.jpg"
                width={50}
                height={50}
              ></img>
            </div>
            <div id="political-party-right">
              <span id="political-party-title">??????</span>
              <p id="polticial-party-name">{politician.political_party}</p>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="intro">
            <h2 id="intro-title">????????????</h2>
          </div>
          <div className="number-intro-header">
            <h4 id="number-intro-header">????????? ?????? ??????</h4>
          </div>
          <div id="number-intro-body">
            <NumberInfo
              num={getElectedNumber(politician.reelection)}
              category="????????????"
              detail={politician.election_units}
            ></NumberInfo>
            <NumberInfo
              num={politician.proposals.split("\n").length}
              category="???????????????"
              detail="21??? ????????? ??????"
            ></NumberInfo>
          </div>

          <div>
            <div className="education-and-career-header">
              <h4 id="intro-education-and-career">?????? ??? ??????</h4>
              {career ? (
                <ArrowDropUpIcon
                  onClick={onCareerClickHandler}
                  className='hover-mouse-cursor'
                ></ArrowDropUpIcon>
              ) : (
                <ArrowDropDownIcon
                  onClick={onCareerClickHandler}
                  className='hover-mouse-cursor'
                ></ArrowDropDownIcon>
              )}
            </div>
            <div className={career ? "education-and-career-body" : "none"}>
              <p>
                {politician.career_summary
                  .replaceAll("&middot;", ", ")
                  .replaceAll("&#039", ", ")
                  .replaceAll("&bull;", ", ")
                  .split("\r\n")
                  .map((td) => {
                    if (td === "") return;
                    if (td.includes("??????") || td.includes("??????")) {
                      return <p id="mini-title">{td}</p>;
                    } else {
                      return <li>{td}</li>;
                    }
                  })}
              </p>
            </div>
          </div>

          <div>
            <div className="proposals-header">
              <h4 id="proposals-header">?????????</h4>
              {prop ? (
                <ArrowDropUpIcon className='hover-mouse-cursor' onClick={onPropClickHandler}></ArrowDropUpIcon>
              ) : (
                <ArrowDropDownIcon
                  className='hover-mouse-cursor'
                  onClick={onPropClickHandler}
                ></ArrowDropDownIcon>
              )}
            </div>
            <div className={prop ? "proposals-body" : "none"}>
              <p>
                {politician.proposals.split("\n").map((td) => {
                  if (td != "") return <li>- {td}</li>;
                })}
              </p>
            </div>
          </div>

          <div className="education-and-career-header">
            <h4 id="intro-education-and-career">?????? ????????? ?????? ??????</h4>
          </div>
          {politician_related_articles.length === 0 ? (
            <div className="no-article">
              <WarningAmberIcon />
              <p>?????? ?????? ???????????? ????????? ????????? ????????????!</p>
            </div>
          ) : (
            politician_related_articles.map((td) => {
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
                  width={190}
                  height={150}
                  title={td.title}
                  detail_text={td.content}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default PoliticianDetailPage;
