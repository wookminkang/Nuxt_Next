import { z } from 'zod';

/** 이메일 형식 검증 */
export const isEmail = (value: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

/** 나이 형식 검증 */
export const isAge = (value: string): boolean => {
  const ageRegex = /^\d+$/;
  return ageRegex.test(value);
};

/** 생년월일 6자리 검증 ex) 930813 */
export const isBirthday = (value: string): boolean => {
  const birthdayRegex = /^\d{6}$/;
  return birthdayRegex.test(value);
};

/** 핸드폰 번호 검증 (하이픈 없음) ex) 01012345678 */
export const isMobilePhone = (value: string): boolean => {
  const mobilePhoneRegex = /^010\d{7,8}$/;
  return mobilePhoneRegex.test(value);
};

/** 비밀번호 유효성 검증 (8글자 이상이며 대소문자와 숫자, 특수문자 포함) */
export const isPassword = (value: string): boolean => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(value);
};

/** 핸드폰 번호 입력시 '-' 하이픈을 제거한 나머지 값을 리턴 */
export const removeHyphen = (value: string): string => {
  return value.replace(/-/g, '');
};

/** 마스킹 유틸리티 */
export const Masker = {
  /** 이름 마스킹 (2자: 강* / 3자이상: 강*욱) */
  maskName: (name: string): string => {
    if (name.length <= 1) return name;
    if (name.length === 2) return name[0] + '*';
    return name[0] + '*'.repeat(name.length - 2) + name.slice(-1);
  },
  /** 핸드폰 번호 마스킹 (하이픈 여부에 따라 유지) */
  maskPhone: (phone: string): string => {
    const hasHyphen = phone.includes('-');
    const cleanPhone = phone.replace(/-/g, '');

    if (cleanPhone.length < 10) return phone;

    return cleanPhone.replace(/^(\d{3})(\d{3,4})(\d{4})$/, (match, p1, p2, p3) => {
      return hasHyphen ? `${p1}-****-${p3}` : `${p1}****${p3}`;
    });
  },
};



export const FormSchema = {
  id: z.string().min(4, '아이디를 입력해주세요.'),
  password: z.string().refine(isPassword, '비밀번호 형식이 올바르지 않습니다.'),
}
