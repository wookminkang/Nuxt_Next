'use client';

import { cn } from '@/lib/utils';
import { Calendar as CalendarIcon, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { DateRange } from 'react-day-picker';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { usePathname } from 'next/navigation';

import { useSearchParams, useRouter } from 'next/navigation';
import dayjs from 'dayjs';

interface BoardSearchProps {
  className?: string;
}

function BoardSearch({ className }: BoardSearchProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  //날짜 - 초기값을 undefined로 설정하여 hydration 문제 방지
  const [date, setDate] = useState<DateRange>({
    from: searchParams.get('date') ? dayjs(searchParams.get('date')).toDate() : dayjs().toDate(),
    to: searchParams.get('dateTo') ? dayjs(searchParams.get('dateTo')).toDate() : dayjs().toDate(),
  });

  //검색어
  const [text, setText] = useState<string>(searchParams.get('text') || '');
  //노출개수
  const [size, setSize] = useState<string>(searchParams.get('size') || '10');

  const handleSearch = () => {
    router.push(
      `${pathname}?date=${dayjs(date?.from).format('YYYY-MM-DD')}&dateTo=${dayjs(date?.to).format('YYYY-MM-DD')}${text && `&text=${text}`}&size=${size}`
    );
  };

  return (
    <div
      className={cn(
        'mx-auto flex w-full max-w-[1200px] items-center justify-between py-6',
        className
      )}
    >
      {/* Left: Search Inputs */}
      <div className="flex items-center gap-2">
        {/* Title Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="제목"
            className="h-12 w-64 rounded-md border border-[#e5e7eb] px-4 text-[15px] placeholder-[#9ca3af] focus:border-[#1a1c23] focus:outline-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        {/* Date Picker Range (shadcn Calendar) */}
        <Popover>
          <PopoverTrigger asChild>
            <div className="relative flex h-12 min-w-[280px] cursor-pointer items-center rounded-md border border-[#e5e7eb] px-4 hover:bg-gray-50">
              <span className="flex-1 text-[15px] text-[#1a1c23]">
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, 'yyyy-MM-dd')}~{format(date.to, 'yyyy-MM-dd')}
                    </>
                  ) : (
                    format(date.from, 'yyyy-MM-dd')
                  )
                ) : (
                  <span>날짜 선택</span>
                )}
              </span>
              <CalendarIcon className="ml-2 size-5 text-[#4b5563]" />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
              locale={ko}
            />
          </PopoverContent>
        </Popover>

        {/* Search Button */}
        <button
          className="flex h-12 cursor-pointer items-center justify-center gap-2 rounded-md border border-[#1a1c23] bg-white px-6 transition-colors hover:bg-gray-50"
          onClick={handleSearch}
        >
          <Search className="size-5 text-[#1a1c23]" />
          <span className="text-[15px] font-bold text-[#1a1c23]">조회</span>
        </button>
      </div>

      {/* Right: Display Count Selector */}
      <div className="flex items-center gap-4">
        <span className="text-[15px] text-[#4b5563]">노출개수</span>
        <Select value={size} onValueChange={setSize}>
          <SelectTrigger className="h-10 w-[100px] border-[#e5e7eb] text-[15px] font-bold text-[#1a1c23] focus:ring-0 focus:ring-offset-0">
            <SelectValue placeholder="선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10개</SelectItem>
            <SelectItem value="20">20개</SelectItem>
            <SelectItem value="30">30개</SelectItem>
            <SelectItem value="50">50개</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export { BoardSearch };
