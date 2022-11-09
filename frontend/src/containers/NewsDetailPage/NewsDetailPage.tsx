import NavBar from '../../components/NavBar/NavBar'
import React from 'react';
import "./NewsDetailPage.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from 'react-router-dom';
import { useParams } from "react-router";
import { AppDispatch } from "../../store";
import { fetchArticles, fetchArticle, selectArticle } from "../../store/slices/article";
import NewsArticle, { NewsArticleType,} from "../../components/NewsArticle/NewsArticle";
import { faLeftLong } from '@fortawesome/free-solid-svg-icons';

const NewsDetailPage = () => {

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const articleState = useSelector(selectArticle);
  const { id } = useParams(); //fetch number from current url

  var currArticleId:number = 1;
      if(id !== undefined) {
        currArticleId = parseInt(id) //current url number is stored into currArticleId
        }
  console.log("curr id is: " + currArticleId)

  const [newsArticlesLeft, setLeftContents] = useState<
    NewsArticleType[]
  >([
    {
      id: 1,
      url: "/news/1",
      journal_name: "한겨레",
      detail_img_path:
        "https://imgnews.pstatic.net/image/079/2022/11/07/0003704132_001_20221107124401245.jpg?type=w647",
      title:
        "원희룡 '사고 끊이지 않는 코레일…하나에서 열까지 다 바꿔야'",
      content:
        "윤 대통령사우디 해외출장 중 질타…승객불편 최소화·작업자 안전 당부 철도사고 늘어난다며 지난 3일 철도안전 비상대책회의 열었지만 5일 오봉역 코레일 직원 사망사고 이어 연이틀 대형사고 발생은 이날 오전 용산 대통령실에서 국가안전시스템 점검회의를 주재하고 '아들 딸을 잃은 부모의 심경에 감히 비할 바는 아니지만 국민의 생명과 안전을 지켜야 하는 대통령으로서 비통하고 마음이 무겁다'며 이같이 말했다.",
    },
    {
      id: 2,
      url: "/news/2",
      journal_name: "한겨레",
      detail_img_path:
        "http://www.laborparty.kr/wp-content/uploads/kboard_attached/5/202206/629f103000c8b8121227.jpg",
      title:
        "<노동자정치행동 성명> 화물연대 총파업을 무조건 지지한다!",
      content:
        "화물연대는 '화물노동자의 최저임금제' 격인 안전운임제의 일몰제 폐지와 적용 품목 확대 등을 요구하고 있다. 안전운임제는 화물노동자들의 과로 과속 과적 운행을 막기 위해 '적정한 운임'을 보장하는 제도를 말한다. 2020년부터 올해 말가지 3년 동안 시행되도록 화물자동차운수사업법에 규정되어 있지만, 국토교통부는 제도 일몰 7개월을 앞두고도 제도 유지에 관한 어떠한 입장도 내놓지 않고 있다.",
    },
    {
      id: 3,
      url: "/news/3",
      journal_name: "한겨레",
      detail_img_path:
        "https://imgnews.pstatic.net/image/001/2022/11/04/PYH2022100507160001300_P4_20221104115612855.jpg?type=w647",
      title:
        "현무 낙탄, '관성항법장치' 또는 '제어장치 통신' 비정상 추정",
      content:
        "(서울=연합뉴스) 김지헌 기자 = 한 달 전 발생한 육군 현무-2C 탄도미사일 낙탄 사고 원인은 관성항법장치(INS)나 제어계통 장치 간 데이터 통신의 비정상으로 추정됐다. 북한이 북중 국경과 가까운 북쪽 지역에서 중국 어선들이 몰려있는 서해상으로 처음 탄도미사일을 발사한 것으로 알려지면서, 그 배경과 의도에 관심이 쏠린다. 6일 군에 따르면 북한은 전날 오전 11시 32분께부터 11시 59분께까지 평안북도 동림 일대에서 북한 서해상으로 단거리 탄도미사일(SRBM) 4발을 발사했다. 이들 미사일은 비행거리 약 130㎞, 고도 약 20㎞, 속도 약 마하 5(음속 5배)로 탐지됐다. 우선 발사 장소부터가 이례적이다. 동림은 중국 단둥에서 고작 20여㎞ 떨어진 장소로, 지금까지 북한의 탄도미사일 발사가 포착된 적이 한 번도 없는 지역이다.중국에서 가까운 지역에서 중국 선박들이 득실대는 서해로 미사일을 발사한 점을 두고는 중국과 북한의 밀착을 보여주는 것 아니냐는 분석이 나온다.북한이 사전에 중국 측과 논의해 발사 장소와 방향을 선정함으로써 북중 밀착을 과시하려 했을 의도가 엿보인다는 것이다.",
    },
    {
      id: 4,
      url: "/news/4",
      journal_name: "한겨레",
      detail_img_path:
        "https://imgnews.pstatic.net/image/661/2022/11/04/0000015488_001_20221104130501743.png?type=w647",
      title:
        "카지노서 사라진 145억.. 핵심 피의자 구속 영장 신청",
      content:
        "꺼억 알빠노",
    },
  ]);

  const [newsArticlesRight, setRightContents] = useState<
    NewsArticleType[]
  >([
    {
      id: 5,
      url: "/news/5",
      journal_name: "조선일보",
      detail_img_path:
        "http://file3.instiz.net/data/file3/2019/10/05/4/c/b/4cb9adbe6cdd8af91cb62d616f3139bc.jpg",
      title:
        "호주 대통령, '한국인, 호주 방문시 환전할 필요 없어'(종합)",
      content:
        "(뉴저지=우리뉴스) 한가인 특파원 = 호주 대통령 메이는 14일(현지시간) 한국인들이 호주 방문시 환전이 필요없다고 선언하며 빠르면 올 9월부터 한국인들은 환전 없이 호주에서 물건을 구매할 수 있을 것이라고 밝혔다. 메이 대통령은 이날 이번 선언의 가장 큰 이유중 하나로 한국 사람들이 즐겨입는 바지에는 호주머니가 달려 있었기 때문이라고 언급했다.",
    },
    {
      id: 6,
      url: "/news/6",
      journal_name: "조선일보",
      detail_img_path:
        "https://imgnews.pstatic.net/image/654/2022/10/24/0000023081_001_20221024112205711.jpg?type=w647",
      title:
        "윤 대통령, 레고랜드 사태에 '누가 칼 들고 협박했나?'",
      content:
        "최근 강원도가 레고랜드 테마파크 조성을 위해 발행한 2050억원 규모 프로젝트파이낸싱(PF). 시장안정 조치 신속 집행…약탈적 불법사금융, 무관용 원칙 강력단속",
    },
    {
      id: 7,
      url: "/news/7",
      journal_name: "조선일보",
      detail_img_path:
        "https://img.khan.co.kr/news/2018/03/17/l_2018031701002096200165431.webp",
      title:
        "“아버지가 또 태극기집회에 가셨다” 가족갈등과 노인소외",
      content:
        "“어디 감히 국민의 손으로 뽑은 대통령을 자기네 마음대로 쫓아내! 문재인도 대화합을 위해 지금이라도 물러나고….” 어머니가 다급하게 말리신다. 어머니 배모씨(67)는 “내가 당신이 밖에서 무슨 짓을 하고 다니든 뭐라고 한 적이 있냐”며 “제발 집안에서는 큰소리 안 나게 얼른 나가라”고 했다.",
    },
    {
      id: 8,
      url: "/news/8",
      journal_name: "조선일보",
      detail_img_path:
        "https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202202/24/cbd64c06-d6e5-43e6-baaa-1ed06789e6db.jpg",
      title:
        "허경영 '우리도 똑같이 3억 냈어!'…새벽 1시 토론에 극대노",
      content:
        "국가혁명당 허경영 후보가 지난 22일 열린 군소정당 후보의 대선 방송토론회를 앞두고 방송 시간에 대해 거세게 항의했다. 이날 토론은 22일 오후 11시 시작돼 다음 날 오전 1시까지 두 시간가량 진행됐다. 허 후보는 “누가 1시에 토론하랬냐. 당신은 취침 시간도 모르냐”고 성토했다.",
    },
  ]);


  

  
  
        
  useEffect(() => {  //fetch all articles and save them to articleState
    dispatch(fetchArticles());
  }, []); 

  const article = articleState.articles.find((value:any) => value.id === currArticleId); //find article with same id 
                                                                                         //this page should display THIS article
  /*
  var articleLeft = newsArticlesLeft[currArticleId - 1]; //Only necessary for MOCK DATA

  if (articleLeft === undefined) {
    var articleRight = newsArticlesRight.find((value:any) => value.id === currArticleId)
  } //Only necessary for MOCK DATA 
  */

  if(!article) { //if there is no article found with the id, go back to newsList (wrong URL)
    navigate ("/news")
  }

  /*
  if (articleLeft === undefined) {
    var article = articleRight
  } else {
    article = articleLeft
  } //Only necessary for MOCK DATA 
  */

  const alertPlaceholder = document.getElementById('liveAlertPlaceholder')

  const handleCopyClipBoard = async (text: any) => {
    try {
      await navigator.clipboard.writeText(text);
      
      alert('copied into your clipboard');
    } catch (error) {
      alert('COPYING FAILED');
    }
  };


    if (article?.journal_name === "한겨레") {
      return (
        <div className = "background_red">
            <NavBar/>
          <div className="card">
            
          
          <div className="card-header text-bg-danger mb-3">
            {article?.journal_name}
          </div>

          <div className="card-body">
            <h5 className="card-title">{article?.title}</h5>
          </div>
          <img src={article?.detail_img_path} 
          width = "600px"
          height = "300px" 
          object-fit = "cover"
          className="rounded mx-auto d-block" alt="..."></img>

          <div className="card-body">
            <p className="card-text">{article?.content}</p>
            <p>
            <a href="/news" className="btn btn-primary">Back</a>
            &nbsp; &nbsp;
            <button type="button" className="btn btn-primary" id="liveAlertBtn" onClick={() => handleCopyClipBoard(article?.content)}>Copy Content</button>
            </p>
          </div>
          </div>
        </div>
        );
      } else {
        return (
        <div className = "background_blue">
            <NavBar/>
          <div className="card">
            
          <div className="card-header text-bg-info mb-3">
            {article?.journal_name}
          </div>
    
          <div className="card-body">
            <h5 className="card-title">{article?.title}</h5>
          </div>
          <img src={article?.detail_img_path} 
          width = "600px"
          height = "300px" 
          object-fit = "cover"
          className="rounded mx-auto d-block" alt="..."></img>
    
          <div className="card-body">
            <p className="card-text">{article?.detail_text}</p>
            <p>
            <a href="/news" className="btn btn-primary">Back</a>
            &nbsp; &nbsp;
            <button type="button" className="btn btn-primary" id="liveAlertBtn" onClick={() => handleCopyClipBoard(article?.content)}>Copy Content</button>
            </p>
          </div>
          </div>
          </div>
        );

      }
  }
  
  export default NewsDetailPage