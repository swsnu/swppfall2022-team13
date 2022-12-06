import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  fetchPolitician,
  fetchPoliticians,
} from "../../store/slices/politician";
import { selectPolitician } from "../../store/slices/politician";
import { AppDispatch } from "../../store";
import NumberInfo from "../../components/NumberInfo/NumberInfo";
import "./PoliticianDetailPage.css";
import "bootstrap/dist/css/bootstrap.min.css";

import NavBar from "../../components/NavBar/NavBar";
import { propTypes } from "react-bootstrap/esm/Image";

const PoliticianDetailPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchPolitician(Number(id)));
  }, [id]);
  const [career, setCareer] = useState(false);
  const [prop, setProp] = useState(false);
  const onCareerClickHandler = () => setCareer(!career);
  const onPropClickHandler = () => setProp(!prop);
  const politicianState = useSelector(selectPolitician);
  const politician = politicianState.politicians.find((p) => {
    return p.id === Number(id);
  });
  const getElectedNumber = (elected: string) => {
    if (elected == "초선") {
      return 1;
    } else if (elected == "재선") {
      return 2;
    } else {
      return elected.replace("선", "");
    }
  };
  useEffect(() => {
    dispatch(fetchPoliticians());
  }, []);
  return (
    <div className="PoliticianDetailPage">
      <NavBar />
      <div>
        <div className="left">
          <img src={politician.image_src} width={200} height={250} />
          <h4 id="name">{politician.name + " " + politician.job}</h4>
          <p id="birth-date">{politician.birth_date}</p>
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
              <span id="political-party-title">정당</span>
              <p id="polticial-party-name">{politician.political_party}</p>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="intro">
            <h2 id="intro-title">의원소개</h2>
          </div>
          <div className="number-intro-header">
            <h4 id="number-intro-header">숫자로 보는 정보</h4>
          </div>
          <div id="number-intro-body">
            <NumberInfo
              num={getElectedNumber(politician.reelection)}
              category="당선횟수"
              detail={politician.election_units}
            ></NumberInfo>
            <NumberInfo
              num={politician.proposals.split("\n").length}
              category="법안발의수"
              detail="21대 국회내 통계"
            ></NumberInfo>
            <NumberInfo
              num="temp"
              category="관심랭킹"
              detail="관심의원등록수"
            ></NumberInfo>
          </div>
          <div className="education-and-career-header">
            <h4 id="intro-education-and-career">학력 및 경력</h4>
            <img
              src={
                career
                  ? "https://png.pngtree.com/element_our/20190531/ourlarge/pngtree-up-arrow-image_1287479.jpg"
                  : "https://cdn.icon-icons.com/icons2/2098/PNG/512/arrow_down_icon_128951.png"
              }
              width={30}
              height={30}
              onClick={onCareerClickHandler}
              alt="career"
            ></img>
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
                  if (td.includes("학력") || td.includes("경력")) {
                    return <p id="mini-title">{td}</p>;
                  } else {
                    return <li>{td}</li>;
                  }
                })}
            </p>
          </div>
          <div className="proposals-header">
            <h4 id="proposals-header">발의안</h4>
            <img
              src={
                prop
                  ? "https://png.pngtree.com/element_our/20190531/ourlarge/pngtree-up-arrow-image_1287479.jpg"
                  : "https://cdn.icon-icons.com/icons2/2098/PNG/512/arrow_down_icon_128951.png"
              }
              width={30}
              height={30}
              alt="props"
              onClick={onPropClickHandler}
            ></img>
          </div>
          <div className={prop ? "proposals-body" : "none"}>
            <p>
              {politician.proposals.split("\n").map((td) => {
                if (td != "") return <li>- {td}</li>;
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoliticianDetailPage;
