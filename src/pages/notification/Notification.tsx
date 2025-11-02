import { useNavigate } from "react-router-dom";
import back from "../../assets/back.png";
import setting from "../../assets/setting.png";
import * as S from "./Notification.style";

export default function Notification() {
  const navigate = useNavigate(); 

  return (
    <>
      <S.UpLine>
        <S.Icons src={back} alt="이전으로" onClick={() => navigate(-1)} />
        알림
        <S.Icons src={setting} alt="설정아이콘" />
      </S.UpLine>
      <S.RemindingSection>
        <S.N_Section>
          미션 리마인드
          <S.ContentBox>내용내용</S.ContentBox>
        </S.N_Section>
        <S.N_Section>
          학습 리마인드
          <S.ContentBox>내용내용</S.ContentBox>
        </S.N_Section>
        <S.N_Section>
          피드백 알림
          <S.ContentBox>내용내용</S.ContentBox>
        </S.N_Section>
      </S.RemindingSection>
    </>
  );
}
