'use client';

import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';

export type SelectFieldOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type SelectFieldProps = {
  /** 라벨 텍스트 */
  label?: string;
  /** 필수 필드 여부 (라벨 옆 파란 별표) */
  required?: boolean;
  /** 플레이스홀더 (기본: 선택하세요) */
  placeholder?: string;
  /** 선택 옵션 목록 */
  options: SelectFieldOption[];
  /** 선택 값 (제어) */
  value?: string;
  /** 기본 선택 값 (비제어) */
  defaultValue?: string;
  /** 값 변경 시 */
  onValueChange?: (value: string) => void;
  /** 비활성화 */
  disabled?: boolean;
  /** 하단 헬퍼 텍스트 */
  helperText?: string;
  /** 에러 메시지 */
  error?: string;
  /** 루트 className */
  className?: string;
  /** trigger 영역 className */
  triggerClassName?: string;
};

export function SelectField({
  label,
  required,
  placeholder = '선택하세요',
  options,
  value,
  defaultValue,
  onValueChange,
  disabled,
  helperText,
  error,
  className,
  triggerClassName,
}: SelectFieldProps) {
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
      <Select
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <SelectPrimitive.Trigger
          className={cn(
            'group flex h-9 w-full items-center justify-between gap-2 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-900 shadow-sm',
            'focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400',
            'data-placeholder:text-gray-400',
            'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100 disabled:border-gray-200',
            error && 'border-red-400 focus:ring-red-400 focus:border-red-400',
            triggerClassName
          )}
        >
          <SelectValue placeholder={placeholder} />
          <span className="flex shrink-0 [&_svg]:size-4 [&_svg]:text-gray-500">
            <ChevronDown className="group-data-[state=open]:hidden" />
            <ChevronUp className="hidden group-data-[state=open]:block" />
          </span>
        </SelectPrimitive.Trigger>
        <SelectContent
          className={cn(
            'rounded-md border border-gray-300 bg-white shadow-md',
            'min-w-(--radix-select-trigger-width)'
          )}
          position="popper"
          sideOffset={4}
        >
          {options.map((opt) => (
            <SelectItem
              key={opt.value}
              value={opt.value}
              disabled={opt.disabled}
              className={cn(
                'cursor-pointer rounded-sm py-2 pl-3 pr-8 text-sm text-gray-900',
                'focus:bg-gray-100 focus:outline-none',
                'data-highlighted:bg-gray-100'
              )}
            >
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
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