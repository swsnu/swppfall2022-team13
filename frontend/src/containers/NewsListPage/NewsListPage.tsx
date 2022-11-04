import NavBar from '../../components/NavBar/NavBar'
import { useState } from "react";
import NewsArticle, { NewsArticleType,} from "../../components/NewsArticle/NewsArticle";


const NewsListPage = () => {

  const [newsArticles, setCarouselContents] = useState<
    NewsArticleType[]
  >([
    {
      url: "/news/1",
      image_src:
        "http://file3.instiz.net/data/file3/2019/10/05/4/c/b/4cb9adbe6cdd8af91cb62d616f3139bc.jpg",
      title:
        "호주 대통령, 한국인, 호주 방문시 환전할 필요 없어(종합)",
      content:
        "(뉴저지=우리뉴스) 한가인 특파원 = 호주 대통령 메이는 14일(현지시간) 한국인들이 호주 방문시 환전이 필요없다고 선언하며 빠르면 올 9월부터 한국인들은 환전 없이 호주에서 물건을 구매할 수 있을 것이라고 밝혔다. 메이 대통령은 이날 이번 선언의 가장 큰 이유중 하나로 한국 사람들이 즐겨입는 바지에는 호주머니가 달려 있었기 때문이라고 언급했다.",
    },
    {
      url: "/news/2",
      image_src:
        "https://imgnews.pstatic.net/image/654/2022/10/24/0000023081_001_20221024112205711.jpg?type=w647",
      title:
        "윤 대통령, 레고랜드 사태에 시장안정 조치 신속 집행…약탈적 불법사금융, 무관용 원칙 강력단속",
      content:
        "최근 강원도가 레고랜드 테마파크 조성을 위해 발행한 2050억원 규모 프로젝트파이낸싱(PF)",
    },
    {
      url: "/news/3",
      image_src:
        "https://imgnews.pstatic.net/image/001/2022/11/04/PYH2022100507160001300_P4_20221104115612855.jpg?type=w647",
      title:
        "현무 낙탄, '관성항법장치' 또는 '제어장치 통신' 비정상 추정",
      content:
        "(서울=연합뉴스) 김지헌 기자 = 한 달 전 발생한 육군 현무-2C 탄도미사일 낙탄 사고 원인은 관성항법장치(INS)나 제어계통 장치 간 데이터 통신의 비정상으로 추정됐다.",
    },
    {
      url: "/news/4",
      image_src:
        "https://imgnews.pstatic.net/image/661/2022/11/04/0000015488_001_20221104130501743.png?type=w647",
      title:
        "카지노서 사라진 145억.. 핵심 피의자 구속 영장 신청",
      content:
        "꺼억 알빠노",
    },
  ]);


  
    return (
      <>
      <NavBar />
        <h1>This is JJDD NewsListPage</h1>

            <p>
            so what
            </p>

            {newsArticles.map((td: any) => {
            return (
              <NewsArticle
                url={td.url}
                image_src={td.image_src}
                width={250}
                height={250}
                title={td.title}
                content={td.content}
              />
            );
          })}

      </>
    );
  }
  
  export default NewsListPage