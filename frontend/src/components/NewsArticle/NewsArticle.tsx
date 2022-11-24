import "./NewsArticle.css";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

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

  if (props.journal_name === "한겨레") {
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
            <p className="content">{props.preview_prologue}</p>

            <div className="dateContent">
              <text className="card-text">
                <small className="text-muted">
                  Created: {props?.datetime_str}
                </small>
              </text>
              &nbsp; &nbsp;
              <text className="card-text">
                <small className="text-muted">
                  Last updated: {props?.updated_at}
                </small>
              </text>
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
            <p className="content">{props.preview_prologue}</p>
            <div className="dateContent">
              <text className="card-text">
                <small className="text-muted">
                  Created: {props?.datetime_str}
                </small>
              </text>
              &nbsp; &nbsp;
              <text className="card-text">
                <small className="text-muted">
                  Last updated: {props?.updated_at}
                </small>
              </text>
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
