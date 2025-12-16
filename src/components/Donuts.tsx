import styled from 'styled-components';

export interface CategoryData {
  id: number | string;
  label: string;
  ratio: number;
  color: string;
}

interface DonutsProps {
  categories: CategoryData[];
  size?: number;
  strokeWidth?: number;
}

const Root = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  gap: 20px;
`;

const GraphSection = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SvgBox = styled.svg<{ $size: number }>`
  display: block;
  width: ${({ $size }) => `${$size}px`};
  height: ${({ $size }) => `${$size}px`};
  transform: rotate(-90deg);
`;

const LegendList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  flex: 1;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: Pretendard;
  font-size: 14px;
  color: #333;
`;

const LegendLabel = styled.div<{ $color: string }>`
  display: flex;
  align-items: center;
  font-weight: 500;
  width: 50px;

  &:before {
    content: '';
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${({ $color }) => $color};
    margin-right: 8px;
  }
`;

const LegendPercent = styled.div`
  font-weight: 600;
  color: #555;
`;

const deg2rad = (deg: number) => (deg * Math.PI) / 180;
const isFiniteNum = (n: number) => Number.isFinite(n);

function arcPath(cx: number, cy: number, r: number, startDeg: number, endDeg: number, isSingle: boolean) {
  if (!isFiniteNum(startDeg) || !isFiniteNum(endDeg)) return '';

  const sDeg = startDeg;
  const eDeg = endDeg;

  if (isSingle && Math.abs(eDeg - sDeg) >= 360) {
    return `
      M ${cx + r} ${cy}
      A ${r} ${r} 0 1 1 ${cx - r} ${cy}
      A ${r} ${r} 0 1 1 ${cx + r} ${cy}
    `;
  }

  const largeArc = eDeg - sDeg > 180 ? 1 : 0;

  const x1 = cx + r * Math.cos(deg2rad(sDeg));
  const y1 = cy + r * Math.sin(deg2rad(sDeg));
  const x2 = cx + r * Math.cos(deg2rad(eDeg));
  const y2 = cy + r * Math.sin(deg2rad(eDeg));

  return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`;
}

const Donuts: React.FC<DonutsProps> = ({ categories = [], size = 176, strokeWidth = 25 }) => {
  const totalRatio = categories.reduce((sum, cat) => sum + cat.ratio, 0);

  const validCategories = categories.filter((cat) => cat.ratio > 0);
  const isSingleCategory = validCategories.length === 1;

  const gapAngle = isSingleCategory ? 0 : 25; // 카테고리 별 그래프 간의 간격 설정부 (30도 괜찮은듯?)
  const totalGap = gapAngle * validCategories.length;
  const totalArc = 360 - totalGap;

  const radius = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;

  const fills: React.ReactNode[] = [];

  let cursor = 0;

  if (totalRatio > 0) {
    validCategories.forEach((cat) => {
      const angle = (cat.ratio / totalRatio) * totalArc;
      const capPad = 0;

      const start = cursor + capPad;
      const end = cursor + angle - capPad;

      if (end > start) {
        const path = arcPath(cx, cy, radius, start, end, isSingleCategory);
        fills.push(
          <path
            key={cat.id}
            d={path}
            fill="none"
            stroke={cat.color}
            strokeWidth={strokeWidth}
            strokeLinecap={isSingleCategory ? 'butt' : 'round'}
          />,
        );
      }

      cursor += angle + gapAngle;
    });
  }

  return (
    <Root>
      <GraphSection>
        <SvgBox $size={size} viewBox={`0 0 ${size} ${size}`}>
          <circle cx={cx} cy={cy} r={radius} fill="none" strokeWidth={strokeWidth} />
          {fills}
        </SvgBox>
      </GraphSection>

      <LegendList>
        {validCategories.map((cat) => (
          <LegendItem key={cat.id}>
            <LegendLabel $color={cat.color}>{cat.label}</LegendLabel>
            <LegendPercent>{totalRatio > 0 ? Math.round((cat.ratio / totalRatio) * 100) : 0}%</LegendPercent>
          </LegendItem>
        ))}
      </LegendList>
    </Root>
  );
};

export default Donuts;
