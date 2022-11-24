import "./NumberInfo.css";
export interface NumberInfoType {
  num: string | number;
  category: string;
  detail: string;
}

export default function NumberInfo(props: NumberInfoType) {
  //clickhandler 추가하기
  return (
    <div id="numberInfo">
      <div id="left">{props.num}</div>
      <div id="right">
        <div>
          <span id="category">{props.category}</span>
        </div>
        <div>
          <span id="detail">{props.detail}</span>
        </div>
      </div>
    </div>
  );
}
