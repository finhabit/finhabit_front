import styled from "styled-components";

export const UpLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 40px 35px 20px 35px;
  font-size: 22px;
  font-weight: 500;
`;

export const Icons = styled.img`
  height: 20px;
  cursor: pointer;
`;

export const CalendarSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

export const StyledCalendarWrapper = styled.div`
  .react-calendar {
    width: 100%;
    border: none;
    border-radius: 20px;
    background-color: #dfe67880;
    padding: 20px 10px;
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
  }

  .react-calendar__navigation {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 160px;
    height:10px;

    .react-calendar__navigation__label {
      font-size: 13px;
      font-weight: 600;
      width:100px;
      text-align:center;
      &:hover {
        background-color: transparent;
      }
    }

    .react-calendar__navigation__arrow {
      font-size: 20px;
      font-weight: bold;
      border: none;
      background: transparent;
      cursor: pointer;
      border-radius: 8px;
      &:hover {
        background-color: #e9eab9;
      }
    }
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
    margin-bottom: 10px;

    .react-calendar__month-view__weekdays__weekday {
      color: #616161;
      font-weight: 400;
      font-size: 11px;

      abbr {
        text-decoration: none;
      }
    }
  }

  .react-calendar__tile {
    border: none;
    background: none;
    font-size: 11px;
    font-weight: 400;
    color: #616161;
    cursor: pointer;
    border-radius: 8px;

    &:hover {
      background-color: #e9eab9;
    }
  }

  .react-calendar__tile.react-calendar__month-view__days__day--weekend {
    color: #848d00;
  }

  .react-calendar__tile.react-calendar__tile--neighboringMonth {
    color: #b3b3b3;
  }

  .react-calendar__tile.react-calendar__tile--active {
    background-color: #8a8d3e;
    color: white;
    font-weight: bold;
  }
`;


export const Details = styled.div`
    display:flex;
    justify-content: space-between;
    margin: 10px  40px;

`;

export const DetailIcons = styled.img`
    height: 20px;
`;

export const PerDetail = styled.div<{ $active?: boolean; $dimOthers?: boolean }>`
  font-size: 13px;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 40px;
  padding: 5px;
  border-radius: 5px;
  transition: all 0.2s ease;
  width: 60px;
  ${({ $active }) =>
    $active &&
    `
    transform: scale(1.1);
  `}

  ${({ $dimOthers }) =>
    $dimOthers &&
    `
    opacity: 0.5;
  `}
  &:hover {
    background-color: #e9eab9;
  }
`;

export const DetailSide = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`;

export const InOutcome = styled.div`
  display: flex;
  gap: 70px;
  font-size: 17px;
  font-weight: 500;
  cursor: default;
`;

export const IncomeWon = styled.div`
  color: #17a1fa;
`;

export const OutcomeWon = styled.div`
  color: #dc6d6d;
`;


export const SummaryCard = styled.div`
  width: 100%;
  max-width: 321px;
  height: 260px;
  border-radius: 23px;
  border: 2px solid #dfe678;
  background: #fdfdfd;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.1);

  /* Donuts가 그래프만 렌더 */
  padding: 25px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Gap = styled.div``;

export const BottomSpacer = styled.div`
  height: 84px;
`;



export const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 10px 0 30px 0;
`;

export const Perrow = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    font-size: 20px;
    margin: 5px 0;
    font-size: 24px;
    font-weight: 500;
`;

export const CategoryIcon = styled.img`
    width: 35px;
`;