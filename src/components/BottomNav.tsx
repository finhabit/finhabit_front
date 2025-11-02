import styled from "styled-components";
import { useState } from "react";
import financeIcon from "../assets/financepage.png";
import homeIcon from "../assets/homepage.png";
import mypageIcon from "../assets/mypage.png";
// 모든 페이지 파일들이 만들어진 후 각각 페이지 연결하시면 됩니다.

export default function BottomNav() {
  const [active, setActive] = useState("home");

  return (
    <NavBar>
      <NavItem
        $active={active === "finance"}
        onClick={() => setActive("finance")}
      >
        <Icon src={financeIcon} alt="finance" />
      </NavItem>

      <NavItem $active={active === "home"} onClick={() => setActive("home")}>
        <Icon src={homeIcon} alt="home" />
      </NavItem>

      <NavItem
        $active={active === "mypage"}
        onClick={() => setActive("mypage")}
      >
        <Icon src={mypageIcon} alt="mypage" />
      </NavItem>
    </NavBar>
  );
}

const NavBar = styled.nav`
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 414px;
  height: 64px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 100;
`;

const NavItem = styled.button<{ $active?: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  opacity: ${({ $active }) => ($active ? 1 : 0.5)};
  transition: opacity 0.2s ease;
`;

const Icon = styled.img`
  width: 28px;
  height: 28px;
  display: block;
`;
