import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { useParams } from "react-router";
import { UserInfoBtnType } from "../../components/UserInfoBtn/UserInfoBtn";
import {
  fetchPoliticians,
  PoliticianType,
} from "../../store/slices/politician";
import { selectPolitician } from "../../store/slices/politician";
import { AppDispatch } from "../../store";

const PoliticianDetailPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const politicianState = useSelector(selectPolitician);
  const navigate = useNavigate();
  const userInfoBtnContent: UserInfoBtnType = {
    url: "/user/1",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3qAb5Xu6-hZguic1bPpFbicnmwOlHHIQ_ANoaY1xcLwrHfem6M1mNZkspUnq4u4DgjWs&usqp=CAU",
  };
  useEffect(() => {
    dispatch(fetchPoliticians());
  }, []);
  return (
    <div className="PoliticianDetailPage">
      <h1>This is JJDD PoliticianDetailPage</h1>
      <p>so what</p>
    </div>
  );
};

export default PoliticianDetailPage;
