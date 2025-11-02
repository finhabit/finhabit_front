import { useNavigate } from "react-router-dom";
import back from "../../assets/back.png";
import setting from "../../assets/setting.png";
import * as S from "./Mission.style";

export default function Mission() {
  const navigate = useNavigate();
  
  return (
    <>
      <S.UpLine>
        <S.Icons src={back} alt="이전으로" onClick={() => navigate(-1)} />
        미션
        <S.Icons src={setting} alt="설정아이콘" />
      </S.UpLine>
      <S.RemindingSection>
        <S.N_Section>
          미션 모아보기
          <S.ContentBox>내용내용</S.ContentBox>
        </S.N_Section>
        <S.N_Section>
          미션 진행 상황
          <S.ContentBox>내용내용</S.ContentBox>
        </S.N_Section>
        <S.N_Section>
          완료한 미션들
          <S.ContentBox>내용내용</S.ContentBox>
        </S.N_Section>
      </S.RemindingSection>
    </>
  );
}
