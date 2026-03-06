'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

export type CheckboxFieldProps = React.ComponentProps<
  typeof CheckboxPrimitive.Root
> & {
  /** 라벨 텍스트 */
  label?: string;
  /** 라벨 위치 (기본: right) */
  labelPosition?: 'left' | 'right';
  /** 루트 className */
  className?: string;
};

export function CheckboxField({
  label,
  labelPosition = 'right',
  className,
  id: idProp,
  ...props
}: CheckboxFieldProps) {
  const id = React.useId();
  const inputId = idProp ?? id;

  return (
    <div
      className={cn(
        'flex items-center gap-2',
        labelPosition === 'left' && 'flex-row-reverse justify-end',
        className
      )}
    >
      <CheckboxPrimitive.Root
        id={inputId}
        data-slot="checkbox-field"
        className={cn(
          'size-5 shrink-0 rounded-[4px] border-2 transition-colors outline-none',
          'focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed',
          'data-[state=unchecked]:border-gray-300 data-[state=unchecked]:bg-white',
          'data-[state=checked]:border-gray-700 data-[state=checked]:bg-gray-700 data-[state=checked]:text-white',
          'data-[state=checked]:disabled:border-gray-300 data-[state=checked]:disabled:bg-gray-300 data-[state=checked]:disabled:text-gray-400',
          'data-[state=unchecked]:disabled:border-gray-200 data-[state=unchecked]:disabled:bg-gray-50'
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator className="grid place-content-center text-current">
          <Check className="size-3.5 stroke-3" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label && (
        <Label
          htmlFor={inputId}
          className="cursor-pointer text-sm font-medium text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
        >
          {label}
        </Label>
      )}
    </div>
  );
}
