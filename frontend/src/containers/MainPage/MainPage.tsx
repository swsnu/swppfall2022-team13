import Carousel from "../../components/Carousel/Carousel";
import NavBar from "../../components/NavBar/NavBar";
import { useEffect, useState } from "react";
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import ImageBtn, { ImageBtnType } from "../../components/ImageBtn/ImageBtn";
import { AppDispatch } from "../../store";
import UserInfoBtn, {
  UserInfoBtnType,
} from "../../components/UserInfoBtn/UserInfoBtn";
import CarouselComponent, {
  CarouselContentType,
} from "../../components/CarouselContent/CarouselContent";
import axios from 'axios';
import { fetchQuoras, selectQuora, deleteQuora, postQuora } from "../../store/slices/quora";
import { fetchPetitions, selectPetition, deletePetition, postPetition } from "../../store/slices/petition";
import {
  fetchPoliticians,
  selectPolitician,
} from "../../store/slices/politician";
import { fetchArticles, selectArticle } from "../../store/slices/article";
import "./MainPage.css";

const MainPage = () => {

  const navigate = useNavigate();
  const quoraState = useSelector(selectQuora);
  const petitionState = useSelector(selectPetition);
  const articleState = useSelector(selectArticle);
  const politicianState = useSelector(selectPolitician);
  const dispatch = useDispatch<AppDispatch>();

  //const [petition, setPetition] = useState();

  const currCarouselContents: CarouselContentType[] = [
    {
      id: 1,
      url: "/news/",
      detail_img_path:
        "https://imgnews.pstatic.net/image/079/2022/11/07/0003704132_001_20221107124401245.jpg?type=w647",
      title: "Link to NewsList",
      content:
        "Click here to see more detail",
    },
  ]

  useEffect(() => {
    dispatch(fetchQuoras());
    dispatch(fetchPetitions());
    dispatch(fetchPoliticians());
    dispatch(fetchArticles());

    
  }, []);  

  const article1 = articleState.articles.at(articleState.articles.length-1)
  if(article1) {
    const temp: CarouselContentType = {
      id: currCarouselContents.length,
      url: "/article/" + article1.id,
      detail_img_path:
      article1.detail_img_path,
      title: article1.title,
      content:
        "Our Latest News!: Click here for more detail",
    }
    currCarouselContents.push(temp)
  } 

  const article2 = articleState.articles.at(articleState.articles.length-2)
  if(article2) {
    const temp: CarouselContentType = {
      id: currCarouselContents.length,
      url: "/article/" + article2.id,
      detail_img_path:
      article2.detail_img_path,
      title: article2.title,
      content:
        "Our Latest News!: Click here for more detail",
    }
    currCarouselContents.push(temp)
  } 

  const article3 = articleState.articles.at(articleState.articles.length-3)
  if(article3) {
    const temp: CarouselContentType = {
      id: currCarouselContents.length,
      url: "/article/" + article3.id,
      detail_img_path:
      article3.detail_img_path,
      title: article3.title,
      content:
        "Our Latest News!: Click here for more detail",
    }
    currCarouselContents.push(temp)
  } 

  const petition1 = petitionState.petitions.find((value:any) => value.vote > 10)
  if(petition1) {
    const temp: CarouselContentType = {
      id: currCarouselContents.length,
      url: "/petition/" + petition1.id,
      detail_img_path:
      petition1.photo_url,
      title: petition1.title,
      content:
        "Trending Petition!\n" + "Current Vote: " + petition1.vote,
    }
    currCarouselContents.push(temp)
  } 

  const petition2 = petitionState.petitions.at(petitionState.petitions.length-1)
  if(petition2) {
    const temp: CarouselContentType = {
      id: currCarouselContents.length,
      url: "/petition/" + petition2.id,
      detail_img_path:
      petition2.photo_url,
      title: petition2.title,
      content:
        "Our Latest Petition!\n" + "Current Vote: " + petition2.vote,
    }
    currCarouselContents.push(temp)
  } 

  const quora1 = quoraState.quoras.at(quoraState.quoras.length-1)
  if(quora1) {
    const temp: CarouselContentType = {
      id: currCarouselContents.length,
      url: "/quora/" + quora1.id,
      detail_img_path:
      "https://bitnine.net/wp-content/uploads/2016/11/How-to-win-a-debate-according-to-Harvard%E2%80%99s-world-champion-debate-team-2.jpg",
      title: "Quora of: " + quora1.title,
      content:
        "Click here to visit our latest quora",
    }
    currCarouselContents.push(temp)
  } 

  const quora2 = quoraState.quoras.at(quoraState.quoras.length-2)
  if(quora2) {
    const temp: CarouselContentType = {
      id: currCarouselContents.length,
      url: "/quora/" + quora2.id,
      detail_img_path:
      "https://bitnine.net/wp-content/uploads/2016/11/How-to-win-a-debate-according-to-Harvard%E2%80%99s-world-champion-debate-team-2.jpg",
      title: "Quora of: " + quora2.title,
      content:
        "Click here to visit our latest quora",
    }
    currCarouselContents.push(temp)
  } 

  const politician1 = politicianState.politicians.at(politicianState.politicians.length-1)
  if(politician1) {
    const temp: CarouselContentType = {
      id: currCarouselContents.length,
      url: "/politician/" + politician1.id,
      detail_img_path:
      politician1.image_src,
      title: "Visit: " + politician1.name,
      content:
        "Click here to check out this politician",
    }
    currCarouselContents.push(temp)
  } 

  const politician2 = politicianState.politicians.at(politicianState.politicians.length-2)
  if(politician2) {
    const temp: CarouselContentType = {
      id: currCarouselContents.length,
      url: "/politician/" + politician2.id,
      detail_img_path:
      politician2.image_src,
      title: "Visit: " + politician2.name,
      content:
        "Click here to check out this politician",
    }
    currCarouselContents.push(temp)
  } 

  const politician3 = politicianState.politicians.at(politicianState.politicians.length-3)
  if(politician3) {
    const temp: CarouselContentType = {
      id: currCarouselContents.length,
      url: "/politician/" + politician3.id,
      detail_img_path:
      politician3.image_src,
      title: "Visit: " + politician3.name,
      content:
        "Click here to check out this politician",
    }
    currCarouselContents.push(temp)
  } 


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
      <Carousel className="Carousel" sliderContents={currCarouselContents} />
    </div>
  );
};

export default MainPage;
