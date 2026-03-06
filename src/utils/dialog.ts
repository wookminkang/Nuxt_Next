import { useDialogStore } from '@/store/dialogStore';

type AlertOpt = {
  button?: string;
  align?: 'left' | 'center';
  width?: number;
  zIndex?: number;
};

type ConfirmOpt = {
  yesTxt?: string;
  noTxt?: string;
  align?: 'left' | 'center';
  width?: number;
};

type ToastOpt = Partial<{
  type: 'default' | 'warning' | 'success';
  position: 'top' | 'middle' | 'bottom';
  duration: number;
}>;

// Nuxt의 gp.$alert 대응
// alert('메시지', '제목', null, 'error', { button: '확인' })
export const alert = (
  msg: string,
  title?: string | null,
  errorHighlightMsg?: string | null,
  icon?: string | null,
  opt?: AlertOpt,
): Promise<{ result: boolean }> => {
  return useDialogStore.getState().openAlert(msg, title, errorHighlightMsg, icon, opt);
};

// Nuxt의 gp.$error 대응
// error(errorObject, '제목', 'error')
export const error = (
  obj: any,
  title?: string | null,
  icon?: string | null,
  opt?: AlertOpt,
): void => {
  let msg = '';
  if (typeof obj === 'object') {
    msg = obj?.msgDetail ?? obj?.msg ?? obj?.toString?.() ?? String(obj);
  } else {
    msg = String(obj);
  }
  console.error(obj);
  alert(msg, title, null, icon, opt);
};

// Nuxt의 gp.$confirm 대응
// confirm('메시지', '제목', 'error', { yesTxt: '예', noTxt: '아니요' })
export const confirm = (
  msg: string,
  title?: string | null,
  icon?: string | null,
  opt?: ConfirmOpt,
): Promise<boolean> => {
  return useDialogStore.getState().openConfirm(msg, title, icon, opt);
};

// Nuxt의 gp.$toast 대응
// uiToast('메시지', { type: 'default', position: 'middle', duration: 2000 })
export const uiToast = (msg: string, opt?: ToastOpt): void => {
  useDialogStore.getState().openToast(msg, opt);
};
