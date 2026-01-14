'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAgreeStore } from "@/shared/store/userStore";
import { usePathname } from "next/navigation";

export const Agreement = () => {
  const router = useRouter()
  const pathname = usePathname();
  const setAgreement = useAgreeStore((state) => state.setAgreement);
  const resetAgreement = useAgreeStore((state) => state.resetAgreement);

  const [allChecked, setAllChecked] = useState<boolean>(false);
  const [checkBoxList, setCheckBoxList] = useState([
    {
      label: '개인정보처리방침(필수)',
      id: 'privacy',
      checked: false,
      required: true,
      icon: <ChevronRight />,
      href: '/agreement/privacy'
    },
    {
      label: '이용약관 동의(필수)',
      id: 'terms',
      checked: false,
      required: true,
      icon: <ChevronRight />,
      href: '/agreement/terms'
    },
    {
      label: '이메일주소무단수집거부(선택)',
      id: 'email',
      checked: false,
      required: false,
      icon: <ChevronRight />,
      href: '/agreement/email'
    }
  ])

//전체 체크박스 클릭 시
const handleAllChecked = (checked: boolean) => {
    setAllChecked(checked)
    setCheckBoxList(prev => prev.map(item => ({...item, checked: checked})))
};

// 개별 체크박스
const handleSingleChecked = (id: string, checked: boolean) => {
  const newList = checkBoxList.map(item => item.id === id ? ({...item, checked: checked}) : item)
  setCheckBoxList(newList)
  const isAllChecked = newList.every(item => item.checked)
  setAllChecked(isAllChecked)
};

const validateChk = () => {
  const requiredList = checkBoxList.filter(item => item.required)
  const isChecked = requiredList.every(item => item.checked)
  return isChecked
}

const nextStep = () => {
  const filter = checkBoxList.filter(item => item.checked).map(item => item.id);
  setAgreement(filter);
  router.push('/signup');
  
}

useEffect(() => {  
  return () => {
    resetAgreement();
  };
}, [pathname]);

  return (
    <div className="w-full  max-w-sm">
      <Button variant="ghost" size="icon" className="cursor-pointer mb-6" onClick={() => router.push('/login')}>
        <ArrowLeft className="size-6" />
      </Button>
      <h1 className="text-4xl font-bold mb-12">서비스 약관 동의</h1>

      <div className="flex flex-col gap-3">
        <div className="flex items-center">
          <Checkbox id="allChecked" className="w-4 h-4 mr-2" checked={allChecked} onCheckedChange={(e: boolean) => handleAllChecked(e)}/>
          <Label htmlFor="allChecked" className="text-sm font-medium cursor-pointer">모두 동의(선택 사항 포함)</Label>
        </div>
        <p className="text-xs text-gray-500 mt-[-10px] pl-6">
          전체동의는 선택적 제공 항목인 개인정보의 수집 이용<br />
          제공을 포함한 동의로, 개별적 동의를 선택 가능합니다.
        </p>
        {
          checkBoxList.map((item) => (
            <div className="flex items-center justify-between" key={item.id}>
              <div className="flex items-center">
                <Checkbox id={item.id} className="w-4 h-4 mr-2" checked={item.checked} onCheckedChange={(e: boolean) => handleSingleChecked(item.id, e)}/>
                <Label htmlFor={item.id} className="text-sm font-medium cursor-pointer">{item.label}</Label>
              </div>
              <Link href={item.href}>
                <Button variant="ghost" size="sm" className="cursor-pointer"> 
                  {item.icon}
                </Button>
              </Link>
            </div>
          ))
        }

        <Button className="h-[48px] cursor-pointer text-md mt-4" disabled={!validateChk()} onClick={() => nextStep()}>
          다음으로
        </Button>
      </div>
    </div>
  );
};