import React from "react";
import styles from "./RestaurantHeader.scss";

//레스토랑 헤더는 화면 상단의 레스토랑 정보를 보여주는 곳으로 배경이미지, 로고이미지, 이름, 설명, 태그로 구성되어 있습니다.
//state가 동적으로 바뀌지 않기 때문에 state를 넣지 않고 html 형식으로 화면에 뿌려줬습니다.
const RestaurantHeader = ({
  backgroundImage,
  logoImage,
  name,
  description,
  tags,
  stars,  //별점과 리뷰는 구현하지 않았습니다.
  reviews
}) => {
  const tagList = tags.map((tag, idx) => (
    <span key={idx} className={styles.tag}>
      {tag}
    </span>
  ));
  return (
    <div className={styles.RestaurantHeader}>
      <header>
        <img src={backgroundImage} alt="backgroundImage" />
      </header>
      <div className={styles.headerContents}>
        <div className={styles.floatingCard}>
          <div className={styles.logo}>
            <img src={logoImage} alt="backgroundImage" />
          </div>
          <div className={styles.information}>
            <span className={styles.name}>{name}</span>
            <span className={styles.description}>{description}</span>
            <div className={styles.tagList}>{tagList}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantHeader;
