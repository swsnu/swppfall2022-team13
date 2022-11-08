import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { useParams } from "react-router";
import { UserInfoBtnType } from "../../components/UserInfoBtn/UserInfoBtn";
import {
  fetchPolitician,
  PoliticianType,
  fetchPoliticians,
} from "../../store/slices/politician";
import { selectPolitician } from "../../store/slices/politician";
import { AppDispatch } from "../../store";
import UserInfoBtn from "../../components/UserInfoBtn/UserInfoBtn";
import "./PoliticianDetailPage.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Figure from "react-bootstrap/Figure";

const PoliticianDetailPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const userInfoBtnContent: UserInfoBtnType = {
    url: "/user/1",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3qAb5Xu6-hZguic1bPpFbicnmwOlHHIQ_ANoaY1xcLwrHfem6M1mNZkspUnq4u4DgjWs&usqp=CAU",
  };
  const [politicianContents, setPoliticianContents] = useState<
    PoliticianType[]
  >([
    {
      image_src:
        "https://w.namu.la/s/d5367fb0d9114cbd194baf2784cea06ef9659934d5e13527b197d69d0d9eb363f0e0256daf126da08ee213df04b5440baea79886d7a8a733a56c4341c088667651efa54a1e6c02cba57d3f84513257d07aecebcbf4f45bdda99e31d53ac010838f1a1525f7607808e4c7c3548c8e2b00",
      id: 1,
      name: "윤석열",
      political_party: "국민의힘",
      position: "제21대 대통령",
      birth_date: "1960년 12월 18일",
      education: [
        "1973.2. 대광국민학교 졸업",
        "1976.2. 충암중학교 졸업",
        "1979.2. 충암고등학교 졸업",
        "1983.2. 서울대학교 법과대학 법학과 졸업, 법학 학사",
        "1988.2. 서울대학교 대학원 법학과 졸업, 법학 석사",
      ],
      brief_histroy: [
        "1991.10. 제33회 사법시험 합격",
        "1994.2. 제23기 사법연수원 수료",
        "1994.2. 대구지방검찰청 검사",
        "1996.2. 춘천지방검찰청 강릉지청 검사",
        "1997.2. 수원지방검찰청 성남지청 검사",
        "1999.2. 서울지방검찰청 검사",
      ],
    },
    {
      image_src:
        "https://w.namu.la/s/6d13dd480dca33f2c79792ae6cafcc5cb2e4fa1af280543e2d5012121e0e2650e8443e95624dbaffc44bc6e2d90d16db87984a543efe8997976e06514ebc9e3ec7ef080fecc4418243a3b5ba024e124b37e07851b6bad8f7c8790ed9889fab87c66b6013a25fa2e7681e77c07255ef12",
      id: 2,
      name: "홍준표",
      political_party: "국민의힘",
      position: "대구광역시장",
      birth_date: "1953년 11월 20일",
      education: [
        "1966.2. 학남국민학교 졸업",
        "1969.2. 영남중학교 졸업",
        "1972.2. 영남고등학교 졸업",
        "1978. 고려대학교 법과대학 행정학과 학사",
      ],
      brief_histroy: [
        "1982. 제24회 사법시험 합격",
        "1984. 제14기 사법연수원 수료",
        "1985.1. 청주지방검찰청 검사",
        "1987.6. 부산지방검찰청 울산지청 검사",
        "1988.8. 서울지방검찰청 남부지청 특수부 검사",
        "1989.5. 서울지방검찰청 남부지청 형사1부 검사",
      ],
    },
    {
      image_src:
        "https://w.namu.la/s/ad235a49a54d4206f38cf01367d2464a8bde5101323377ccfd543a3d9da0edf9ad94e39a538f805794542d62140812032b8a251f23bd028de31636fc17e644c02d591f0d79e9ddda14fe21d8f818de392f3951b275f7aef81fe37a874f76675280eabbdcef4840c5b6fbaff3a53e8a6b",
      id: 3,
      name: "이재명",
      political_party: "더불어민주당",
      position: "제21대 국회의원",
      birth_date: "1963년 12월 8일",
      education: [
        "1976.2. 삼계국민학교 졸업",
        "1978.8. 중학교 졸업 학력 검정고시 합격",
        "1980.4. 고등학교 졸업 학력 검정고시 합격",
        "1986.2. 중앙대학교 법과대학 법학과 학사",
      ],
      brief_histroy: [
        "1986.7. 제28회 사법시험 합격",
        "1987.11. 대구지방검찰청 안동지청 검사시보",
        "1989. 사법연수원 18기 수료",
        "1989.5. 민주사회를 위한 변호사모임 국제연대위원",
        "2003.~2004. 성남 참여연대 집행위원장",
        "2004. 성남시립병원설립추진위원회 공동대표",
      ],
    },
    {
      image_src:
        "https://w.namu.la/s/009bd2db322dfee32ed7b0fdf63716e5a77980a07a2083ce1293326953c2739339257e62cacad4c576fb261cc0d52633857cf574cc304c735a330178870773e126366061383dd7d9e33c134eca5b54202c9da4298421775046f7512ea70bfe5c41b3b6722c8436f2bc1b56df7cf95a54",
      id: 4,
      name: "원희룡",
      political_party: "국민의힘",
      position: "제7대 국토교통부장관",
      birth_date: "1964년 2월 14일",
      education: [
        "1976.2. 중문국민학교 졸업",
        "1979.2. 중문중학교 졸업",
        "1982.2. 제주제일고등학교 졸업",
        "1982.3. 서울대학교 법과대학 수석 입학",
        "1989.2. 서울대학교 법과대학 공법학과 졸업, 법학 학사",
      ],
      brief_histroy: [
        "1992.10. 제34회 사법시험 수석 합격",
        "1995.2. 서울지방검찰청 검사",
        "1997.2. 수원지방검찰청 여주지청 검사",
        "1998.3. 부산지방검찰청 검사",
        "1999.1. 법무법인 춘추 변호사",
      ],
    },
  ]);

  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchPolitician(Number(id)));
  }, [id]);
  const politicianState = useSelector(selectPolitician);
  const politician = politicianContents[Number(id) - 1];
  return (
    <div className="PoliticianDetailPage">
      <UserInfoBtn
        url={userInfoBtnContent.url}
        image={userInfoBtnContent.image}
      />
      <div>
        <div className="left">
          <img src={politician.image_src} width={300} height={370} />
          <h4 id="name">{politician.name + " " + politician.position}</h4>
          <p id="birth-date">{politician.birth_date}</p>
        </div>
        <div className="right">
          <div className="intro">
            <h2 id="intro-title">의원소개</h2>
          </div>
          <div className="education-and-career">
            <h4 id="intro-education">학력 및 경력</h4>
          </div>
          <div id="education-detail">
            <p id="education-title">[학력]</p>
            {politician.education.map((td) => {
              return <li>{td}</li>;
            })}
          </div>
          <div id="career-detail">
            <p id="career-title">[경력]</p>
            {politician.brief_histroy.map((td) => {
              return <li>{td}</li>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoliticianDetailPage;
