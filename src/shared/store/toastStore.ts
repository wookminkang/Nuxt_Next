import { create } from 'zustand';

export type ToastType = 'basic' | 'ib';

export type ToastItem = {
  id: string;
  type: ToastType;
  head: string;
  msg?: string;
  check?: boolean;
  undo?: boolean;
  yesTxt?: string;
  noTxt?: string;
  time: number;   // 생성 시각 (초)
  keep: number;   // 유지 시간(초) - 0이면 버튼 클릭 전까지 유지
  resolve?: (value: boolean) => void;
};

type ToastOpt = {
  msg?: string;
  check?: boolean;
  undo?: boolean;
  yesTxt?: string;
  noTxt?: string;
};

type ToastStore = {
  list: ToastItem[];
  add: (head: string, opt?: ToastOpt) => Promise<boolean>;
  remove: (id: string) => void;
  respond: (id: string, value: boolean) => void;
  tick: () => void;
};

export const useToastStore = create<ToastStore>((set, get) => ({
  list: [],

  add: (head, opt) => {
    const isIb = !!opt?.msg;
    const item: ToastItem = {
      id: `${Date.now()}-${Math.random()}`,
      type: isIb ? 'ib' : 'basic',
      head: head.replace(/(\r\n|\r|\n)/g, ' '),
      msg: opt?.msg?.replace(/(\r\n|\r|\n)/g, '<br/>'),
      check: !isIb ? (opt?.check ?? false) : false,
      undo: !isIb ? (opt?.undo ?? false) : false,
      yesTxt: isIb ? (opt?.yesTxt ?? '확인') : undefined,
      noTxt: isIb ? (opt?.noTxt ?? '취소') : undefined,
      time: Math.floor(Date.now() / 100) / 10,
      keep: isIb ? 0 : 5,
    };

    return new Promise<boolean>((resolve) => {
      item.resolve = resolve;
      set((state) => ({ list: [item, ...state.list] }));
    });
  },

  remove: (id) => {
    set((state) => ({ list: state.list.filter((o) => o.id !== id) }));
  },

  respond: (id, value) => {
    const item = get().list.find((o) => o.id === id);
    if (item?.resolve) item.resolve(value);
    set((state) => ({ list: state.list.filter((o) => o.id !== id) }));
  },

  // 500ms마다 호출 - 만료된 토스트 제거
  tick: () => {
    const now = Math.floor(Date.now() / 100) / 10;
    set((state) => ({
      list: state.list.filter((o) => o.keep === 0 || o.time + o.keep >= now),
    }));
  },
}));
