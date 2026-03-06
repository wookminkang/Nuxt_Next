'use client';
import { X } from 'lucide-react';
import type { ToastItem } from '@/store/toastStore';

type Props = {
  item: ToastItem;
  onClose: () => void;
  onRespond: (value: boolean) => void;
};

export const ToastBar = ({ item, onClose, onRespond }: Props) => {
  const isIb = item.type === 'ib';

  return (
    <div
      className={`
        flex items-center gap-3 min-w-[280px] max-w-[400px]
        px-4 py-3 rounded-[4px] text-sm text-white font-normal
        ${isIb ? 'flex-col items-start' : ''}
      `}
      style={{ backgroundColor: 'rgba(16, 24, 43, 0.85)' }}
    >
      {/* 체크 아이콘 */}
      {item.check && (
        <span className="text-green-400 text-base flex-shrink-0">✓</span>
      )}

      {/* 메시지 영역 */}
      <div className="flex-1">
        {item.head && (
          <strong className="font-normal">{item.head}</strong>
        )}
        {isIb && item.msg && (
          <p
            className="mt-1 text-white/80 text-sm"
            dangerouslySetInnerHTML={{ __html: item.msg }}
          />
        )}
        {item.undo && (
          <span className="text-blue-300 text-sm cursor-pointer mt-1 block">
            실행취소
          </span>
        )}
      </div>

      {/* basic 타입: 닫기 버튼 */}
      {!isIb && (
        <button
          onClick={onClose}
          className="text-white/60 hover:text-white transition-colors flex-shrink-0 ml-2"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      {/* ib 타입: 확인/취소 버튼 */}
      {isIb && (
        <div className="flex gap-2 w-full justify-end mt-2">
          <button
            onClick={() => onRespond(true)}
            className="px-4 py-1.5 text-sm bg-white text-[rgba(16,24,43,1)] rounded font-medium hover:bg-white/90 transition-colors"
          >
            {item.yesTxt}
          </button>
          <button
            onClick={() => onRespond(false)}
            className="px-4 py-1.5 text-sm border border-white/40 text-white rounded hover:bg-white/10 transition-colors"
          >
            {item.noTxt}
          </button>
        </div>
      )}
    </div>
  );
};
