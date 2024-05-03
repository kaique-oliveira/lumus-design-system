import React, { useEffect, useState } from "react";
import {
  CalendarContainer,
  CalendarContainerMonths,
  CalendarContainerWeekDay,
  CalendarContainerYears,
  CalendarDay,
  CalendarGridDays,
  CalendarHeader,
  CalendarMonthsHeader,
} from "./styles";
import { Button } from "../Button";
import { YearList } from "./yearList";

export const WeekDays = {
  domingo: "Domingo",
  segunda: "Segunda-feira",
  terca: "Terça-feira",
  quarta: "Quarta-feira",
  quinta: "Quinta-feira",
  sexta: "Sexta-feira",
  sabado: "Sábado",
} as const;

export const Months = {
  1: "Janeiro",
  2: "Fevereiro",
  3: "Março",
  4: "Abril",
  5: "Maio",
  6: "Junho",
  7: "Julho",
  8: "Agosto",
  9: "Setembro",
  10: "Outubro",
  11: "Novembro",
  12: "Dezembro",
} as const;

export interface CalendarTypeProps {
  onDateSelected: (date: Date) => void;
}

export const Calendar = ({ onDateSelected }: CalendarTypeProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [dateNavigate, setDateNavigate] = useState<Date>(new Date());
  const [openChangeMonth, setOpenChangeMonth] = useState(false);
  const [openChangeYear, setOpenChangeYear] = useState(false);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    onDateSelected(date);
  };

  const navigateCalendar = (date: Date) => {
    setDateNavigate(date);
  };

  const daysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const generateCalendar = (month: number, year: number) => {
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInCurrentMonth = daysInMonth(month, year);
    const calendar = [];

    let dayCounter = 1;

    for (let i = 0; i < 6; i++) {
      const week = [];

      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDayOfMonth) {
          week.push(<CalendarDay key={j + "column"}></CalendarDay>);
        } else if (dayCounter <= daysInCurrentMonth) {
          const currentDate = new Date(year, month, dayCounter);
          const now = new Date();

          week.push(
            <CalendarDay
              state={
                currentDate.toDateString() === selectedDate.toDateString()
                  ? "selected"
                  : currentDate.toDateString() === now.toDateString()
                    ? "current"
                    : "deselected"
              }
              key={dayCounter}
              onClick={() => handleDateClick(currentDate)}
            >
              {dayCounter}
            </CalendarDay>
          );
          dayCounter++;
        } else {
          week.push(<CalendarDay key={j + "day"}></CalendarDay>);
        }
      }

      calendar.push(<CalendarDay key={i + "week"}>{week}</CalendarDay>);
    }

    return calendar;
  };

  useEffect(() => {
    generateCalendar(dateNavigate.getMonth(), dateNavigate.getFullYear());
  }, [dateNavigate]);

  return (
    <CalendarContainer>
      <CalendarHeader>
        <div>
          <span onClick={() => setOpenChangeMonth(!openChangeMonth)}>
            {dateNavigate.toLocaleString("default", { month: "long" })}{" "}
          </span>
          <span onClick={() => setOpenChangeYear(!openChangeYear)}>
            {dateNavigate.getFullYear()}
          </span>
        </div>

        <div>
          <Button
            variant="text"
            icon="arrowLeftLinear"
            onClick={() =>
              navigateCalendar(
                new Date(
                  dateNavigate.getFullYear(),
                  dateNavigate.getMonth() - 1,
                  1
                )
              )
            }
          />

          <Button
            variant="text"
            icon="arrowRightLinear"
            onClick={() =>
              navigateCalendar(
                new Date(
                  dateNavigate.getFullYear(),
                  dateNavigate.getMonth() + 1,
                  1
                )
              )
            }
          />
        </div>
      </CalendarHeader>

      <CalendarContainerWeekDay>
        {Object.entries(WeekDays).map((day) => (
          <span key={day[1]}>{day[1].substring(0, 3)}</span>
        ))}
      </CalendarContainerWeekDay>

      <CalendarGridDays>
        {generateCalendar(dateNavigate.getMonth(), dateNavigate.getFullYear())}
      </CalendarGridDays>

      {openChangeMonth && (
        <CalendarContainerMonths>
          <CalendarMonthsHeader>
            <span>Selecionar mês</span>
            <Button
              variant="text"
              icon="closeLinear"
              onClick={() => setOpenChangeMonth(false)}
            />
          </CalendarMonthsHeader>
          <div>
            {Object.entries(Months).map((month, indice) => (
              <div
                key={month[1]}
                onClick={() => {
                  navigateCalendar(
                    new Date(dateNavigate.getFullYear(), indice, 1)
                  );
                  setOpenChangeMonth(false);
                }}
              >
                {month[1]}
              </div>
            ))}
          </div>
        </CalendarContainerMonths>
      )}

      {openChangeYear && (
        <CalendarContainerYears>
          <CalendarMonthsHeader>
            <span>Selecionar ano</span>
            <Button
              variant="text"
              icon="closeLinear"
              onClick={() => setOpenChangeYear(false)}
            />
          </CalendarMonthsHeader>

          <div>
            <YearList
              yearSelected={dateNavigate.getFullYear()}
              onSelectedYear={(year: number) => {
                navigateCalendar(new Date(year, dateNavigate.getMonth(), 1));
                setOpenChangeYear(false);
              }}
            />
          </div>
        </CalendarContainerYears>
      )}
    </CalendarContainer>
  );
};
