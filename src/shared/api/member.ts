import api from "@/shared/utils/http";

export const MemberApi = {

  /** 로그인 */
  login(payload: any) {
    // /hp를 떼고 /api/... 만 전달
    return api.post("/hp/api/member/login", payload);
  },

  /** 로그아웃 */
  logout() {
    return api.post("/hp/api/member/logout");
  }
}