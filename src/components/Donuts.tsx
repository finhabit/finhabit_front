import React from "react";
import styled from "styled-components";

export const CARD_MAX = 320;

// 테두리
const GraphBox = styled.div`
  display: flex;
  width: ${CARD_MAX}px;
  height: 260px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-radius: 23px;
  border: 2px solid #dfe678;
  background: #fdfdfd;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.1);
`;


const Content = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 25px;
  display: flex;
  align-items: center;
`;

// 우상단 라벨
const TopRightLabel = styled.div`
  position: absolute;
  top: 22px;
  right: 90px;
  color: #000;
  text-align: right;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

// 그래프 svg
const SvgBox = styled.svg`
  display: block;
  width: 176px;
  height: auto;
  aspect-ratio: 1 / 1;
`;


const deg2rad = (deg: number) => (deg * Math.PI) / 180;

function arcPath(cx: number, cy: number, r: number, startDeg: number, endDeg: number) {
    const s = deg2rad(startDeg);
    const e = deg2rad(endDeg);
    const x1 = cx + r * Math.cos(s);
    const y1 = cy + r * Math.sin(s);
    const x2 = cx + r * Math.cos(e);
    const y2 = cy + r * Math.sin(e);
    const largeArc = Math.abs(endDeg - startDeg) > 180 ? 1 : 0;
    const sweep = 1;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} ${sweep} ${x2} ${y2}`;
}

const Donuts: React.FC = () => {
    const percent = 30;
    const label = "식비";

    // 크기/색상
    const size = 176;
    const strokeWidth = 25;
    const primaryColor = "#848D00";
    const trackColor = "#DFE678";

    //오른쪽 90° + 90°, 왼쪽 180°
    const baseAngles = [90, 90, 180];
    const gapAngle = 17;        // 조각 사이 틈
    const gapsCount = baseAngles.length;
    const startAngle = -85;

    // 계산
    const p = Math.max(0, Math.min(100, percent));
    const radius = (size - strokeWidth) / 2;
    const cx = size / 2;
    const cy = size / 2;


    const capPadDeg = ((strokeWidth / (2 * Math.PI * radius)) * 360) * 0.6;


    const FILL_OVERLAP_PX = 1;
    const fillStrokeWidth = strokeWidth + FILL_OVERLAP_PX;
    const coverPadDeg = ((FILL_OVERLAP_PX / (2 * Math.PI * radius)) * 360) * 0.5;

    const totalGap = gapAngle * gapsCount;
    const totalArc = 360 - totalGap;
    const scale = totalArc / 360;
    const segAngles = baseAngles.map(a => a * scale);

    let remaining = (360 * p) / 100;

    const tracks: React.ReactNode[] = [];
    const fills: React.ReactNode[] = [];

    let cursor = startAngle;

    for (let i = 0; i < segAngles.length; i++) {
        const segStart = cursor;
        const segEnd = segStart + segAngles[i];


        const drawStart = segStart + capPadDeg;
        const drawEnd = segEnd - capPadDeg;

        if (drawEnd > drawStart) {
            tracks.push(
                <path
                    key={`t-${i}`}
                    d={arcPath(cx, cy, radius, drawStart, drawEnd)}
                    fill="none"
                    stroke={trackColor}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                />
            );


            if (remaining > 0) {
                const segAvailable = drawEnd - drawStart;
                const fillLen = Math.min(segAvailable, remaining);


                const fillStart = Math.max(drawStart, drawStart - coverPadDeg);
                const fillEnd = Math.min(drawEnd, drawStart + fillLen + coverPadDeg);

                fills.push(
                    <path
                        key={`f-${i}`}
                        d={arcPath(cx, cy, radius, fillStart, fillEnd)}
                        fill="none"
                        stroke={primaryColor}
                        strokeWidth={fillStrokeWidth}
                        strokeLinecap="round"
                    />
                );

                remaining -= fillLen;
            }
        }

        cursor = segEnd + gapAngle;
    }

    return (
        <GraphBox>
            <Content>
                <TopRightLabel>{label}&nbsp;&nbsp;{p}%</TopRightLabel>

                <SvgBox viewBox={`0 0 ${size} ${size}`}>
                    {tracks}
                    {fills}
                </SvgBox>
            </Content>
        </GraphBox>
    );
};

export default Donuts;
