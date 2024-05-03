import { useEffect, useRef, useState } from "react";
import { Calendar } from "../Calendar";
import {
  CalendarContainer,
  DatePickerInput,
  DatePickerWrapper,
} from "./styles";
import useTimeoutEffect from "../../hooks/useTimeoutEffect";

export interface DatePickerTypeProps {
  keyId: string;
  label?: string;
  onSelectedDate(date: Date): void;
}

export function DatePicker({
  keyId,
  label,
  onSelectedDate,
}: DatePickerTypeProps) {
  const [openCalendar, setOpenCalendar] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [effectCalendar, setEffectCalendar] = useState(false);
  const [dateSelected, setDateSelected] = useState(new Date());
  const refContexMenu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleCliqueFora(event: MouseEvent) {
      if (
        refContexMenu.current &&
        !refContexMenu.current.contains(event.target as Node)
      ) {
        setOpenCalendar(false);
      }
    }
    const handleClick = (event: MouseEvent) => {
      handleCliqueFora(event);
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  useEffect(() => {
    if (openCalendar) {
      setShowCalendar(true);
      setEffectCalendar(true);
    } else {
      setEffectCalendar(false);
    }
  }, [openCalendar]);

  useTimeoutEffect(
    () => {
      if (!openCalendar) {
        setShowCalendar(false);
      }
    },
    [openCalendar],
    200
  );

  useEffect(() => {
    setOpenCalendar(false);
    onSelectedDate(dateSelected);
  }, [dateSelected]);

  return (
    <DatePickerWrapper ref={refContexMenu}>
      <DatePickerInput
        onActionClick={() => setOpenCalendar(!openCalendar)}
        autoFocus={openCalendar}
        readOnly
        keyId={keyId}
        icon="calendarLinear"
        value={dateSelected.toLocaleDateString()}
        onChangeValue={() => {}}
        label={label}
        placeholder={new Date().toLocaleDateString()}
      />
      {showCalendar && (
        <CalendarContainer visible={effectCalendar}>
          <Calendar onDateSelected={setDateSelected} />
        </CalendarContainer>
      )}
    </DatePickerWrapper>
  );
}
