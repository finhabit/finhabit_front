import {
    Page,
    Header,
    Title,
    IconButton,
    FirstSectionSpacer,
    ItemSection,
    ItemRow,
    LeftCol,
    Label,
    Value,
    RightCol,
    Divider,
    SectionTitle,
    FooterActions,
    TextButton,
} from "./Mypage.style";
import { useNavigate } from "react-router-dom";
import BottomNav from "../../components/BottomNav";

//아이콘
import chevronRight from "../../assets/chevronRight.svg";
import settingsIcon from "../../assets/settingsIcon.svg";


export default function Mypage() {
    const navigate = useNavigate();
    return (
        <Page>
            <Header>
                <Title>마이페이지</Title>
                <IconButton aria-label="설정">
                    <img src={settingsIcon} alt="" />
                </IconButton>
            </Header>

            <FirstSectionSpacer />

            {/* 닉네임 */}
            <ItemSection>
                <ItemRow>
                    <LeftCol>
                        <Label>닉네임</Label>
                        <Value>연짱이</Value>
                    </LeftCol>
                    <RightCol>
                        <img src={chevronRight} alt="" />
                    </RightCol>
                </ItemRow>
                <Divider />
            </ItemSection>

            {/* 이메일 */}
            <ItemSection>
                <ItemRow>
                    <LeftCol>
                        <Label>이메일</Label>
                        <Value>연짱이</Value>
                    </LeftCol>
                    <RightCol>
                        <img src={chevronRight} alt="" />
                    </RightCol>
                </ItemRow>
                <Divider />
            </ItemSection>

            {/* 비밀번호 */}
            <ItemSection>
                <ItemRow>
                    <LeftCol>
                        <Label>비밀번호</Label>
                        <Value>연짱이</Value>
                    </LeftCol>
                    <RightCol onClick={() => navigate("/mypage/pw")}>
                        <img src={chevronRight} alt="" />
                    </RightCol>
                </ItemRow>
                <Divider />
            </ItemSection>

            {/* 성취 현황 */}
            <ItemSection>
                <SectionTitle>성취 현황</SectionTitle>
                <Divider />
            </ItemSection>

            {/* 회원탈퇴/로그아웃 */}
            <FooterActions>
                <TextButton type="button">회원탈퇴</TextButton>
                <TextButton type="button">로그아웃</TextButton>
            </FooterActions>
            <BottomNav />
        </Page>
    );
}
