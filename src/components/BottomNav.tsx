import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import financeIcon from "../assets/financepage.png";
import homeIcon from "../assets/homepage.png";
import mypageIcon from "../assets/mypage.png";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;
  const currentActive =
    currentPath === "/finance"
      ? "finance"
      : currentPath === "/mypage"
        ? "mypage"
        : "home";

  return (
    <NavBar>
      <NavItem
        $active={currentActive === "finance"}
        onClick={() => navigate("/finance")}
      >
        <Icon src={financeIcon} alt="finance" />
      </NavItem>

      <NavItem
        $active={currentActive === "home"}
        onClick={() => navigate("/")}
      >
        <Icon src={homeIcon} alt="home" />
      </NavItem>

      <NavItem
        $active={currentActive === "mypage"}
        onClick={() => navigate("/mypage")}
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
