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
        <NavBar />
        <h1>BREAKING NEWS LIST</h1>

        <p>We have some bad news for you</p>

        <div className="row">
          <div className="col-sm-6">
            <div className="LeftNews">
              {articleState.articles.map((td: any) => {
                if (td.journal_name === "한겨레") {
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
                      width={250}
                      height={250}
                      title={td.title}
                      detail_text={td.content}
                    />
                  );
                }
              })}
            </div>
          </div>

          <div className="col-sm-6">
            <div className="RightNews">
              {articleState.articles.map((td: any) => {
                if (td.journal_name !== "한겨레") {
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
                      width={250}
                      height={250}
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
