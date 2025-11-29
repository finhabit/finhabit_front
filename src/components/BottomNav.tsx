import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import financeIcon from '@/assets/financepage.svg';
import homeIcon from '@/assets/homepage.svg';
import mypageIcon from '@/assets/mypage.svg';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;
  const currentActive = currentPath === '/finance' ? 'finance' : currentPath === '/mypage' ? 'mypage' : 'home';

  return (
    <NavBar>
      <NavItem $active={currentActive === 'finance'} onClick={() => navigate('/finance')}>
        <Icon src={financeIcon} alt="finance" />
      </NavItem>

      <NavItem $active={currentActive === 'home'} onClick={() => navigate('/')}>
        <Icon src={homeIcon} alt="home" />
      </NavItem>

      <NavItem $active={currentActive === 'mypage'} onClick={() => navigate('/mypage')}>
        <Icon src={mypageIcon} alt="mypage" />
      </NavItem>
    </NavBar>
  );
}

const NavBar = styled.nav`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 414px;
  height: 74px;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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
