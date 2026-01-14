import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * 유저정보
 */


/**
 * 유저 회원가입 정보
 */
type userAgreementInfo = {
  agreement:string[];
  setAgreement: (id: string[]) => void;
  resetAgreement: () => void;
}


export const useAgreeStore = create<userAgreementInfo>()(
  persist(
    (set) => ({
      agreement: [],
      resetAgreement: () => {
        set(() => ({
          agreement: [],
        }))
      },
      setAgreement: (id: string[]) => {
        console.log(`setAgreement`, id);
        set(() => ({
          agreement: id,
        }))
      },
    }),
    {
      name: 'userAgreeStore',
    }
  )
);





// type userSignupInfo = {
//   id: string;
//   password: string;
//   name: string;
//   email: string;
//   phone: string;
//   address: string;
//   birth: string;
//   gender: string;
//   agree: userAgreementInfo;
// }






