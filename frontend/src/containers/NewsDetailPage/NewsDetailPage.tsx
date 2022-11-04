import NavBar from '../../components/NavBar/NavBar'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from 'react-router-dom';
import { useParams } from "react-router";
import { AppDispatch } from "../../store";
import { fetchArticles, fetchArticle, selectArticle } from "../../store/slices/article";
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

  useEffect(() => {  //fetch all articles and save them to articleState
    dispatch(fetchArticles());
  }, []); 

  const article = articleState.articles.find((value:any) => value.id === currArticleId); //find article with same id 
                                                                                         //this page should display THIS article

  if(!article) { //if there is no article found with the id, go back to newsList (wrong URL)
    navigate ("/news")
  }



    return (
      <>
      <NavBar />
        <h1>This is JJDD NewsDetailPage</h1>

        <div className="row">
        <div className="left"><b>Title:</b></div>
        <div className="titleContent" id="article-title">{article?.title}</div>
      </div>
      <p></p>
      <div className="row">
        <div className="left"><b>Content:</b></div>
        <div className="contentContent" id="article-content">{article?.content}</div>
      </div>

      </>
    );
  }
  
  export default NewsDetailPage