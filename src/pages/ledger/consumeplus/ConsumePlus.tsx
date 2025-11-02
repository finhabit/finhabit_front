import React, { useState } from "react";
import close from "../../../assets/close.png";
import won from "../../../assets/won.png";
import save from "../../../assets/save.png";
import * as S from "./ConsumePlus.style";

export default function ConsumePlus() {
  const [amount, setAmount] = useState<string>(""); // 금액 상태
  const [selected, setSelected] = useState<"income" | "expense" | "">(""); // 수입/지출 선택 상태

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

 const handleReset = () => {
   setAmount("");
   setSelected("");
 };

  return (
    <>
      {" "}
      <S.Header>
        <S.DateText>2025.04.06</S.DateText>
        <S.CloseBtn src={close} alt="취소아이콘" onClick={handleReset} />
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
          onClick={() => setSelected("income")}
        >
          수입
        </S.TypeButton>
        <S.TypeButton
          $active={selected === "expense"}
          color="#F87171"
          onClick={() => setSelected("expense")}
        >
          지출
        </S.TypeButton>
      </S.ButtonSection>
      <S.SaveBtn src={save} alt="저장버튼" />
    </>
  );
}
