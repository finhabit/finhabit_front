import { useNavigate } from "react-router-dom";
import back from "../../assets/back.svg";
import * as S from "./Knowledge.style";

export default function Knowledge() {
  const navigate = useNavigate();

  return (
    <>
      <S.UpLine>
        <S.Icons src={back} alt="이전으로" onClick={() => navigate(-1)} />
        지식
      </S.UpLine>
      <S.RemindingSection>
        <S.N_Section>
          오늘의지식
          <S.ContentBox>
            <S.PerK>
              <S.KTitle>신용점수 관리의 중요성</S.KTitle>
              <div>
                신용점수는 '금융 신뢰도'입니다.
                <br /> 연체나 과도한 대출은 점수를 낮춥니다.
              </div>
            </S.PerK>
            <S.PerK>
              <S.KTitle>신용점수 관리의 중요성</S.KTitle>
              <div>
                신용점수는 '금융 신뢰도'입니다.
                <br /> 연체나 과도한 대출은 점수를 낮춥니다.
              </div>
            </S.PerK>
          </S.ContentBox>
        </S.N_Section>
        <S.N_Section>
          주간 월간 모아보기
          <S.ContentBox1>
            <S.PerGath>
              <S.GathTitle>보험의 역할</S.GathTitle>
              <S.GathContent>
                보험은 사고나 질병 등 예상치 못한 위험에 대비하는
                '보호장치'입니다.
              </S.GathContent>
            </S.PerGath>
            <S.PerGath>
              <S.GathTitle>분산투자의 의미</S.GathTitle>
              <S.GathContent>
                자산을 여러 종목에 나눠 투자해 위험을 줄이는 방법입니다.
              </S.GathContent>
            </S.PerGath>
          </S.ContentBox1>
        </S.N_Section>
      </S.RemindingSection>
    </>
  );
}
