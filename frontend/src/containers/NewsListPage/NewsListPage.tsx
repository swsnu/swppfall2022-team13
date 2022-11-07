import NavBar from '../../components/NavBar/NavBar'
import { useState, useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { AppDispatch } from "../../store";
import NewsArticle, { NewsArticleType,} from "../../components/NewsArticle/NewsArticle";
import { fetchArticles, selectArticle } from "../../store/slices/article";
import { faLeftLong } from '@fortawesome/free-solid-svg-icons';
import "./NewsListPage.css";


const NewsListPage = () => {
  /*
  const articleState = useSelector(selectArticle);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchArticles());
  }, []); */   
  
  //AFTER PROPER BACKEND


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
        "(서울=연합뉴스) 김지헌 기자 = 한 달 전 발생한 육군 현무-2C 탄도미사일 낙탄 사고 원인은 관성항법장치(INS)나 제어계통 장치 간 데이터 통신의 비정상으로 추정됐다.",
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
      created_at: "2022.05.08",
      updated_at: "2022.05.10",
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


  
    return (
      <>
      <div className = "background_list">
      <NavBar />
        <h1>BREAKING NEWS LIST</h1>

            <p>
            We have some bad news for you
            </p>
            
          <div className="row">
                  <div className="col-sm-6">
                    <div className="LeftNews">

                        {newsArticlesLeft.map((td: any) => {
                        return (
                          <NewsArticle
                            key={`${td.id}_todo`}
                            url={td.url}
                            journal_name={td.journal_name}
                            detail_img_path={td.detail_img_path}
                            width={250}
                            height={250}
                            title={td.title}
                            content={td.content}
                          />
                        );
                      })}
                    </div>
                  </div>
            <div className="col-sm-6">
                  <div className="RightNews">
        
                        {newsArticlesRight.map((td: any) => {
                        return (
                          <NewsArticle
                            key={`${td.id}_todo`}
                            url={td.url}
                            journal_name={td?.journal_name}
                            detail_img_path={td?.detail_img_path}
                            created_at={td?.created_at}
                            updated_at={td?.updated_at}
                            width={250}
                            height={250}
                            title={td?.title}
                            content={td?.content}
                          />
                        );
                      })}   
         
                  </div>
                  
                </div>
            </div>
      </div>

      
      </>
    );
  }
  
  export default NewsListPage