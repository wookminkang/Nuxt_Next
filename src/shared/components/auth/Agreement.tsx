'use client';

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export const Agreement = () => {
  return (
    <div className="w-full  max-w-sm">
      <h1 className="text-3xl font-bold text-center mb-6">서비스 약관 동의</h1>

      <div className="flex flex-col gap-4">
        <div className="flex items-center">
          <Checkbox id="agreement" className="w-4 h-4 mr-2" />
          <Label htmlFor="agreement" className="text-sm font-medium">서비스 약관 동의</Label>
        </div>
        <div className="flex items-center">
          <Checkbox id="agreement" className="w-4 h-4 mr-2" />
          <Label htmlFor="agreement" className="text-sm font-medium">개인정보처리방침</Label>
        </div>
      </div>
    </div>
  );
};