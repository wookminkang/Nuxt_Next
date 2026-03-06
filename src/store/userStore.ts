import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * 유저 회원가입 정보
 */
type userAgreementInfo = {
  agreement: string[];
  setAgreement: (id: string[]) => void;
  resetAgreement: () => void;
}




type USER_INFO_TYPE = {
  accessToken: string;
  accessTokenExpire: string;
  refreshToken: string;
  refreshTokenExpire: string;
  address: string | null;
  addressDetail: string | null;
  adminIdx: string | number;
  clubName: string;
  imageUrl: string;
  isAdmin: boolean;
  memberIdx: string | number;
  memberType: string | number;
  membershipMembers: string | null;
  phoneNo: string;
  userId: string;
  userName: string;
  zipCode: string;
  menus: MENU_TYPE[];
  adminMenus: ADMIN_MENU_TYPE[];
}

type USER_STORE_TYPE = {
  userInfo: USER_INFO_TYPE;
  SET_USER_INFO: (user: Partial<USER_INFO_TYPE>) => void;
  RESET_USER_INFO: () => void;
}

type ADMIN_MENU_TYPE = {
  adminIdx: number;
  children: string[];
  code: string;
  groupIdx: number | null;
  icon: string;
  idx: number | string;
  isCreate: boolean;
  isDelete: boolean;
  isRead: boolean;
  isUpdate: boolean;
  name: string;
  path: string;
  sortOrder: number | number;
}

type MENU_TYPE = {
  children: string[];
  code: string;
  extLinkUrl: string | null;
  idx: number;
  isExistBanner: boolean;
  isMainPage: boolean;
  isTargetBlank: boolean;
  isVisible: boolean;
  name: string;
  permit: string;
  seoKeyword: string;
  seoMeta: string;
  seoSlug: string;
  seoTag: string;
  snsDesc: string;
  snsImageUrl: string;
  snsTitle: string;
  sortOrder: number;
  type: string;
}

// 회원가입 약관 정보
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


const initialUserInfo: USER_INFO_TYPE = {
  accessToken: '',
  accessTokenExpire: '',
  refreshToken: '',
  refreshTokenExpire: '',
  address: null,
  addressDetail: null,
  adminIdx: '',
  clubName: '',
  imageUrl: '',
  isAdmin: false,
  memberIdx: '',
  memberType: '',
  membershipMembers: null,
  phoneNo: '',
  userId: '',
  userName: '',
  zipCode: '',
  menus: [],
  adminMenus: []
};

export const useUserInfoStore = create<USER_STORE_TYPE>()(
  persist(
    (set) => ({
      userInfo: initialUserInfo,
      SET_USER_INFO: (user: Partial<USER_INFO_TYPE>) => {
        set((state) => ({
          userInfo: { ...state.userInfo, ...user }
        }))
      },
      RESET_USER_INFO: () => {
        set(() => ({
          userInfo: initialUserInfo,
        }))
      }
    }),
    {
      name: 'userInfoStore',
    }
  )
)
