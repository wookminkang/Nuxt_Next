import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";


export default async function AgreementPage({ params }: { params: { slug: string } }) {
  const { slug } = await params
  const title = {
    privacy: {
      title: '개인정보처리방침',
      content: '개인정보처리방침 내용',
    },
    terms: {
      title: '이용약관',
      content: '이용약관 내용',
    },
    email: {
      title: '이메일주소무단수집거부',
      content: '이메일주소무단수집거부 내용',
    },
  }


  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex flex-col gap-6">
        <Button variant="ghost" size="icon" className="cursor-pointer">
          <Link href="/agreement">
            <ArrowLeft className="size-6" />
          </Link>
        </Button>
        <h1 className="text-4xl font-bold">{title[slug as keyof typeof title].title}</h1>
        <div>
          {title[slug as keyof typeof title].content}
        </div>
      </div>
    </div>
  ) 
}