import Carousel from "../../components/Carousel/Carousel";
import NavBar from "../../components/NavBar/NavBar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from 'react-router-dom';
import { useParams } from "react-router";
import { AppDispatch } from "../../store";
import { fetchPetitions, voteUp, selectPetition, deletePetition } from "../../store/slices/petition";
import ImageBtn, { ImageBtnType } from "../../components/ImageBtn/ImageBtn";
import UserInfoBtn, {
  UserInfoBtnType,
} from "../../components/UserInfoBtn/UserInfoBtn";
import CarouselComponent, {
  CarouselContentType,
} from "../../components/CarouselContent/CarouselContent";
import "./MainPage.css";
const MainPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const petitionState = useSelector(selectPetition);
  var currPetitionId = 1; //fetch number from current url
  //const [petitionTitle, setPetitionTitle] = useState("");
  //const [petitionId, setPetitionId] = useState(0);
  //const [petitionUrl, setPetitionUrl] = useState("");

  

  useEffect(() => {  //fetch all articles and save them to articleState
    dispatch(fetchPetitions());
    
  }, []); 


   //fetch all articles and save them to articleState
    
  

  /*
  useEffect(() => {  //fetch all articles and save them to articleState
    petition = petitionState.petitions.find((value:any) => value.id === currPetitionId)
    while(!petition && currPetitionId<100) {
      currPetitionId++
      petition = petitionState.petitions.find((value:any) => value.id === currPetitionId);
    }
  });*/


  const [carouselContents, setCarouselContents] = useState<
    CarouselContentType[]
  >([
    {
      id: 1,
      url: "/news/1",
      detail_img_path:
        "https://imgnews.pstatic.net/image/079/2022/11/07/0003704132_001_20221107124401245.jpg?type=w647",
      title: "원희룡 '사고 끊이지 않는 코레일...'",
      content:
        "윤 대통령사우디 해외출장 중 질타…승객불편 최소화·작업자 안전 당부 철도사고 늘어난다며 지난 3일 철도안전 비상대책회의 열었지만 5일 오봉역 코레일 직원",
    },
    {
      id: 2,
      url: "/news/2",
      detail_img_path:
        "http://www.laborparty.kr/wp-content/uploads/kboard_attached/5/202206/629f103000c8b8121227.jpg",
      title: "<노동자정치행동 성명> 화물연대 총파...",
      content:
        "화물연대는 '화물노동자의 최저임금제' 격인 안전운임제의 일몰제 폐지와 적용 품목 확대 등을 요구하고 있다. 안전운임제는 화물노동자들의 과로 과속 과적",
    },
    {
      id: 3,
      url: "/news/3",
      detail_img_path:
        "https://imgnews.pstatic.net/image/001/2022/11/04/PYH2022100507160001300_P4_20221104115612855.jpg?type=w647",
      title: "현무 낙탄, '관성항법장치' 또는 '제어장치'",
      content:
        "(서울=연합뉴스) 김지헌 기자 = 한 달 전 발생한 육군 현무-2C 탄도미사일 낙탄 사고 원인은 관성항법장치(INS)나 제어계통 장치 간 데이터 통신의 비정상으",
    },
    {
      id: 5,
      url: "/news/5",
      detail_img_path:
        "http://file3.instiz.net/data/file3/2019/10/05/4/c/b/4cb9adbe6cdd8af91cb62d616f3139bc.jpg",
      title: "호주 대통령, '한국인, 호주 방문시",
      content:
        "(뉴저지=우리뉴스) 한가인 특파원 = 호주 대통령 메이는 14일(현지시간) 한국인들이 호주 방문시 환전이 필요없다고 선언하며 빠르면 올 9월부터 한국인들은",
    },
    {
      id: 6,
      url: "/petition/",
      detail_img_path:
        "",
      title: "temp",
      content:
        "Click here fore Petition Details",
    },
  ]);
  const [btnContents, setBtnContents] = useState<ImageBtnType[]>([
    {
      url: "/politician",
      image:
        "https://media.istockphoto.com/photos/businessman-or-politician-making-speech-behind-the-pulpit-picture-id676327038?k=20&m=676327038&s=612x612&w=0&h=zb0yYF91voE-3-ar00zEjpG_HchV9LlpbCVPrErio1Q=",
    },
    {
      url: "/news",
      image:
        "https://media.istockphoto.com/photos/breaking-news-world-news-with-map-backgorund-picture-id1182477852?k=20&m=1182477852&s=612x612&w=0&h=I3wdSzT_5h1y9dHq_YpZ9AqdIKg8epthr8Guva8FkPA=",
    },
  ]);
  return (
    <div className="MainPage">
      <NavBar />
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
