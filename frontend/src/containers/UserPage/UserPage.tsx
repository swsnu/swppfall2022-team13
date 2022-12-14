import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { type } from "node:os";
import NewsArticle from "../../components/NewsArticle/NewsArticle";
import { useEffect, useState } from "react";
import "./UserPage.css";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

const UserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [likeArticles, setLikeArticles] = useState([]);
  const [likePoliticians, setLikePoliticians] = useState([]);

  async function logoutHandler() {
    await axios.get("/api/user/signout");
    navigate("/main/");
  }

  const getLikeArticles = async () => {
    const user_id = await axios.get("/api/user/islogin/");
    await axios.get(`/api/article/like/${user_id.data.id}/`).then((res) => {
      setLikeArticles(res.data);
    });
  };

  const getLikePoliticians = async () => {
    const user_id = await axios.get("/api/user/islogin/");
    await axios.get(`/api/politician/like/${user_id.data.id}/`).then((res) => {
      setLikePoliticians(res.data);
    });
  };

  useEffect(() => {
    getLikeArticles();
    getLikePoliticians;
  }, []);
  return (
    <>
      {/* <h1>UserPage</h1>
      <h3>USER_ID: {id}</h3>
      <p>Hi welcome to JJDD!</p> */}
      <div id="likedArticle">
        <div id="header">Liked News</div>
        <div>
          {likeArticles.map((td) => {
            return (
              <NewsArticle
                key={td.id}
                url={td.url}
                id={td.id}
                datetime_str={td.datetime_str}
                detail_link_postfix={td.detail_link_postfix}
                preview_prologue={td.preview_prologue}
                journal_name={td.journal_name}
                preview_img_path={td.preview_img_path}
                detail_img_path={td.detail_img_path}
                width={150}
                height={100}
                title={td.title}
                detail_text={td.content}
                article_type="relatedNews"
              />
            );
          })}
        </div>
      </div>
      <div id="likedPoliticians"></div>
      <button onClick={logoutHandler}>Logout</button>
    </>
  );
};

export default UserPage;
