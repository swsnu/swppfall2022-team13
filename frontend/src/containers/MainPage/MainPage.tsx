import Carousel from "../../components/Carousel";
import { useState } from "react";
import ImageBtn, { ImageBtnType } from "../../components/ImageBtn";
import UserInfoBtn, { UserInfoBtnType } from "../../components/UserInfoBtn";
import CarouselComponent, {
  CarouselContentType,
} from "../../components/CarouselContent";
import "./MainPage.css";
const MainPage = () => {
  const btnSize = 150;
  const userInfoSize = 60;
  const [carouselContents, setCarouselContents] = useState<
    CarouselContentType[]
  >([
    {
      url: "/politician/1",
      image_src:
        "https://flexible.img.hani.co.kr/flexible/normal/970/646/imgdb/original/2020/1120/20201120502896.jpg",
      title: "Truph",
      content:
        "Donald John Trump (born June 14, 1946) is an American politician, media personality, and businessman who served as the 45th president",
    },
    {
      url: "/survey/1",
      image_src:
        "https://media.istockphoto.com/vectors/businessman-with-two-options-to-choose-between-a-or-b-vector-id944840704?k=20&m=944840704&s=170667a&w=0&h=pxvWJD8-LmwxsvYGli2UAfPsXM50u9znfg4uPjn7184= ",
      title: "A일까요 B일까요",
      content:
        "요즘 ~~ 문제가 재조명 받고 있는데요, 여러분의 생각이 궁금합니다",
    },
    {
      url: "/news/1",
      image_src:
        "https://imgnews.pstatic.net/image/654/2022/10/24/0000023081_001_20221024112205711.jpg?type=w647",
      title:
        "윤 대통령, 레고랜드 사태에 시장안정 조치 신속 집행…약탈적 불법사금융, 무관용 원칙 강력단속",
      content:
        "최근 강원도가 레고랜드 테마파크 조성을 위해 발행한 2050억원 규모 프로젝트파이낸싱(PF)",
    },
    {
      url: "/petition/1",
      image_src:
        "http://www.irobotnews.com/news/photo/201804/13600_31930_239.png",
      title: "서울대입구역 맥도날드를 돌려주세요",
      content: "~~~",
    },
  ]);
  const [btnContents, setBtnContents] = useState<ImageBtnType[]>([
    {
      url: "/politician",
      image:
        "https://media.istockphoto.com/photos/businessman-or-politician-making-speech-behind-the-pulpit-picture-id676327038?k=20&m=676327038&s=612x612&w=0&h=zb0yYF91voE-3-ar00zEjpG_HchV9LlpbCVPrErio1Q=",
    },
    {
      url: "/survey",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAZHu9-UJHpRRb8nv9w-LNgNvu6PruDiZ6wQ&usqp=CAU",
    },
    {
      url: "/news",
      image:
        "https://media.istockphoto.com/photos/breaking-news-world-news-with-map-backgorund-picture-id1182477852?k=20&m=1182477852&s=612x612&w=0&h=I3wdSzT_5h1y9dHq_YpZ9AqdIKg8epthr8Guva8FkPA=",
    },
  ]);
  const userInfoBtnContent: UserInfoBtnType = {
    url: "/user/1",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3qAb5Xu6-hZguic1bPpFbicnmwOlHHIQ_ANoaY1xcLwrHfem6M1mNZkspUnq4u4DgjWs&usqp=CAU",
  };
  return (
    <div className="MainPage">
      <UserInfoBtn
        url={userInfoBtnContent.url}
        image={userInfoBtnContent.image}
      />
      <div className="MainBtns">
        {btnContents.map((data) => {
          return <ImageBtn url={data.url} image={data.image} />;
        })}
      </div>
      <Carousel className="Carousel" sliderContents={carouselContents} />
    </div>
  );
};

export default MainPage;
