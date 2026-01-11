import { create } from 'zustand';
import { persist } from 'zustand/middleware';
/**
 * 유저 정보 관리 스토어
 */

interface UserState {
  name: string;
  age: number | null;
  userInfo: {
    name: string;
    age: number | null;
  };
  setUserName: (name: string) => void;
}

const userInfo = create((set) => ({
  userInfo: {
    name: '',
    age: null,
  },
  setUserName: (name: string) => {
    set((state) => ({
      userInfo: { ...state.userInfo, name },
    }));
  },
}));

// const userInfoStore = create(
//   persist((set) => ({
//     userInfo:{
//       name: '',
//       age: null
//     },
//     setUserName: (name: string) => {
//       set((state: UserState) => ({
//         userInfo: {
//           ...state.userInfo,
//           name: name
//         }
//       }))
//     }
//   }), {
//     name: 'user-storage',
//   }
// )
