import axios from "axios";
import { resolve } from "node:path/win32";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import NewsArticle, {
  NewsArticleType,
} from "../../components/NewsArticle/NewsArticle";
import * as React from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NavigationIcon from "@mui/icons-material/Navigation";
import { AppDispatch } from "../../store";
import { fetchArticles, selectArticle } from "../../store/slices/article";
import "./NewsDetailPage.css";
import { PropaneSharp } from "@mui/icons-material";
import Button from '@mui/material/Button';

const NewsDetailPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const articleState = useSelector(selectArticle);
  const { id } = useParams(); //fetch number from current url
  //const relatedArticleContents: NewsArticleType[] = []
  const [related_article_list, set_related_article_list] = useState([]);
  const [err, setErr] = useState(false);
  const [like, setLike] = useState(false);

  useEffect(() => {
    setLikeInit();
  }, []);

  const setLikeInit = async () => {
    const user_id = await axios.get("/api/user/islogin/");
    await axios
      .get(`/api/article/like/${user_id.data.id}/${id}/`)
      .then((res) => {
        setLike(res.data);
      });
  };

  const postLike = async () => {
    const isLogin = await axios.get("/api/user/islogin/");
    if (isLogin.data.status === true) {
      await axios.post("/api/article/like/" + isLogin.data.id + "/", {
        article_id: id,
      });
      setLike(!like);
    } else {
      alert("로그인하면 좋아하는 기사를 모아볼 수 있어요!");
      navigate("/login/");
    }
  };

  var currArticleId: number = 1;
  // const postLike = async () => {
  //   await axios.post("/api/article/like/" + getId(), { article_id: id });
  // };
  if (id !== undefined) {
    currArticleId = parseInt(id); //current url number is stored into currArticleId
  }
  console.log("curr id is: " + currArticleId);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });

    //fetch all articles and save them to articleState
    dispatch(fetchArticles());
    const getRelatedArticle = async () => {
      await axios
        .get("/api/article/related/" + currArticleId + "/")
        .then((res) => {
          const result = res.data.replaceAll("'", "").slice(1, -1).split(",");
          set_related_article_list(
            result.filter((item: string) => item !== id)
          );
        });
    };

    getRelatedArticle();
  }, [id]);

  const image_urls = [
    {
      journal_name: "오마이뉴스",
      image_url:
        "https://imgnews.pstatic.net/image/upload/spubs/AiG0000047/logo/2022/08/18/A_143105276.png?type=u144_144",
    },
    {
      journal_name: "조선일보",
      image_url:
        "https://imgnews.pstatic.net/image/upload/spubs/zbG0000023/logo/2020/12/03/A_172123314.jpg?type=u144_144",
    },
    {
      journal_name: "이데일리",
      image_url:
        "https://imgnews.pstatic.net/image/upload/spubs/w5G0000018/logo/2020/12/01/A_152830222.jpg?type=u144_144",
    },
    {
      journal_name: "한겨레",
      image_url:
        "https://mimgnews.pstatic.net/image/upload/office_logo/028/2017/12/21/logo_028_41_20171221160121.jpg?type=u144_144",
    },
    {
      journal_name: "경향신문",
      image_url:
        "https://imgnews.pstatic.net/image/upload/spubs/LPG0000032/logo/2022/11/24/A_145745216.png?type=u144_144",
    },
    {
      journal_name: "머니투데이",
      image_url:
        "https://imgnews.pstatic.net/image/upload/spubs/gCG0000008/logo/2021/01/26/A_135032183.png?type=u144_144",
    },
    {
      journal_name: "중앙일보",
      image_url:
        "https://imgnews.pstatic.net/image/upload/spubs/K7G0000025/logo/2021/08/20/A_163345038.png?type=u144_144",
    },
    {
      journal_name: "동아일보",
      image_url:
        "https://imgnews.pstatic.net/image/upload/spubs/FyG0000020/logo/2021/02/16/A_164244113.jpg?type=u144_144",
    },
    {
      journal_name: "프레시안",
      image_url:
        "https://mimgnews.pstatic.net/image/upload/office_logo/002/2017/12/21/logo_002_41_20171221154621.jpg?type=u144_144",
    },
    {
      journal_name: "한국경제",
      image_url:
        "https://imgnews.pstatic.net/image/upload/spubs/uuG0000015/logo/2020/12/07/A_144542084.jpg?type=u144_144",
    },
    {
      journal_name: "매일경제",
      image_url:
        "https://mimgnews.pstatic.net/image/upload/office_logo/009/2017/12/21/logo_009_41_20171221155521.jpg?type=u144_144",
    },
    {
      journal_name: "문화일보",
      image_url:
        "https://imgnews.pstatic.net/image/upload/spubs/xEG0000021/logo/2022/07/29/A_135629519.png?type=u144_144",
    },
  ];

  const article = articleState.articles.find(
    (value: any) => value.id === currArticleId
  ); //find article with same id
  //this page should display THIS article
  /*
  var articleLeft = newsArticlesLeft[currArticleId - 1]; //Only necessary for MOCK DATA

  if (articleLeft === undefined) {
    var articleRight = newsArticlesRight.find((value:any) => value.id === currArticleId)
  } //Only necessary for MOCK DATA 
  */

  /*
  if (articleLeft === undefined) {
    var article = articleRight
  } else {
    article = articleLeft
  } //Only necessary for MOCK DATA 
  */

  const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
  // const target_url: string = image_urls.find(
  //   (url) => url.journal_name === article.journal_name
  // ).image_url;
  useEffect(() => {
    if (!article) {
      //if there is no article found with the id, go back to newsList (wrong URL)
      navigate("/news");
    }
  }, []);
  const handleCopyClipBoard = async (text: any) => {
    try {
      await navigator.clipboard.writeText(text);

      alert("복사되었습니다!");
    } catch (error) {
      alert("COPYING FAILED");
    }
  };

  return (
    <div>
      <div className="whole_article">
        <div id="article_detail">
          <div id="img_div">
            <div>
              <img
                id="journal_img"
                src={
                  image_urls.find(
                    (url) => url.journal_name === article.journal_name
                  ).image_url
                }
              ></img>
            </div>
            <div id="article_journal_name">{article.journal_name}</div>
          </div>
          <div id="article_title">{article.title}</div>
          <img
            id="main_img"
            src={article?.detail_img_path}
            width="700px"
            height="400px"
            object-fit="cover"
            alt="..."
          ></img>

          <div id="detail_text">
            <p>{article?.detail_text}</p>
          </div>
          <div id="btns">
            <p>
              <Button
                sx={{bgcolor: '#b68763', ':hover': {bgcolor: '#e8bb98'}}}
                variant="contained"
                className="btn"
                id="liveAlertBtn"
                onClick={() => handleCopyClipBoard(article?.detail_text)}
              >
                Copy Content
              </Button>
              <Fab
                id="hello"
                style={like ? { color: "#965727" } : { color: "#DCC4B2" }}
                aria-label="like"
                onClick={postLike}
              >
                <FavoriteIcon />
              </Fab>
            </p>
          </div>
        </div>
        <div className="compare_news_articles">
          <div id="header">Related news</div>
          {related_article_list.map((id: string) => {
            const related_article = articleState.articles.find(
              (value: any) => value.id === Number(id)
            );
            if (
              related_article_list.length !== 0 &&
              related_article !== undefined
            ) {
              return (
                <NewsArticle
                  key={`${related_article.id}_relate`}
                  url={"/news/" + related_article.id}
                  id={related_article.id}
                  article_type="relatedNews"
                  datetime_str={related_article.datetime_str}
                  detail_link_postfix={related_article.detail_link_postfix}
                  preview_prologue={related_article.preview_prologue}
                  journal_name={related_article.journal_name}
                  preview_img_path={related_article.preview_img_path}
                  detail_img_path={related_article.detail_img_path}
                  width={100}
                  height={70}
                  title={related_article.title}
                  detail_text={related_article.content}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default NewsDetailPage;
