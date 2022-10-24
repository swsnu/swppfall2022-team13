import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ImageBtn from "./ImageBtn";
import styled from "styled-components";
import { ImageBtnType } from "./ImageBtn";
import CarouselComponent, { CarouselContentType } from "./CarouselContent";

const Wrap = styled.div`
  margin: 10% auto;
  width: 100%;
  .slick-prev:before {
    opaicty: 1;
    color: black;
    left: 0;
  }
  .slick-next:before {
    opacity: 1;
    color: black;
  }
  .slick-arrow {
    display: flex;
    z-index: 10;
    width: 1vw;
    height: 1vw;
  }
`;

interface IProps {
  sliderContents: CarouselContentType[];
  className?: string;
}

export default function Carousel(props: IProps) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    //autoplay: true,
    //autoplaySpeed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  return (
    <div className={props.className}>
      <Wrap>
        <Slider {...settings}>
          {props.sliderContents.map((data) => {
            return (
              <CarouselComponent
                url={data.url}
                image_src={data.image_src}
                width={250}
                height={250}
                title={data.title}
                content={data.content}
              />
            );
          })}
        </Slider>
      </Wrap>
    </div>
  );
}
