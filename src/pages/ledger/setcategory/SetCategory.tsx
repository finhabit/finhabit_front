import { useState } from "react";
import * as S from "./SetCategory.style";
import { useNavigate } from "react-router-dom";

import arrow_left_alt from "../../../assets/arrow_left_alt.png";
import close from "../../../assets/close.png";
import categoryeat from "../../../assets/categoryeat.png";
import categorytran from "../../../assets/categorytran.png";
import categoryshopping from "../../../assets/categoryshopping.png";
import categoryrest from "../../../assets/categoryrest.png";
import save from "../../../assets/save.png";

export default function SetCategory() {
  const navigate = useNavigate(); 
  const [desc, setDesc] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<"cash" | "card" | null>(
    null
  );

  const categories = [
    { src: categoryeat, alt: "식비" },
    { src: categoryshopping, alt: "쇼핑" },
    { src: categoryrest, alt: "여가" },
    { src: categorytran, alt: "교통" },
  ];

  // 카테고리 클릭 시
  const handleCategoryClick = (altText: string) => {
    if (selectedCategory === altText) {
      setSelectedCategory(null);
      setDesc("");
    } else {
      setSelectedCategory(altText);
      setDesc(altText);
    }
  };

  // 닫기(X) 버튼 클릭 시 초기화
  const handleReset = () => {
    setDesc("");
    setSelectedCategory(null);
    setSelectedMethod(null);
  };

  return (
    <S.Container>
      <S.TopBar>
        <div>
          <S.Icon
            src={arrow_left_alt}
            alt="arrow"
            onClick={() => navigate(-1)}
          />
          <S.Amount>2,000원</S.Amount>
        </div>
        <S.Icon src={close} alt="close" onClick={handleReset} />
      </S.TopBar>

      <S.DescDisplay $isPlaceholder={!desc}>{desc || "내역"}</S.DescDisplay>

      <S.CategoryContainer $hasSelected={!!selectedCategory}>
        {categories.map((c) => (
          <S.CategoryBadge
            key={c.alt}
            src={c.src}
            alt={c.alt}
            $active={selectedCategory === c.alt}
            $dimOthers={!!selectedCategory && selectedCategory !== c.alt}
            onClick={() => handleCategoryClick(c.alt)}
          />
        ))}
      </S.CategoryContainer>

      <S.MethodContainer>
        <S.MethodButton
          $active={selectedMethod === "cash"}
          onClick={() => setSelectedMethod("cash")}
        >
          현금
        </S.MethodButton>
        <S.MethodButton
          $active={selectedMethod === "card"}
          onClick={() => setSelectedMethod("card")}
        >
          카드
        </S.MethodButton>
      </S.MethodContainer>
      <S.SaveBtn
        src={save}
        alt="저장버튼"
        onClick={() => navigate("/ledgercalendar")}
      />
    </S.Container>
  );
}
