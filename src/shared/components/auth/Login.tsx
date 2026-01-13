'use client';

import * as React from 'react';
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

const formSchema = z.object({
  id: FormSchema.id,
  password: FormSchema.password,
});

export const Login = () => {
  const [remember, setRemember] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const postVar = {
      id: data.id,
      password: data.password,
      remember
    }
    console.log(postVar);
  };


 
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
            <Checkbox id="remember" className="w-4 h-4 mr-2" checked={remember} onCheckedChange={(e: boolean) => setRemember(e)}/>
            <Label htmlFor="remember" className="text-sm font-medium">로그인 상태 유지</Label>
          </div>


          <Button type="submit" className="h-[48px] cursor-pointer">
            로그인
          </Button>
        </form>
      </Form>
    </div>
  );
};
