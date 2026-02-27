import { useToastStore } from '@/shared/store/toastStore';

type ToastOpt = {
  msg?: string;
  check?: boolean;
  undo?: boolean;
  yesTxt?: string;
  noTxt?: string;
};

// Nuxt의 gp.$toastBox() 와 동일한 인터페이스
// basic:  toast('메시지')
// ib:     toast('제목', { msg: '내용', yesTxt: '확인', noTxt: '취소' })
export const toast = (head: string, opt?: ToastOpt): Promise<boolean> => {
  return useToastStore.getState().add(head, opt);
};
