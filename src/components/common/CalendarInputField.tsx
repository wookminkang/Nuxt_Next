'use client';

import * as React from 'react';
import dayjs from 'dayjs';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarBox } from '@/components/common/CalendarBox';

export type CalendarInputFieldProps = {
  /** 라벨 텍스트 */
  label?: string;
  /** 필수 필드 여부 (라벨 옆 파란 별표) */
  required?: boolean;
  /** 플레이스홀더 (기본: 날짜를 선택하세요) */
  placeholder?: string;
  /** 선택된 날짜 (제어) */
  value?: Date | null;
  /** 날짜 변경 시 (선택 완료 클릭 시) */
  onChange?: (date: Date | null) => void;
  /** 비활성화 */
  disabled?: boolean;
  /** 하단 헬퍼 텍스트 */
  helperText?: string;
  /** 에러 메시지 */
  error?: string;
  /** 입력값 표시 포맷 (기본: YYYY-MM-DD) */
  displayFormat?: string;
  /** 최소 선택 가능 날짜 */
  minDate?: Date;
  /** 최대 선택 가능 날짜 */
  maxDate?: Date;
  /** 루트 className */
  className?: string;
};

const DEFAULT_FORMAT = 'YYYY-MM-DD';

export function CalendarInputField({
  label,
  required,
  placeholder = '날짜를 선택하세요',
  value,
  onChange,
  disabled,
  helperText,
  error,
  displayFormat = DEFAULT_FORMAT,
  minDate,
  maxDate,
  className,
}: CalendarInputFieldProps) {
  const [open, setOpen] = React.useState(false);

  const displayValue = value ? dayjs(value).format(displayFormat) : '';

  const handleSelect = (date: Date | null) => {
    onChange?.(date);
    setOpen(false);
  };

  const handleReset = () => {
    onChange?.(null);
    setOpen(false);
  };

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <Label
          className={cn(
            'text-gray-700 font-medium',
            disabled && 'opacity-50'
          )}
        >
          {label}
          {required && <span className="text-blue-500 ml-0.5">*</span>}
        </Label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            disabled={disabled}
            className={cn(
              'flex w-full items-center gap-2 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm text-left shadow-sm h-9',
              'focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400',
              'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100 disabled:border-gray-200',
              error && 'border-red-400 focus:ring-red-400 focus:border-red-400'
            )}
          >
            <span
              className={cn(
                'flex-1 truncate',
                displayValue ? 'text-gray-900' : 'text-gray-400'
              )}
            >
              {displayValue || placeholder}
            </span>
            <CalendarIcon className="size-4 shrink-0 text-gray-500" aria-hidden />
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 border-gray-200 bg-white shadow-md"
          align="start"
          sideOffset={6}
        >
          <CalendarBox
            value={value ?? null}
            onChange={handleSelect}
            onReset={handleReset}
            minDate={minDate}
            maxDate={maxDate}
            hideTitle
            className="rounded-xl"
          />
        </PopoverContent>
      </Popover>
      {(helperText || error) && (
        <p
          className={cn(
            'text-sm',
            error ? 'text-red-500' : 'text-gray-500'
          )}
        >
          {error ?? helperText}
        </p>
      )}
    </div>
  );
}
