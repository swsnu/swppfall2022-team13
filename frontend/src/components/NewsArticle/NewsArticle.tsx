import "./NewsArticle.css";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NavigationIcon from "@mui/icons-material/Navigation";

export interface NewsArticleType {
  id?: number;
  title?: string;
  content?: string;
  datetime_str?: any;
  preview_prologue?: string;
  detail_link_postfix?: string;
  preview_img_path?: string;
  detail_img_path?: string;
  journal_name: string;
  detail_text?: string;
  created_at?: any;
  updated_at?: any;
  article_type?: string;
  url: string;
  width?: number;
  height?: number;
  tags?: string[];
}

export default function NewsArticle(props: NewsArticleType) {
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate("/news/" + props.id);
  };

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
  const target_url: string = image_urls.find(
    (url) => url.journal_name === props.journal_name
  ).image_url;
  if (props.article_type === "relatedNews") {
    return (
      <p>
        <div id="relatedNews" onClick={onClickHandler}>
          <div id="ArticleHeader">
            <div id="journal_name">
              <img id="header_image" src={target_url}></img>
              {props.journal_name}
            </div>
          </div>
          <div id="contents">
            <div id="leftContent">
              <img
                id="image"
                src={props.detail_img_path}
                alt="Hmm"
                width={props.width}
                height={props.height}
              />
            </div>
            <div id="relatedRightContent">
              <div id="related_title">{props.title}</div>
            </div>
          </div>
        </div>
      </p>
    );
  } else {
    if (
      props.journal_name === "한겨레" ||
      props.journal_name === "이데일리" ||
      props.journal_name === "머니투데이" ||
      props.journal_name === "경향신문" ||
      props.journal_name === "오마이뉴스" ||
      props.journal_name === "프레시안"
    ) {
      return (
        <div id="NewsArticleLeft" onClick={onClickHandler}>
          <div id="ArticleHeader">
            <div id="journal_name">
              <img id="header_image" src={target_url}></img>
              {props.journal_name}
            </div>
          </div>
          <div id="contents">
            <div id="leftContent">
              <img
                id="image"
                src={props.detail_img_path}
                alt="Hmm"
                width={props.width}
                height={props.height}
              />
            </div>
            <div id="rightContent">
              <div id="title">{props.title}</div>
              <div id="content">{props.preview_prologue}</div>

              {/* <div id="dateContent">
            <text id="card-text">
              <small id="text-muted">
                Created: {props?.datetime_str}
              </small>
            </text>
            &nbsp; &nbsp;
            <text id="card-text">
              <small id="text-muted">
                Last updated: {props?.updated_at}
              </small>
            </text>
          </div> */}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div id="NewsArticleRight" onClick={onClickHandler}>
          <div id="ArticleHeader">
            <div id="journal_name">
              <img id="header_image" src={target_url}></img>
              {props.journal_name}
            </div>
          </div>
          <div id="contents">
            <div id="leftContent">
              <img
                id="image"
                src={props.detail_img_path}
                alt="Hmm"
                width={props.width}
                height={props.height}
              />
            </div>
            <div id="rightContent">
              <div id="title">{props.title}</div>
              <div id="content">{props.preview_prologue}</div>
            </div>
          </div>
        </div>
      );
    }
  }
}
