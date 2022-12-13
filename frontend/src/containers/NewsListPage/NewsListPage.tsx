import NavBar from "../../components/NavBar/NavBar";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import NewsArticle, {
  NewsArticleType,
} from "../../components/NewsArticle/NewsArticle";
import { fetchArticles, selectArticle } from "../../store/slices/article";
import "./NewsListPage.css";
import axios from "axios";

const NewsListPage = () => {
  const articleState = useSelector(selectArticle);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    //axios.post("/api/article/", td);
    dispatch(fetchArticles());
    console.log("this is state: " + articleState);
  }, []);

  //AFTER PROPER BACKEND

  return (
    <>
      <div className="background_list">
        <div className="row">
          <div className="col-sm-6">
            <div id="header-left">
              아래는 진보적 성향인 언론사들의 뉴스입니다.
            </div>

            <div className="LeftNews">
              {articleState.articles.map((td: any) => {
                if (
                  td.journal_name === "한겨레" ||
                  td.journal_name === "이데일리" ||
                  td.journal_name === "경향신문" ||
                  td.journal_name === "머니투데이" ||
                  td.journal_name === "오마이뉴스" ||
                  td.journal_name === "프레시안"
                ) {
                  return (
                    <NewsArticle
                      key={`${td.id}_todo`}
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
                }
              })}
            </div>
          </div>

          <div className="col-sm-6">
            <div id="header-right">
              아래는 보수적 성향인 언론사들의 뉴스입니다.
            </div>

            <div className="RightNews">
              {articleState.articles.map((td: any) => {
                if (
                  td.journal_name !== "한겨레" &&
                  td.journal_name !== "이데일리" &&
                  td.journal_name !== "경향신문" &&
                  td.journal_name !== "머니투데이" &&
                  td.journal_name !== "오마이뉴스" &&
                  td.journal_name !== "프레시안"
                ) {
                  return (
                    <NewsArticle
                      key={`${td.id}_todo`}
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
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsListPage;
