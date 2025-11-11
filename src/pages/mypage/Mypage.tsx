import {
    Page, Header, Title, IconButton, FirstSectionSpacer,
    ItemSection, ItemRow, LeftCol, Label, Value, RightCol,
    Divider, SectionTitle, FooterActions, TextButton,
    /* ✅ 모달 스타일 추가 임포트 */
    ModalOverlay, ModalSheet, ModalHeader, ModalTitle, ModalCloseBtn, ModalContent, NickInput
} from "./Mypage.style";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import BottomNav from "../../components/BottomNav";

// 아이콘
import chevronRight from "../../assets/chevronRight.svg";
import settingsIcon from "../../assets/settingsIcon.svg";
import close2Icon from "../../assets/close2.svg";

export default function Mypage() {
    const navigate = useNavigate();

    // ✅ 닉네임 상태 & 모달 상태
    const [nickname, setNickname] = useState("연짱이");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tempNick, setTempNick] = useState(nickname);
    const inputRef = useRef<HTMLInputElement>(null);

    const openModal = () => {
        setTempNick(nickname);
        setIsModalOpen(true);
    };
    const closeModal = () => setIsModalOpen(false);

    const saveNickname = () => {
        const next = tempNick.trim();
        if (next) setNickname(next);
        closeModal();
    };

    // ✅ 모달 열릴 때 자동 포커스
    useEffect(() => {
        if (isModalOpen) {
            setTimeout(() => inputRef.current?.focus(), 0);
        }
    }, [isModalOpen]);

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
                <ItemRow onClick={openModal} style={{ cursor: "pointer" }}>
                    <LeftCol>
                        <Label>닉네임</Label>
                        <Value>{nickname}</Value>
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

            {/* ✅ 닉네임 수정 모달 */}
            {isModalOpen && (
                <ModalOverlay
                    role="dialog"
                    aria-modal="true"
                    onClick={closeModal}          // 바깥 클릭 닫힘
                >
                    <ModalSheet
                        onClick={(e) => e.stopPropagation()} // 내부 클릭 전파 방지
                    >
                        <ModalHeader>
                            <ModalTitle>닉네임 수정</ModalTitle>
                            <ModalCloseBtn aria-label="닫기" onClick={closeModal}>
                                <img src={close2Icon} alt="" />
                            </ModalCloseBtn>
                        </ModalHeader>

                        <ModalContent>
                            <NickInput
                                ref={inputRef}
                                value={tempNick}
                                onChange={(e) => setTempNick(e.target.value)}
                                onKeyDown={(e) => { if (e.key === "Enter") saveNickname(); }}
                                placeholder="닉네임을 입력하세요"
                                maxLength={20}
                            />
                        </ModalContent>
                    </ModalSheet>
                </ModalOverlay>
            )}
        </Page>
    );
}
