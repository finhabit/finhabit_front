import styled from "styled-components";

import Home from "./pages/home/Home";
import Finance from "./pages/finance/Finance";
import Mypage from "./pages/mypage/Mypage";

import Notification from "./pages/notification/Notification";
import Mission from "./pages/mission/Mission";

import LedgerMain from "./pages/ledger/ledgermain/LedgerMain";
import ConsumePlus from "./pages/ledger/consumeplus/ConsumePlus";
import { Routes, Route } from "react-router-dom";

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
      <Routes>
        <Route path="/finance" element={<Finance />} />
        <Route path="/" element={<Home />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/ledger" element={<LedgerMain />} />
        <Route path="/consumeplus" element={<ConsumePlus />} />
        {/* 위와 같이 페이지 만들고 연결해주세요 */}
      </Routes>
    </AppWrapper>
  );
}

export default App;
