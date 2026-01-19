'use client';
import { useState } from 'react';
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
import { FormSchema } from '@/shared/utils/validators';
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';




import { MemberApi } from '@/shared/api/member';
import { useUserInfoStore } from '@/shared/store/userStore';





const formSchema = z.object({
  id: FormSchema.id,
  password: FormSchema.password,
});

export const Login = () => {
  const { SET_USER_INFO } = useUserInfoStore();
  const router = useRouter();



  const [remember, setRemember] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: '',
      pw: '',
    },
  });

  const loginApi = async (payload: any) => {
    const res: any = await MemberApi.login(payload);

    if (!res.result) {
      throw new Error(res.message || '로그인에 실패했습니다.');
    }

    SET_USER_INFO(res.data[0]);

    // 쿠키 설정 (개발 환경에서는 secure: false)
    const isProduction = process.env.NODE_ENV === 'production';
    Cookies.set('access_token', res.data[0].accessToken, {
      expires: 1, // 1일
      secure: isProduction, // 프로덕션에서만 secure
      sameSite: 'lax', // strict에서 lax로 변경 (더 유연함)
      path: '/', // 모든 경로에서 접근 가능
    });

    console.log('쿠키 저장 완료:', res.data[0].accessToken);
    console.log('쿠키 확인:', Cookies.get('access_token'));

    router.push(`/admin`)
  };

  const onSubmit = async (data?: z.infer<typeof formSchema>) => {
    try {
      const postVar = [{
        clubCode: process.env.NEXT_PUBLIC_G_CODE,
        id: data?.id,
        pw: data?.password,
      }];
      loginApi(postVar);
    } catch (error: any) {
      console.log(`error =>`, error);
    };
  }


  return (
    <div className="w-full max-w-sm">
      <h1 className="mb-6 flex items-center justify-center text-center text-2xl font-bold">
        <Image src="/images/logo.png" alt="logo" width={100} height={100} />
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
                    placeholder="대소문자, 숫자, 특수문자 포함 8자 이상"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center">
            <Checkbox id="remember" className="w-4 h-4 mr-2" checked={remember} onCheckedChange={(e: boolean) => setRemember(e)} />
            <Label htmlFor="remember" className="text-sm font-medium">로그인 상태 유지</Label>
          </div>


          <Button type="submit" className="h-[48px] cursor-pointer">
            로그인
          </Button>

          <div className="text-sm text-center">계정이 없으신가요? <Link href="/agreement" className="underline cursor-pointer">회원가입</Link></div>
        </form>
      </Form>
    </div>
  );
}