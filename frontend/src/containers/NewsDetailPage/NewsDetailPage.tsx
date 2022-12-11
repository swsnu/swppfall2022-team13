import NavBar from '../../components/NavBar/NavBar'
import React from 'react';
import "./NewsDetailPage.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from 'react-router-dom';
import { useParams } from "react-router";
import { AppDispatch } from "../../store";
import axios from 'axios';
import { fetchArticles, fetchArticle, selectArticle, ArticleType } from "../../store/slices/article";
import NewsArticle, { NewsArticleType,} from "../../components/NewsArticle/NewsArticle";

const NewsDetailPage = () => {

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const articleState = useSelector(selectArticle);
  const { id } = useParams(); //fetch number from current url
  const relatedArticleContents: ArticleType[] = []

  var currArticleId:number = 1;
      if(id !== undefined) {
        currArticleId = parseInt(id) //current url number is stored into currArticleId
        }
  console.log("curr id is: " + currArticleId)

        
  useEffect(() => {  //fetch all articles and save them to articleState
    dispatch(fetchArticles());
    const getRelatedArticle = async () => {
      //await axios.post("http://ec2-13-209-0-212.ap-northeast-2.compute.amazonaws.com:8000/api/article/related/2/",{article_id: [1]});
      //const related_article_json = await axios.get("http://ec2-13-209-0-212.ap-northeast-2.compute.amazonaws.com:8000/api/article/related/" + currArticleId + "/");
      //const related_article_list = related_article_json.data
      const related_article_list = [1,2]
      console.log("related article list follows: " + related_article_list)
      var i = 0

      while (i<related_article_list.length) {
        var curr_id = related_article_list[i]
        const tempRelatedArticle = articleState.articles.find((value:any) => value.id === curr_id);
        relatedArticleContents.push(tempRelatedArticle)
        console.log("related article list pushed with: " + tempRelatedArticle.id)
        i++
      }
    };

    getRelatedArticle()
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

            

            {relatedArticleContents.map((related_article: any) => {
              console.log("related display:" + related_article.id)
              return (
                <NewsArticle
                  key={`${related_article.id}_todo`}
                  url={related_article.url}
                  id={related_article.id}
                  datetime_str={related_article.datetime_str}
                  detail_link_postfix={related_article.detail_link_postfix}
                  preview_prologue={related_article.preview_prologue}
                  journal_name={related_article.journal_name}
                  preview_img_path={related_article.preview_img_path}
                  detail_img_path={related_article.detail_img_path}
                  width={250}
                  height={250}
                  title={related_article.title}
                  detail_text={related_article.content}
                />
              );

              })}


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
            <button type="button" className="btn btn-primary" id="liveAlertBtn" onClick={() => handleCopyClipBoard(article?.detail_text)}>Copy Content</button>
            </p>
          </div>
          </div>
            <p></p>
            <div className="compare_news_articles">
            <h2>We have found these related articles :</h2>


            {relatedArticleContents.map((related_article: any) => {
              console.log("related display:" + related_article.id)
              return (
                <NewsArticle
                  key={`${related_article.id}_todo`}
                  url={related_article.url}
                  id={related_article.id}
                  datetime_str={related_article.datetime_str}
                  detail_link_postfix={related_article.detail_link_postfix}
                  preview_prologue={related_article.preview_prologue}
                  journal_name={related_article.journal_name}
                  preview_img_path={related_article.preview_img_path}
                  detail_img_path={related_article.detail_img_path}
                  width={250}
                  height={250}
                  title={related_article.title}
                  detail_text={related_article.content}
                />
              );

              })}
            



          </div>
          </div>

          



        );

      }
  }
  
  export default NewsDetailPage