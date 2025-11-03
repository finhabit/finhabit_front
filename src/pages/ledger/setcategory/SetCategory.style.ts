import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Pretendard", sans-serif;
  padding: 30px;
  margin-top:30px;
  background-color: #fff;
`;

export const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 30px;
`;


export const Icon = styled.img`
  height: 20px;
  cursor: pointer;
`;

export const Amount = styled.span`
  color: #dc6d6d;
  font-size: 32px;
  font-weight: 500;
  margin-left: 30px;
`;

export const DescDisplay = styled.div<{ $isPlaceholder: boolean }>`
  width: 100%;
  border-bottom: 2px solid #b3b3b3;
  font-size: 32px;
  margin: 25px 0 50px 0;
  min-height: 30px;
  text-align: left;
  color: ${(props) => (props.$isPlaceholder ? "#aaa" : "#333")};
  transition: color 0.2s ease;
`;

export const CategoryContainer = styled.div<{ $hasSelected?: boolean }>`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 25px;
`;

export const CategoryBadge = styled.img<{
  $active: boolean;
  $dimOthers?: boolean;
}>`
  width: 60px;
  height: 60px;
  cursor: pointer;
  opacity: ${({ $active, $dimOthers }) =>
    $active ? 1 : $dimOthers ? 0.5 : 0.8};
  transition: opacity 0.2s ease, transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;



export const MethodContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 25px;
`;

export const MethodButton = styled.button<{ $active: boolean }>`
  background-color: #dfe67880;
  border: none;
  border-radius: 10px;
  padding: 10px 25px;
  font-size: 15px;
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.2s ease;
  transform: ${({ $active }) => ($active ? "scale(1.08)" : "scale(1)")};
`;


export const SaveBtn = styled.img`
  width: 26px;
  position: absolute;
  bottom: 30px;
  right: 20px;
  left: 50%;
  transform: translateX(150px);
  cursor: pointer;
`;