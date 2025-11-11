import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import close from "../../../assets/close.svg";
import won from "../../../assets/won.svg";
import save from "../../../assets/save.svg";
import * as S from "./ConsumePlus.style";

export default function ConsumePlus() {
  const navigate = useNavigate();

  const [amount, setAmount] = useState<string>(""); // 금액 상태
  const [selected, setSelected] = useState<"income" | "expense" | "">(""); // 수입/지출 선택 상태

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  // 버튼 클릭 핸들러
  const handleTypeSelect = (type: "income" | "expense") => {
    setSelected(type);
    navigate("/setcategory"); // setcategory 페이지로 이동
  };

  return (
    <>
      <S.Header>
        <S.DateText>2025.04.06</S.DateText>
        <S.CloseBtn
          src={close}
          alt="취소아이콘"
          onClick={() => navigate("/ledger")}
        />
      </S.Header>

      <S.AmountBox>
        <S.WonImg src={won} alt="원 글자" />
        <S.Input
          type="number"
          placeholder="0"
          value={amount}
          onChange={handleAmountChange}
        />
      </S.AmountBox>

      <S.ButtonSection>
        <S.TypeButton
          $active={selected === "income"}
          color="#68B6F3"
          onClick={() => handleTypeSelect("income")}
        >
          수입
        </S.TypeButton>
        <S.TypeButton
          $active={selected === "expense"}
          color="#F87171"
          onClick={() => handleTypeSelect("expense")}
        >
          지출
        </S.TypeButton>
      </S.ButtonSection>

      <S.SaveBtn src={save} alt="메모버튼" />
    </>
  );
}
