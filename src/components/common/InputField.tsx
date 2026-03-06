'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export type InputFieldProps = Omit<
  React.ComponentProps<typeof Input>,
  'className'
> & {
  /** 라벨 텍스트 */
  label?: string;
  /** 필수 필드 여부 (라벨 옆 파란 별표) */
  required?: boolean;
  /** 하단 헬퍼 텍스트 */
  helperText?: string;
  /** 에러 메시지 (표시 시 헬퍼 대신 사용, 스타일 다름) */
  error?: string;
  /** 루트/래퍼 className */
  className?: string;
  /** input 래퍼 className (라벨·input 묶음) */
  inputWrapperClassName?: string;
};

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      required,
      helperText,
      error,
      className,
      inputWrapperClassName,
      value,
      defaultValue,
      onChange,
      disabled,
      ...props
    },
    ref
  ) => {
    const [innerValue, setInnerValue] = React.useState(defaultValue ?? '');
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : innerValue;
    const hasValue =
      currentValue !== undefined &&
      currentValue !== null &&
      String(currentValue).length > 0;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setInnerValue(e.target.value);
      onChange?.(e);
    };

    const handleClear = () => {
      if (isControlled && onChange) {
        const synthetic = {
          target: { value: '', name: props.name },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(synthetic);
      } else {
        setInnerValue('');
      }
    };

    return (
      <div className={cn('flex flex-col gap-1.5', className)}>
        {label && (
          <Label className="text-gray-700 font-medium">
            {label}
            {required && <span className="text-blue-500 ml-0.5">*</span>}
          </Label>
        )}
        <div
          className={cn(
            'relative flex items-center rounded-md border border-gray-300 bg-transparent shadow-sm focus-within:ring-1 focus-within:ring-gray-400 focus-within:border-gray-400',
            error && 'border-red-400 focus-within:ring-red-400 focus-within:border-red-400',
            disabled && 'opacity-50 cursor-not-allowed',
            inputWrapperClassName
          )}
        >
          <Input
            ref={ref}
            value={isControlled ? value : innerValue}
            onChange={handleChange}
            disabled={disabled}
            className={cn(
              'border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 pr-9',
              props.className
            )}
            {...props}
          />
          {hasValue && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-2 flex size-6 items-center justify-center rounded-full bg-gray-300 text-white hover:bg-gray-400 transition-colors"
              aria-label="입력 지우기"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>
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
);

InputField.displayName = 'InputField';

export { InputField };
