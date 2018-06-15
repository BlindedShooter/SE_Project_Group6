import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navigation.scss";

//화면 중단의 네비게이션 바 입니다.
//동적으로 state를 관리할 필요가 없기 때문에 state없이 컴포넌트를 구현하였고 
//html형식으로 구현했고 각 탭을 누르면 이동하는 링크를 걸어두었습니다. 
//여기서 링크를 누르면 서버 요청을 보내고 데이터를 가져온 후 새로고침 없이 메뉴 리스트를 뿌려줍니다.
const Navigation = () => {
  return (
    <div className={styles.Navigation}>
      <ul className={styles.items}>
        <li className={styles.item}>
          <NavLink to="/menu/main" activeClassName={styles.active}>
            <span>식사</span>
          </NavLink>
        </li>
        <li className={styles.item}>
          <NavLink to="/menu/sides" activeClassName={styles.active}>
            <span>사이드 메뉴</span>
          </NavLink>
        </li>
        <li className={styles.item}>
          <NavLink to="/menu/beverages" activeClassName={styles.active}>
            <span>음료</span>
          </NavLink>
        </li>
        <li className={styles.item}>
          <NavLink to="/menu/etc" activeClassName={styles.active}>
            <span>기타</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
