'use client';
import { useState, useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import Image from 'next/image';
import { FormSchema } from '@/utils/validators';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

import { MemberApi } from '@/api/member';
import { useUserInfoStore } from '@/store/userStore';
import { getImageUrl } from '@/utils/getimgurl';
import { error as dialogError } from '@/utils/dialog';

const LS_LOGIN_KEY = 'loginSaved';

const formSchema = z.object({
  id: FormSchema.id,
  password: FormSchema.password,
});

// 에러 코드별 메시지
const ERROR_MESSAGES: Record<string, string> = {
  '460': '일치하는 회원 정보가 없습니다.',
  '462': '아이디 또는 비밀번호가 일치하지 않습니다.',
  '465': '로그인 시도 횟수를 초과했습니다. 5분 후 다시 시도해 주세요.',
};

const gCode = process.env.NEXT_PUBLIC_G_CODE?.toLowerCase();

export const Login = () => {
  const { SET_USER_INFO } = useUserInfoStore();
  const router = useRouter();

  const [remember, setRemember] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { id: '', password: '' },
  });

  const watchId = form.watch('id');
  const watchPassword = form.watch('password');
  const canLogin = watchId.length > 0 && watchPassword.length > 0;

  // 저장된 아이디 불러오기 (Nuxt login store.load() 동일 로직)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LS_LOGIN_KEY);
      if (saved) {
        const { id, remember: savedRemember } = JSON.parse(saved);
        form.setValue('id', id || '');
        setRemember(savedRemember || false);
      }
    } catch { }
  }, []);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      const payload = [{
        clubCode: process.env.NEXT_PUBLIC_G_CODE,
        id: data.id,
        pw: data.password,
      }];

      const res: any = await MemberApi.login(payload);
      console.log('res', res);
      const userData = res.data[0];

      // 로그인 상태 유지 처리 (Nuxt login.save() 동일 로직)
      if (remember) {
        localStorage.setItem(LS_LOGIN_KEY, JSON.stringify({ id: data.id, remember: true }));
      } else {
        localStorage.removeItem(LS_LOGIN_KEY);
      }

      // 유저 정보 zustand 저장
      SET_USER_INFO(userData);

      // 쿠키에 토큰 저장 (서버 컴포넌트 인증용)
      Cookies.set('access_token', userData.accessToken, {
        expires: 1,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      });

      // 임시 비밀번호인 경우 비밀번호 재설정 페이지로
      if (userData.isTempPassword) {
        router.push('/login/password-reset-page');
        return;
      }

      router.push('/hotel');

    } catch (error: any) {
      const code = error?.response?.data.fail.code
      const msg = ERROR_MESSAGES[code] || error?.msg || error?.msgDetail || '로그인에 실패했습니다.';
      dialogError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm">
      <h1 className="mb-6 flex items-center justify-center">
        <Image
          src={getImageUrl('logo.png', gCode)}
          alt="logo"
          width={120}
          height={40}
        />
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>아이디</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="h-[48px]"
                    autoComplete="off"
                    placeholder="아이디를 입력해주세요"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    className="h-[48px]"
                    autoComplete="off"
                    placeholder="비밀번호를 입력해주세요"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center">
            <Checkbox
              id="remember"
              className="w-4 h-4 mr-2"
              checked={remember}
              onCheckedChange={(e: boolean) => setRemember(e)}
            />
            <Label htmlFor="remember" className="text-sm font-medium cursor-pointer">
              로그인 상태 유지
            </Label>
          </div>

          <Button
            type="submit"
            className="h-[48px] cursor-pointer"
            disabled={!canLogin || isLoading}
          >
            {isLoading ? '로그인 중...' : '로그인'}
          </Button>

          <div className="text-sm text-center">
            계정이 없으신가요?{' '}
            <Link href="/agreement" className="underline cursor-pointer">
              회원가입
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};
