import styled from "styled-components";
import Home from "./pages/home/Home";
import Finance from "./pages/finance/Finance";
import Mypage from "./pages/mypage/Mypage";
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
      </Routes>
    </AppWrapper>
  );
}

export default App;
