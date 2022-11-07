import "./NewsArticle.css";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export interface NewsArticleType {
  id?: number;
  title?: string;
  content?: string;
  url: string;
  preview_img_path?: string;
  detail_img_path?: string;
  journal_name?: string;
  width?: number;
  height?: number;
  created_at?: string;
  updated_at?: string;
  tags?: string[];
}

export default function NewsArticle(props: NewsArticleType) {
    const navigate = useNavigate();
    const onClickHandler = () => {
      navigate(props.url);
    };

    if(props.journal_name === "한겨레") {

      return (
        
        <p>
          <div className="NewsArticleLeft" onClick={onClickHandler}>
  
            <div className="leftContent">
              <img
                className="image"
                src={props.detail_img_path}
                alt="Hmm"
                width={props.width}
                height={props.height}
              />
            </div>
            <div className="rightContent">
              <div className="title">{props.title}</div>
              <p className="content">{props.content}</p>
            
              <div className="dateContent">
                <text className="card-text"><small className="text-muted">Created: {props?.created_at}</small></text>
                &nbsp; &nbsp;
                <text className="card-text"><small className="text-muted">Last updated: {props?.updated_at}</small></text>
              </div>
            </div>
          </div>
       </p>
       
      );


    } else {

      return (
        <p>
          <div className="NewsArticleRight" onClick={onClickHandler}>
  
            <div className="leftContent">
              <img
                className="image"
                src={props.detail_img_path}
                alt="Hmm"
                width={props.width}
                height={props.height}
              />
            </div>
            <div className="rightContent">
              <div className="title">{props.title}</div>
              <p className="content">{props.content}</p>
              <div className="dateContent">
                <text className="card-text"><small className="text-muted">Created: {props?.created_at}</small></text>
                &nbsp; &nbsp;
                <text className="card-text"><small className="text-muted">Last updated: {props?.updated_at}</small></text>
              </div>
            </div>
          </div>
    </p>
      );



    }
    
  }


  /*

  return (
        
        <div className="NewsArticleLeft" onClick={onClickHandler}>
  
          <div className="leftContent">
            <img
              className="image"
              src={props.detail_img_path}
              alt="Hmm"
              width={props.width}
              height={props.height}
            />
          </div>
          <div className="rightContent">
            <div className="title">{props.title}</div>
            <p className="content">{props.content}</p>
          </div>
        </div>
      );


    }

    */