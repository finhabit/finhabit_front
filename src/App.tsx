import { Routes, Route } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';
import styled from 'styled-components';

import Home from './pages/home/Home';
import Finance from './pages/finance/Finance';
import Mypage from './pages/mypage/Mypage';
import Mypage_pw from './pages/mypage/Mypage_pw';

import Notification from './pages/notification/Notification';
import Mission from './pages/mission/Mission';
import Knowledge from './pages/knowledge/Knowledge';
import Quiz from './pages/quiz/Quiz';

import LedgerMain from './pages/ledger/ledgermain/LedgerMain';
import ConsumePlus from './pages/ledger/consumeplus/ConsumePlus';
import SetCategoryOutcome from './pages/ledger/setcategory/SetCategoryOutcome';
import SetCategoryIncome from './pages/ledger/setcategory/SetCategoryIncome';
import LedgerCalendar from './pages/ledger/ledgercalendar/LedgerCalendar';

import Main from './pages/onboarding/main/Main';
import Login from './pages/onboarding/login/Login';
import Signup from './pages/onboarding/signup/Signup';
import LevelTest from './pages/onboarding/leveltest/LevelTest';

const AppWrapper = styled.div`
  width: 100%;
  max-width: 414px;
  min-height: 100vh;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

function App() {
  return (
    <AppWrapper>
      <GlobalStyle />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/finance" element={<Finance />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/knowledge" element={<Knowledge />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/ledger" element={<LedgerMain />} />
        <Route path="/consumeplus" element={<ConsumePlus />} />
        <Route path="/setcategoryoutcome" element={<SetCategoryOutcome />} />
        <Route path="/setcategoryincome" element={<SetCategoryIncome />} />
        <Route path="/ledgercalendar" element={<LedgerCalendar />} />
        <Route path="/mypage/pw" element={<Mypage_pw />} />
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/leveltest" element={<LevelTest />} />

        {/* 위와 같이 페이지 만들고 연결해주세요 */}
      </Routes>
    </AppWrapper>
  );
}

export default App;
