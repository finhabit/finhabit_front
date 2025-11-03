import {
    Page,
    Header,
    Title,
    IconButton,
    ContentWrap,
    List,
    ListRow,
    LeftCol,
    Label,
    Value,
    RightCol,
    Divider,
    SectionTitle,
    FooterActions,
    TextButton,
} from "./Mypage.style";
import BottomNav from "../../components/BottomNav";

//아이콘
import chevronRight from "../../assets/chevronRight.svg";
import settingsIcon from "../../assets/settingsIcon.svg";


export default function Mypage() {
    return (
        <Page>
            <Header>
                <Title>마이페이지</Title>
                <IconButton aria-label="설정">
                    <img src={settingsIcon} alt="" />
                </IconButton>
            </Header>

            <ContentWrap>
                <List>
                    <ListRow>
                        <LeftCol>
                            <Label>닉네임</Label>
                            <Value>연짱이</Value>
                        </LeftCol>
                        <RightCol>
                            <img src={chevronRight} alt="" />
                        </RightCol>
                    </ListRow>
                    <Divider />

                    <ListRow>
                        <LeftCol>
                            <Label>이메일</Label>
                            <Value>연짱이</Value>
                        </LeftCol>
                        <RightCol>
                            <img src={chevronRight} alt="" />
                        </RightCol>
                    </ListRow>
                    <Divider />

                    <ListRow>
                        <LeftCol>
                            <Label>비밀번호</Label>
                            <Value>연짱이</Value>
                        </LeftCol>
                        <RightCol>
                            <img src={chevronRight} alt="" />
                        </RightCol>
                    </ListRow>
                    <Divider />

                    <SectionTitle>성취 현황</SectionTitle>
                    <Divider />
                </List>

                <FooterActions>
                    <TextButton type="button">회원탈퇴</TextButton>
                    <TextButton type="button">로그아웃</TextButton>
                </FooterActions>
            </ContentWrap>
            <BottomNav />
        </Page>
    );
}
