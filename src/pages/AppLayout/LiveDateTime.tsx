import { useState, type ReactElement } from "react";
import { useInterval } from "react-use";
import { styled } from "styled-components";
import { CalendarIcon, ClockIcon } from "../../components/appIcons";

const Clock = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: var(--font-size-normal);
  font-weight: var(--font-weight-medium);
`;

const Calendar = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: var(--font-size-normal);
  font-weight: var(--font-weight-medium);
`;

const timeFormat: Intl.DateTimeFormatOptions = {
  hour: "numeric",
  minute: "numeric",
};

const dateFormat: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
};

export default function LiveDateTime(): ReactElement {
  const [currentTime, setCurrentTime] = useState(getFormattedTime());
  const [currentDate, setCurrentDate] = useState(getFormattedDate());

  useInterval(() => {
    setCurrentTime(getFormattedTime());
    setCurrentDate(getFormattedDate());
  }, 1000);

  function getFormattedTime() {
    return new Date().toLocaleTimeString([], timeFormat);
  }

  function getFormattedDate() {
    return new Date().toLocaleDateString([], dateFormat);
  }

  return (
    <div css="display: flex; gap: 16px">
      <Clock css="margin: 0 var(--gap-medium)">
        <ClockIcon css="font-size: 18.5px" />
        {currentTime}
      </Clock>
      <Calendar>
        <CalendarIcon css="font-size: 18.5px" />
        {currentDate}
      </Calendar>
    </div>
  );
}
