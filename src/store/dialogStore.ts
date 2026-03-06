import { create } from 'zustand';

// ─── Alert ───────────────────────────────────────────────────────────────────

type AlertOpt = {
  button?: string;
  align?: 'left' | 'center';
  width?: number;
  zIndex?: number;
};

type AlertState = {
  isShow: boolean;
  title: string | null;
  msg: string;
  errorHighlightMsg: string | null;
  icon: string;
  button: string;
  align: 'left' | 'center';
  resolve: ((value: { result: boolean }) => void) | null;
};

// ─── Confirm ─────────────────────────────────────────────────────────────────

type ConfirmOpt = {
  yesTxt?: string;
  noTxt?: string;
  align?: 'left' | 'center';
  width?: number;
};

type ConfirmState = {
  isShow: boolean;
  title: string | null;
  msg: string;
  icon: string;
  yesTxt: string;
  noTxt: string;
  align: 'left' | 'center';
  resolve: ((value: boolean) => void) | null;
};

// ─── Toast (UIToast) ──────────────────────────────────────────────────────────

type ToastType = 'default' | 'warning' | 'success';
type ToastPosition = 'top' | 'middle' | 'bottom';

type ToastState = {
  isActive: boolean;
  message: string;
  type: ToastType;
  position: ToastPosition;
  duration: number;
};

// ─── Store ────────────────────────────────────────────────────────────────────

type DialogStore = {
  alert: AlertState;
  confirm: ConfirmState;
  uiToast: ToastState;

  openAlert: (msg: string, title?: string | null, errorHighlightMsg?: string | null, icon?: string | null, opt?: AlertOpt) => Promise<{ result: boolean }>;
  closeAlert: () => void;

  openConfirm: (msg: string, title?: string | null, icon?: string | null, opt?: ConfirmOpt) => Promise<boolean>;
  closeConfirm: (result: boolean) => void;

  openToast: (msg: string, opt?: Partial<{ type: ToastType; position: ToastPosition; duration: number }>) => void;
  closeToast: () => void;
};

const normalizeMsg = (msg: string) => msg.replace(/(\r\n|\r|\n)/g, '<br/>');

export const useDialogStore = create<DialogStore>((set, get) => ({
  alert: {
    isShow: false,
    title: null,
    msg: '',
    errorHighlightMsg: null,
    icon: 'error',
    button: '확인',
    align: 'center',
    resolve: null,
  },

  confirm: {
    isShow: false,
    title: null,
    msg: '',
    icon: 'error',
    yesTxt: '예',
    noTxt: '아니요',
    align: 'center',
    resolve: null,
  },

  uiToast: {
    isActive: false,
    message: '',
    type: 'default',
    position: 'middle',
    duration: 2000,
  },

  // ── Alert ──
  openAlert: (msg, title = null, errorHighlightMsg = null, icon = null, opt = {}) => {
    return new Promise((resolve) => {
      set({
        alert: {
          isShow: true,
          title,
          msg: typeof msg === 'string' ? normalizeMsg(msg) : msg,
          errorHighlightMsg,
          icon: icon || 'error',
          button: opt.button ?? '확인',
          align: opt.align ?? 'center',
          resolve,
        },
      });
    });
  },

  closeAlert: () => {
    const resolve = get().alert.resolve;
    set((state) => ({ alert: { ...state.alert, isShow: false, resolve: null } }));
    resolve?.({ result: true });
  },

  // ── Confirm ──
  openConfirm: (msg, title = null, icon = null, opt = {}) => {
    return new Promise((resolve) => {
      set({
        confirm: {
          isShow: true,
          title,
          msg: typeof msg === 'string' ? normalizeMsg(msg) : msg,
          icon: icon || 'error',
          yesTxt: opt.yesTxt ?? '예',
          noTxt: opt.noTxt ?? '아니요',
          align: opt.align ?? 'center',
          resolve,
        },
      });
    });
  },

  closeConfirm: (result) => {
    const resolve = get().confirm.resolve;
    set((state) => ({ confirm: { ...state.confirm, isShow: false, resolve: null } }));
    resolve?.(result);
  },

  // ── UIToast ──
  openToast: (msg, opt = {}) => {
    set({
      uiToast: {
        isActive: true,
        message: msg.replace(/(\r\n|\r|\n)/g, '<br/>'),
        type: opt.type ?? 'default',
        position: opt.position ?? 'middle',
        duration: opt.duration ?? 2000,
      },
    });
  },

  closeToast: () => {
    set((state) => ({ uiToast: { ...state.uiToast, isActive: false } }));
  },
}));
