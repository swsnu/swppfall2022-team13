import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import NewsArticle, { NewsArticleType, } from "../../components/NewsArticle/NewsArticle";
import { AppDispatch } from "../../store";
import { fetchArticles, selectArticle } from "../../store/slices/article";
import "./NewsDetailPage.css";

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
        "https://news.imaeil.com/photos/2022/11/08/2022110811274067784_l.jpg",
      title:
        "민주, '개 3마리 건사 못한 文' 발언 홍준표에 '盧 아방궁 비난 사과 잊었나?'",
        detail_text:
        "▶앞서 홍준표 시장은 이날 오전 9시 21분쯤 자신의 페이스북을 통해 '김정은에(으로부터) 선물받은 풍산개 3마리가 이젠 쓸모가 없어졌나 보다'라며 '김정은 보듯 애지중지 하더니, 사료값 등 나라가 관리비 안 준다고 이젠 못 키우겠다고 반납하려고 하는 것을 보니, 개 3마리도 건사 못하면서 어떻게 대한민국을 5년이나 통치했는지?'라고 물었다.",
    },
    {
      id: 2,
      url: "/news/2",
      journal_name: "한겨레",
      detail_img_path:
        "data:image/jpeg;base64,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",
      title:
        "[나이트포커스] 개들만 불쌍한 與野 '개싸움'",
        detail_text:
        "문 전 대통령 측은 '풍산개들은 법적으로 국가소유이고 대통령기록물이므로 문 전 대통령 퇴임 시 대통령기록관에 이관되었으나, 대통령기록관에 반려동물을 관리하는 인적·물적 시설과 시스템이 없기 때문에 정서적 교감이 필요한 반려동물의 특성까지 감안하여, 대통령기록관 및 행안부와 문 전 대통령 사이에 그 관리를 문 전 대통령에게 위탁하기로 협의가 이루어졌다'며 '윤석열 당선인과의 회동에서도 선의의 협의가 있었다'고 전했습니다.",
    },
    {
      id: 3,
      url: "/news/3",
      journal_name: "한겨레",
      detail_img_path:
        "https://post-phinf.pstatic.net/MjAxOTA0MjVfMTU5/MDAxNTU2MTcyMzA4OTA4.RVR_FZZyh-N4lBt3iNbQOBGItgXlWu4wRKhwHp_MNDEg.rTimPr1iVtTZP-iAAzwOoHhxYmybdlqrU-ICxdx4K5gg.PNG/5ce4-hhxaafz5637280.png?type=w1200",
      title:
        "시진핑 中주석 선물 판다 암수 한쌍, 대한항공 특별기로 3일 입국",
        detail_text:
        "전세계 2000여 마리 밖에 남지 않은 희귀동물 판다의 운송에 나선 대한항공은 다년 간의 생동물 운송 노하우를 살려 화물칸 온도를 18도로 유지하고 환기 장치를 가동, 판다 운송에 심혈을 기울였다. 전용 수의사와 사육사도 동승해 20~30분 간격으로 판다의 상태를 체크했다.",
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
        "https://img.mbn.co.kr/filewww/news/2022/11/08/16678740456369bcfd69467.jpg",
      title:
        "홍준표 '文, 개 3마리도 건사 못하면서 나라 5년 통치'",
        detail_text:
        "홍준표 대구시장은 오늘(8일) 오전 페이스북을 통해 '김정은에 선물 받은 풍산개 세 마리가 이젠 쓸모가 없어졌나 보다'라며 '김정은 보듯 애지중지하더니 사료값 등 나라가 관리비 안 준다고 이젠 못 키우겠다고 반납하려고 하는 거 보니 개 세 마리도 건사 못하면서 어떻게 대한민국을 5년이나 통치했느냐'고 문재인 전 대통령을 겨냥했습니다.",
    },
    {
      id: 6,
      url: "/news/6",
      journal_name: "조선일보",
      detail_img_path:
        "http://db.kookje.co.kr/news2000/photo/2022/1109/L20221109.99099002405i1.jpg",
      title:
        "풍산개 반환 논란 빚은 문재인, 반려동물 등록제 위반 의혹",
        detail_text:
        "현재 양산 사저에서 마루, 토리, 다운 (반려견), 찡찡이 (반려묘) 총 4마리의 반려동물을 키우고 있는 것으로 알려졌다. 의무 대상이 아닌 반려묘를 제외하고, 문 전 대통령이 풍산개를 반환하기 전 키우던 반려견 3마리는 모두 동물등록 대상이다. 현재 주소상에 등록된 반려동물 수 보다 현재 문 전 대통령 사저에 키우고 있는 등록대상의 반려동물의 수를 넘어섰다는 게 안 의원실 설명이다.",
    },
    {
      id: 7,
      url: "/news/7",
      journal_name: "조선일보",
      detail_img_path:
        "https://img.khan.co.kr/news/2018/03/17/l_2018031701002096200165431.webp",
      title:
        "“아버지가 또 태극기집회에 가셨다” 가족갈등과 노인소외",
        detail_text:
        "“어디 감히 국민의 손으로 뽑은 대통령을 자기네 마음대로 쫓아내! 문재인도 대화합을 위해 지금이라도 물러나고….” 어머니가 다급하게 말리신다. 어머니 배모씨(67)는 “내가 당신이 밖에서 무슨 짓을 하고 다니든 뭐라고 한 적이 있냐”며 “제발 집안에서는 큰소리 안 나게 얼른 나가라”고 했다.",
    },
    {
      id: 8,
      url: "/news/8",
      journal_name: "조선일보",
      detail_img_path:
        "http://news.kbs.co.kr/data/news/2019/11/27/4332121_kp9.jpg",
      title:
        "본좌청년회 모집공고! 허경영을 지지하는 청년들의 모임~",
        detail_text:
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
        <div>
            {/* <NavBar/> */}
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
            <p className="card-text">{article?.detail_text}</p>
            <p>
            <a href="/news" className="btn btn-primary">Back</a>
            &nbsp; &nbsp;
            <button type="button" className="btn btn-primary" id="liveAlertBtn" onClick={() => handleCopyClipBoard(article?.detail_text)}>Copy Content</button>
            </p>
          </div>
          </div>
        </div>
        );
      } else {
        return (
        <div>
            {/* <NavBar/> */}
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
            <button type="button" className="btn btn-primary" id="liveAlertBtn" onClick={() => handleCopyClipBoard(article?.detail_text)}>Copy Content</button>
            </p>
          </div>
          </div>
            <p></p>
            <div className="compare_news_articles">
            <h2>We have found these related articles :</h2>
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
                            preview_prologue={td?.detail_text}
                            detail_text={td.detail_text}
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
                            preview_prologue={td?.detail_text}
                            detail_text={td?.detail_text}
                          />
                        );
                      })}   
         
                  </div>
                  </div>
                  </div>


          </div>
          </div>

          



        );

      }
  }
  
  export default NewsDetailPage