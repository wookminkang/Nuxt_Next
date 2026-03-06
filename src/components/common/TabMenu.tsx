'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export type TabItem = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type TabMenuProps = {
  /** 탭 목록 */
  tabs: TabItem[];
  /** 현재 선택된 탭 value (제어) */
  value?: string;
  /** 기본 선택 value (비제어) */
  defaultValue?: string;
  /** 탭 변경 시 */
  onValueChange?: (value: string) => void;
  /** 비활성화 */
  disabled?: boolean;
  /** 루트 className */
  className?: string;
};

export function TabMenu({
  tabs,
  value: valueProp,
  defaultValue,
  onValueChange,
  disabled,
  className,
}: TabMenuProps) {
  const [innerValue, setInnerValue] = React.useState(defaultValue ?? tabs[0]?.value ?? '');
  const value = valueProp ?? innerValue;

  const handleSelect = (tabValue: string) => {
    const tab = tabs.find((t) => t.value === tabValue);
    if (tab?.disabled || disabled) return;
    setInnerValue(tabValue);
    onValueChange?.(tabValue);
  };

  if (tabs.length === 0) return null;

  return (
    <div
      role="tablist"
      className={cn(
        'flex rounded-t-lg border-b border-gray-200 bg-[#f8fafc]',
        className
      )}
    >
      {tabs.map((tab, index) => {
        const isActive = value === tab.value;
        const isDisabled = tab.disabled ?? disabled;

        return (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-disabled={isDisabled}
            disabled={isDisabled}
            onClick={() => handleSelect(tab.value)}
            className={cn(
              'flex flex-1 items-center justify-center px-4 py-3 text-sm font-medium transition-colors first:rounded-tl-lg last:rounded-tr-lg',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-inset',
              'disabled:cursor-not-allowed disabled:opacity-50',
              isActive && 'bg-[#484b52] text-white',
              !isActive &&
                'bg-transparent text-[#8b909d] hover:bg-white/80 hover:text-gray-700',
              !isActive && index > 0 && 'border-l border-gray-200'
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
