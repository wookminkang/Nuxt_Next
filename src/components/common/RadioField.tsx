'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

export type RadioOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type RadioGroupFieldProps = {
  /** 그룹 name (필수) */
  name: string;
  /** 선택 값 */
  value?: string;
  /** 값 변경 시 */
  onChange?: (value: string) => void;
  /** 옵션 목록 */
  options: RadioOption[];
  /** 방향 (기본: vertical) */
  direction?: 'horizontal' | 'vertical';
  /** 비활성화 */
  disabled?: boolean;
  /** 루트 className */
  className?: string;
};

export function RadioGroupField({
  name,
  value,
  onChange,
  options,
  direction = 'vertical',
  disabled,
  className,
}: RadioGroupFieldProps) {
  return (
    <div
      role="radiogroup"
      className={cn(
        'flex gap-3',
        direction === 'horizontal' ? 'flex-row flex-wrap' : 'flex-col',
        className
      )}
    >
      {options.map((opt) => (
        <RadioItem
          key={opt.value}
          name={name}
          value={opt.value}
          label={opt.label}
          checked={value === opt.value}
          disabled={disabled ?? opt.disabled}
          onChange={() => onChange?.(opt.value)}
        />
      ))}
    </div>
  );
}

export type RadioItemProps = {
  name: string;
  value: string;
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: () => void;
  className?: string;
};

export function RadioItem({
  name,
  value,
  label,
  checked,
  disabled,
  onChange,
  className,
}: RadioItemProps) {
  const id = React.useId();

  return (
    <label
      htmlFor={id}
      className={cn(
        'flex cursor-pointer items-center gap-2',
        disabled && 'cursor-not-allowed opacity-70',
        className
      )}
    >
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className="peer sr-only"
        aria-checked={checked}
        aria-disabled={disabled}
      />
      <span
        className={cn(
          'size-5 shrink-0 rounded-full border-2 bg-white border-gray-300 transition-colors',
          'peer-focus-visible:ring-2 peer-focus-visible:ring-gray-400 peer-focus-visible:ring-offset-2',
          'peer-disabled:cursor-not-allowed',
          'peer-checked:border-gray-700 peer-checked:bg-gray-700',
          'peer-disabled:border-gray-200 peer-disabled:bg-gray-50',
          'peer-checked:peer-disabled:border-gray-300 peer-checked:peer-disabled:bg-gray-300'
        )}
        aria-hidden
      />
      {label && (
        <span className="text-sm font-medium text-gray-700">{label}</span>
      )}
    </label>
  );
}
