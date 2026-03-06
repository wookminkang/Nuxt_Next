'use client';

/**
 * 공통 캘린더 컴포넌트 (CalendarBox)
 *
 * @example
 * // 비제어: 내부 상태만 사용
 * <CalendarBox onChange={(date) => console.log(date)} />
 *
 * @example
 * // 제어: value + onChange
 * const [date, setDate] = useState<Date | null>(null);
 * <CalendarBox value={date} onChange={setDate} />
 *
 * @example
 * // 초기화 시 콜백
 * <CalendarBox onReset={() => setDate(null)} onChange={setDate} />
 */
import { useState, useMemo, useRef, useEffect } from 'react';
import dayjs, { type Dayjs } from 'dayjs';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  RotateCcw,
  Diamond,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'] as const;
const WEEKEND_INDICES = [0, 6]; // 일, 토

export type CalendarBoxProps = {
  /** 선택된 날짜 (제어 모드) */
  value?: Date | null;
  /** 날짜 변경 시 호출 (선택 완료 클릭 시) */
  onChange?: (date: Date | null) => void;
  /** 초기화 클릭 시 호출 */
  onReset?: () => void;
  /** 최소 선택 가능 날짜 */
  minDate?: Date;
  /** 최대 선택 가능 날짜 */
  maxDate?: Date;
  /** 추가 클래스 */
  className?: string;
  /** 제목 (기본: CalendarBox) */
  title?: string;
  /** true면 제목 영역 숨김 (팝오버 내 캘린더용) */
  hideTitle?: boolean;
};

