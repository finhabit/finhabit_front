import React from "react";
import styled from "styled-components";

/* SummaryCard 안에 Donuts 임포트 */
const Root = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center; 
`;

const TopRightLabel = styled.div`
  position: absolute;
  top: 0;
  right: 0;    
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 600;
`;

const SvgBox = styled.svg`
  display: block;
  width: 176px;
  height: 176px;  
`;

// 그래프 svg
const deg2rad = (deg: number) => (deg * Math.PI) / 180;
const isFiniteNum = (n: number) => Number.isFinite(n);
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

function arcPath(cx: number, cy: number, r: number, startDeg: number, endDeg: number) {
    if (!isFiniteNum(startDeg) || !isFiniteNum(endDeg)) return "";
    const sDeg = Math.min(startDeg, endDeg);
    const eDeg = Math.max(startDeg, endDeg);
    const s = deg2rad(sDeg), e = deg2rad(eDeg);
    const x1 = cx + r * Math.cos(s), y1 = cy + r * Math.sin(s);
    const x2 = cx + r * Math.cos(e), y2 = cy + r * Math.sin(e);
    const largeArc = Math.abs(eDeg - sDeg) > 180 ? 1 : 0;
    if (![x1, y1, x2, y2, r].every(isFiniteNum)) return "";
    return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`;
}

const Donuts: React.FC = () => {
    const percent = 30;
    const label = "식비";

    const size = 176;
    const strokeWidth = 25;
    const primaryColor = "#848D00";
    const trackColor = "#DFE678";

    // 오른쪽 90° + 90°, 왼쪽 180°
    const baseAngles = [90, 90, 180];
    const gapAngle = 17;
    const gapsCount = baseAngles.length;
    const startAngle = -85;

    const p = clamp(percent, 0, 100);
    const radius = (size - strokeWidth) / 2;
    const cx = size / 2;
    const cy = size / 2;

    if (radius <= 0 || ![size, strokeWidth, radius, cx, cy].every(isFiniteNum)) {
        return null;
    }

    const capPadDeg = ((strokeWidth / (2 * Math.PI * radius)) * 360) * 0.6;


    const FILL_OVERLAP_PX = 1;
    const fillStrokeWidth = strokeWidth + FILL_OVERLAP_PX;
    const coverPadDeg = ((FILL_OVERLAP_PX / (2 * Math.PI * radius)) * 360) * 0.5;

    const totalGap = gapAngle * gapsCount;
    const totalArc = 360 - totalGap;

    const scale = totalArc / 360;
    const segAngles = baseAngles.map(a => a * scale);


    let remaining = clamp((360 * p) / 100, 0, totalArc);

    const tracks: React.ReactNode[] = [];
    const fills: React.ReactNode[] = [];

    let cursor = startAngle;

    for (let i = 0; i < segAngles.length; i++) {
        const segStart = cursor;
        const segEnd = segStart + segAngles[i];

        const drawStart = segStart + capPadDeg;
        const drawEnd = segEnd - capPadDeg;

        if (!isFiniteNum(drawStart) || !isFiniteNum(drawEnd) || drawEnd - drawStart <= 0.0001) {
            cursor = segEnd + gapAngle;
            continue;
        }

        const dTrack = arcPath(cx, cy, radius, drawStart, drawEnd);
        if (dTrack) {
            tracks.push(
                <path
                    key={`t-${i}`}
                    d={dTrack}
                    fill="none"
                    stroke={trackColor}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                />
            );
        }

        if (remaining > 0) {
            const segAvailable = Math.max(0, drawEnd - drawStart);
            const fillLen = Math.max(0, Math.min(segAvailable, remaining));

            if (fillLen > 0) {
                const fillStart = Math.max(drawStart, drawStart - coverPadDeg);
                const fillEnd = Math.min(drawEnd, drawStart + fillLen + coverPadDeg);

                if (fillEnd - fillStart > 0.0001) {
                    const dFill = arcPath(cx, cy, radius, fillStart, fillEnd);
                    if (dFill) {
                        fills.push(
                            <path
                                key={`f-${i}`}
                                d={dFill}
                                fill="none"
                                stroke={primaryColor}
                                strokeWidth={fillStrokeWidth}
                                strokeLinecap="round"
                            />
                        );
                    }
                }
                remaining = Math.max(0, remaining - fillLen);
            }
        }

        cursor = segEnd + gapAngle;
    }

    return (
        <Root>
            <TopRightLabel>{label}&nbsp;&nbsp;{p}%</TopRightLabel>
            <SvgBox viewBox={`0 0 ${size} ${size}`}>
                {tracks}
                {fills}
            </SvgBox>
        </Root>
    );
};

export default Donuts;
