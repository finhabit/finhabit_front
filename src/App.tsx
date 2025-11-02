import styled from "styled-components";
import Home from "./pages/home/Home";
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
        <Route path="/" element={<Home />} />
        {/* 위와 같이 페이지 만들고 연결해주세요 */}
      </Routes>
    </AppWrapper>
  );
}

export default App;
