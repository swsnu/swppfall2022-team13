import "./NewsArticleLeft.css";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export interface NewsArticleTypeLeft {
  id?: number;
  title?: string;
  content?: string;
  url: string;
  preview_img_path?: string;
  detail_img_path?: string;
  journal_name?: string;
  width?: number;
  height?: number;
  tags?: string[];
}

export default function NewsArticle(props: NewsArticleTypeLeft) {
    const navigate = useNavigate();
    const onClickHandler = () => {
      navigate(props.url);
    };
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