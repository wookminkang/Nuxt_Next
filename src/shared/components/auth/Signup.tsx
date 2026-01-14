'use client';

import { useAgreeStore } from "@/shared/store/userStore";
import { Form, FormItem, FormLabel, FormControl, FormMessage, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormSchema } from "@/shared/utils/validators";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";

const formSchema = z.object({
  id: FormSchema.id,
  password: FormSchema.password,
  name: FormSchema.name,
});


export const Signup = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: '', 
      password: '',
      name: '',
    },
  });


  /**
   * 회원가입 정보 제출
   */
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };


  /**
   * 아이디 중복체크
   */
  const idCheck = async() =>{
    const postVar = {
      id: form.getValues('id'),
    }
    console.log(postVar);
  }

  return (
    <div className="w-full max-w-sm">
      <h1 className="text-4xl font-bold mb-12">회원가입</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>아이디</FormLabel>
                <FormControl>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      className="h-[48px]"
                      autoComplete="off"
                      placeholder="아이디를 입력해주세요"
                      {...field}
                    />
                    <Button type="button" variant="outline" className="h-[48px] cursor-pointer" onClick={idCheck}>
                      중복확인
                    </Button>
                  </div>
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
        </form>
      </Form>
    </div>
  );
};