export function CalendarBox({
  value = null,
  onChange,
  onReset,
  minDate,
  maxDate,
  className,
  title = 'CalendarBox',
  hideTitle = false,
}: CalendarBoxProps) {
  const [viewDate, setViewDate] = useState<Dayjs>(() =>
    value ? dayjs(value) : dayjs()
  );
  const [innerSelected, setInnerSelected] = useState<Dayjs | null>(() =>
    value ? dayjs(value) : null
  );
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);
  const [yearRangeStart, setYearRangeStart] = useState(() => dayjs().year() - 4);
  const yearDropdownRef = useRef<HTMLDivElement>(null);

  const yearOptions = useMemo(
    () => Array.from({ length: 9 }, (_, i) => yearRangeStart + i),
    [yearRangeStart]
  );

  useEffect(() => {
    if (!yearDropdownOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        yearDropdownRef.current &&
        !yearDropdownRef.current.contains(e.target as Node)
      ) {
        setYearDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [yearDropdownOpen]);

  // 제어/비제어: value가 있으면 value 기준, 없으면 innerSelected 기준
  const selected = value !== undefined && value !== null ? dayjs(value) : innerSelected;

  const handlePrevMonth = () => setViewDate((d) => d.subtract(1, 'month'));
  const handleNextMonth = () => setViewDate((d) => d.add(1, 'month'));

  const handleSelectDate = (d: Dayjs) => {
    if (minDate && d.isBefore(dayjs(minDate), 'day')) return;
    if (maxDate && d.isAfter(dayjs(maxDate), 'day')) return;
    setInnerSelected(d);
  };

  const handleConfirm = () => {
    onChange?.(selected ? selected.toDate() : null);
  };

  const handleReset = () => {
    setInnerSelected(null);
    onReset?.();
  };

  const handleSelectYear = (year: number) => {
    setViewDate((d) => d.year(year));
    setYearDropdownOpen(false);
  };

  const openYearDropdown = () => {
    setYearRangeStart(viewDate.year() - 4);
    setYearDropdownOpen(true);
  };

  const handleYearRangePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setYearRangeStart((s) => s - 9);
  };

  const handleYearRangeNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setYearRangeStart((s) => s + 9);
  };

  // 해당 월의 캘린더 그리드 (6주 × 7일, 앞뒤 다른 달 날짜 포함)
  const calendarDays = useMemo(() => {
    const start = viewDate.startOf('month').startOf('week'); // 일요일 시작
    const weeks: Dayjs[][] = [];
    let current = start;
    for (let w = 0; w < 6; w++) {
      const week: Dayjs[] = [];
      for (let d = 0; d < 7; d++) {
        week.push(current);
        current = current.add(1, 'day');
      }
      weeks.push(week);
    }
    return weeks;
  }, [viewDate]);

  const isSameDay = (a: Dayjs | null, b: Dayjs) =>
    a && a.isSame(b, 'day');
  const isCurrentMonth = (d: Dayjs) => d.month() === viewDate.month();
  const isWeekend = (d: Dayjs) => WEEKEND_INDICES.includes(d.day());
  const isDisabled = (d: Dayjs) => {
    if (minDate && d.isBefore(dayjs(minDate), 'day')) return true;
    if (maxDate && d.isAfter(dayjs(maxDate), 'day')) return true;
    return false;
  };

  return (
    <div
      className={cn(
        'min-w-[350px] rounded-2xl bg-white p-5 shadow-sm border border-gray-200',
        className
      )}
    >
      {/* 제목 (hideTitle이면 미표시) */}
      {!hideTitle && (
        <div className="flex items-center gap-2 mb-4">
          <Diamond className="size-5 text-violet-500" aria-hidden />
          <span className="font-semibold text-gray-800">{title}</span>
        </div>
      )}

      {/* 헤더: 이전 | 연.월 ▼ | 다음 */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <button
          type="button"
          onClick={handlePrevMonth}
          className="p-1.5 rounded-md hover:bg-gray-200/80 text-gray-600"
          aria-label="이전 달"
        >
          <ChevronLeft className="size-5" />
        </button>
        <div className="relative min-w-32" ref={yearDropdownRef}>
          <button
            type="button"
            onClick={() => (yearDropdownOpen ? setYearDropdownOpen(false) : openYearDropdown())}
            className="flex items-center justify-center gap-1 w-full rounded-md py-2 hover:bg-gray-100 text-gray-800"
            aria-expanded={yearDropdownOpen}
            aria-haspopup="listbox"
            aria-label="연도 선택"
          >
            <span className="text-xl font-medium">
              {viewDate.format('YYYY.MM')}
            </span>
            <ChevronDown
              className={cn(
                'size-5 text-gray-500 transition-transform',
                yearDropdownOpen && 'rotate-180'
              )}
              aria-hidden
            />
          </button>
          {yearDropdownOpen && (
            <div
              role="listbox"
              className="absolute left-1/2 top-full z-10 mt-2 w-64 -translate-x-1/2 rounded-xl border border-gray-200 bg-white p-4 shadow-lg"
              aria-label="연도 목록"
            >
              {/* 헤더: 이전 | 2022 ~ 2030 | 다음 */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <button
                  type="button"
                  onClick={handleYearRangePrev}
                  className="p-2 rounded-md hover:bg-gray-100 text-gray-600"
                  aria-label="이전 연도 범위"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <span className="text-base font-medium text-gray-700">
                  {yearRangeStart} ~ {yearRangeStart + 8}
                </span>
                <button
                  type="button"
                  onClick={handleYearRangeNext}
                  className="p-2 rounded-md hover:bg-gray-100 text-gray-600"
                  aria-label="다음 연도 범위"
                >
                  <ChevronRight className="size-5" />
                </button>
              </div>
              {/* 3x3 그리드 */}
              <div className="grid grid-cols-3 gap-3">
                {yearOptions.map((year) => (
                  <button
                    key={year}
                    type="button"
                    role="option"
                    aria-selected={viewDate.year() === year}
                    onClick={() => handleSelectYear(year)}
                    className={cn(
                      'flex h-12 items-center justify-center rounded-full text-base font-medium transition-colors',
                      viewDate.year() === year
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    )}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={handleNextMonth}
          className="p-1.5 rounded-md hover:bg-gray-200/80 text-gray-600"
          aria-label="다음 달"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      {/* 요일 */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {WEEKDAYS.map((day, i) => (
          <div
            key={day}
            className={cn(
              'text-center text-sm font-medium py-1',
              WEEKEND_INDICES.includes(i) ? 'text-red-500' : 'text-gray-800'
            )}
          >
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.flat().map((d) => {
          const selected_ = isSameDay(selected, d);
          const outside = !isCurrentMonth(d);
          const weekend = isWeekend(d);
          const disabled = isDisabled(d);
          return (
            <button
              key={d.format('YYYY-MM-DD')}
              type="button"
              disabled={disabled}
              onClick={() => handleSelectDate(d)}
              className={cn(
                'aspect-square rounded-full text-sm font-medium transition-colors',
                'flex items-center justify-center',
                disabled && 'opacity-40 cursor-not-allowed',
                !disabled && 'hover:bg-gray-200/80',
                outside && 'text-gray-400',
                !outside && weekend && 'text-red-500',
                !outside && !weekend && 'text-gray-900',
                selected_ &&
                  'ring-2 ring-gray-900 ring-offset-2 ring-offset-white bg-white'
              )}
            >
              {d.date()}
            </button>
          );
        })}
      </div>

      {/* 하단 버튼 */}
      <div className="flex gap-2 mt-4">
        <Button
          type="button"
          variant="outline"
          onClick={handleReset}
          className="flex-1 gap-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
        >
          <RotateCcw className="size-4" />
          초기화
        </Button>
        <Button
          type="button"
          onClick={handleConfirm}
          className="flex-1 gap-2 bg-gray-800 text-white hover:bg-gray-700"
        >
          선택 완료
        </Button>
      </div>
    </div>
  );
}
