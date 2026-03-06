'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CalendarBox } from '@/components/common/CalendarBox';
import { InputField } from '@/components/common/InputField';
import { SelectField } from '@/components/common/SelectField';
import { CalendarInputField } from '@/components/common/CalendarInputField';
import { Pagination } from '@/components/common/Pagination';
import { CheckboxField } from '@/components/common/CheckboxField';
import { RadioGroupField } from '@/components/common/RadioField';
import { TabMenu } from '@/components/common/TabMenu';
import { ArrowLeft } from 'lucide-react';

const SELECT_OPTIONS = [
  { value: '1', label: 'option01' },
  { value: '2', label: 'option02' },
  { value: '3', label: 'option03' },
  { value: '4', label: 'hover는 이렇게' },
];

export default function ComponentsExamplePage() {
  const [calendarValue, setCalendarValue] = useState<Date | null>(null);
  const [calendarInputValue, setCalendarInputValue] = useState<Date | null>(
    null
  );
  const [selectValue, setSelectValue] = useState<string>('');
  const [inputValue, setInputValue] = useState('');
  const [page, setPage] = useState(1);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);
  const [radioValue, setRadioValue] = useState('a');
  const [tabValue, setTabValue] = useState('on');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 border-b bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center gap-4 px-4 py-3">
          <Link
            href="/"
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="size-4" />
            홈
          </Link>
          <h1 className="text-xl font-bold text-gray-900">
            공통 컴포넌트 예시
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-10">
        <div className="flex flex-col gap-14">
          {/* InputField */}
          <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-gray-500">
              InputField
            </h2>
            <p className="mb-6 text-sm text-gray-600">
              라벨, 필수 표시(*), 클리어 버튼, 헬퍼 텍스트를 지원하는 입력 필드
            </p>
            <div className="grid gap-6 sm:grid-cols-2">
              <InputField
                label="Label type"
                required
                placeholder="type"
                helperText="helper text(optional)"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <InputField
                label="일반 입력"
                placeholder="입력하세요"
                helperText="비제어 모드 예시"
              />
            </div>
          </section>

          {/* SelectField */}
          <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-gray-500">
              SelectField
            </h2>
            <p className="mb-6 text-sm text-gray-600">
              라벨, 필수 표시, 플레이스홀더, 옵션 목록, 헬퍼 텍스트를 지원하는
              셀렉트박스
            </p>
            <div className="grid gap-6 sm:grid-cols-2">
              <SelectField
                label="Label (optional)"
                required
                placeholder="선택하세요"
                options={SELECT_OPTIONS}
                value={selectValue}
                onValueChange={setSelectValue}
                helperText="helper text(optional)"
              />
              <SelectField
                label="선택된 값 표시"
                placeholder="선택하세요"
                options={SELECT_OPTIONS}
                value={selectValue}
                onValueChange={setSelectValue}
              />
            </div>
          </section>

          {/* CalendarInputField */}
          <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-gray-500">
              CalendarInputField
            </h2>
            <p className="mb-6 text-sm text-gray-600">
              인풋 클릭 시 캘린더 팝오버가 열리는 날짜 선택 필드
            </p>
            <div className="grid gap-6 sm:grid-cols-2">
              <CalendarInputField
                label="Label (optional)"
                required
                placeholder="날짜를 선택하세요"
                helperText="helper text(optional)"
                value={calendarInputValue}
                onChange={setCalendarInputValue}
              />
              <CalendarInputField
                label="선택된 날짜"
                placeholder="날짜를 선택하세요"
                value={calendarInputValue}
                onChange={setCalendarInputValue}
                displayFormat="YYYY-MM-DD"
              />
            </div>
          </section>

          {/* Checkbox & Radio */}
          <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-gray-500">
              Checkbox / Radio
            </h2>
            <p className="mb-6 text-sm text-gray-600">
              체크박스·라디오 (선택 시 진한 회색, 비활성 시 연한 회색)
            </p>
            <div className="grid gap-8 sm:grid-cols-2">
              <div className="flex flex-col gap-4">
                <CheckboxField
                  label="체크 안 함"
                  checked={checked1}
                  onCheckedChange={(v) => setChecked1(v === true)}
                />
                <CheckboxField
                  label="체크 함"
                  checked={checked2}
                  onCheckedChange={(v) => setChecked2(v === true)}
                />
                <CheckboxField label="비활성 체크" checked disabled />
                <CheckboxField label="비활성 미체크" disabled />
              </div>
              <div className="flex flex-col gap-4">
                <RadioGroupField
                  name="demo"
                  value={radioValue}
                  onChange={setRadioValue}
                  options={[
                    { value: 'a', label: '옵션 A' },
                    { value: 'b', label: '옵션 B' },
                    { value: 'c', label: '옵션 C' },
                  ]}
                />
                <RadioGroupField
                  name="demo-disabled"
                  value="x"
                  options={[
                    { value: 'x', label: '선택됨 (비활성)' },
                    { value: 'y', label: '미선택 (비활성)' },
                  ]}
                  disabled
                />
              </div>
            </div>
          </section>

          {/* TabMenu */}
          <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-gray-500">
              TabMenu
            </h2>
            <p className="mb-6 text-sm text-gray-600">
              2depth 탭 메뉴 (선택 탭: 진한 배경·흰 글자, 비선택: 연한 배경·회색 글자)
            </p>
            <div className="overflow-hidden rounded-t-lg">
              <TabMenu
                tabs={[
                  { value: 'on', label: '2depth on' },
                  { value: 'off1', label: '2depth off' },
                  { value: 'off2', label: '2depth off' },
                  { value: 'off3', label: '2depth off' },
                ]}
                value={tabValue}
                onValueChange={setTabValue}
              />
              <div className="rounded-b-lg border border-t-0 border-gray-200 bg-white p-4 text-sm text-gray-500">
                선택된 탭: {tabValue}
              </div>
            </div>
          </section>

          {/* Pagination */}
          <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-gray-500">
              Pagination
            </h2>
            <p className="mb-6 text-sm text-gray-600">
              이전/다음 화살표와 페이지 번호. 선택된 페이지는 진한 원형 배경으로 표시
            </p>
            <Pagination
              currentPage={page}
              totalPages={5}
              onPageChange={setPage}
            />
          </section>

          {/* CalendarBox */}
          <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-gray-500">
              CalendarBox
            </h2>
            <p className="mb-6 text-sm text-gray-600">
              단독 캘린더 (월/연도 탐색, 요일·날짜 그리드, 초기화/선택 완료 버튼)
            </p>
            <div className="flex flex-wrap gap-8">
              <CalendarBox
                title="CalendarBox"
                value={calendarValue}
                onChange={setCalendarValue}
                onReset={() => setCalendarValue(null)}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
