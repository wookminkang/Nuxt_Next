'use client';
import { useEffect, useRef } from 'react';
import { useDialogStore } from '@/store/dialogStore';

// ─── 위치별 클래스 ─────────────────────────────────────────────────────────────

const POSITION_CLASS: Record<string, string> = {
  top:    'top-[15%] left-1/2 -translate-x-1/2',
  middle: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  bottom: 'top-[85%] left-1/2 -translate-x-1/2',
};

// ─── 배경색 (Nuxt $toast-colors와 동일) ───────────────────────────────────────

const BG_COLOR: Record<string, string> = {
  default: 'rgba(0, 0, 0, 0.8)',
  warning: 'rgba(0, 0, 0, 0.8)',
  success: '#28a745',
};

// ─── Component ────────────────────────────────────────────────────────────────

export const UIToast = () => {
  const { uiToast, closeToast } = useDialogStore();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!uiToast.isActive) return;

    timerRef.current = setTimeout(() => {
      closeToast();
    }, uiToast.duration);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [uiToast.isActive, uiToast.duration]);

  if (!uiToast.isActive) return null;

  const posClass = POSITION_CLASS[uiToast.position] ?? POSITION_CLASS.middle;
  const bgColor = BG_COLOR[uiToast.type] ?? BG_COLOR.default;

  return (
    <div
      className={`fixed z-[2000] ${posClass} w-[420px] max-w-[90vw]`}
      onClick={closeToast}
    >
      <div
        className="px-4 py-4 rounded-[4px] text-sm font-normal leading-5 text-white cursor-pointer"
        style={{ backgroundColor: bgColor }}
        dangerouslySetInnerHTML={{ __html: uiToast.message }}
      />
    </div>
  );
};
