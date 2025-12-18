import styled from 'styled-components';

type LevelCardProps = {
  title: string;
  options: string[];
  selectedIndex: number | null;
  onSelect: (index: number) => void;
};

const markers = ['①', '②', '③'];

const LevelCard = ({ title, options, selectedIndex, onSelect }: LevelCardProps) => {
  return (
    <Card>
      <Title>{title}</Title>

      <OptionsWrapper>
        {options.map((option, index: number) => (
          <OptionItem key={index} onClick={() => onSelect(index)} $selected={selectedIndex === index}>
            <OptionText $selected={selectedIndex === index}>
              {markers[index]} {option}
            </OptionText>
          </OptionItem>
        ))}
      </OptionsWrapper>
    </Card>
  );
};

export default LevelCard;

/* -------- styled-components -------- */

const Card = styled.div`
  display: flex;
  width: 330px;
  height: 150px;
  padding: 16px 12px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-radius: 11px;
  border: 1px solid #d9d9d9;
  box-sizing: border-box;
  background: #ffffff;
  overflow: hidden;
`;

const Title = styled.p`
  margin: 0;
  color: #848d00;
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: 1.3;
  text-align: left;
  word-break: keep-all;
  white-space: pre-line;
`;

const OptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

interface OptionItemProps {
  $selected: boolean;
}

const OptionItem = styled.button<OptionItemProps>`
  border: none;
  background: transparent;
  padding: 0;
  text-align: left;
  cursor: pointer;
`;

interface OptionTextProps {
  $selected: boolean;
}

const OptionText = styled.span<OptionTextProps>`
  color: ${({ $selected }) => ($selected ? '#BEC372' : '#2B2B27')};
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: 121.374%;
  word-break: keep-all;
  white-space: nowrap;
`;
