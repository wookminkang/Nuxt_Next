import { adminApi } from "@/shared/api/admin";
import { UserTrendChartSection } from "@/shared/components/admin/UserTrendChartSection";
import { GenderRatioChart } from "@/shared/components/admin/GenderRatioChart";
import { StorageChart } from "@/shared/components/admin/StorageChart";

export default async function AdminPage() {
  const { data } = await adminApi.getDashboard();
  // console.log(`res =>`, data);

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-3xl font-bold">대시보드</h1>

      {/* 상단 지표 카드들 (2x2 그리드) */}
      <div className="grid grid-cols-2 gap-4">
        {/* 금일 방문자 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">금일 방문자</h3>
          <div className="text-3xl font-bold mb-2">{data.visitCnt.toLocaleString()}명</div>
          <div className="text-sm text-gray-500">어제 대비 {data.visitDod}%</div>
          <div className="text-sm text-gray-500 mt-2">총 방문자 : {data.visitTot.toLocaleString()}명</div>
        </div>

        {/* 금일 가입자 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">금일 가입자</h3>
          <div className="text-3xl font-bold mb-2">{data.regCnt.toLocaleString()}명</div>
          <div className="text-sm text-gray-500">어제 대비 {data.regDod}%</div>
          <div className="text-sm text-gray-500 mt-2">총 가입자: {data.regTot.toLocaleString()} 명</div>
        </div>

        {/* 금일 예약 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">금일 예약</h3>
          <div className="text-3xl font-bold mb-2">{data.bookCnt.toLocaleString()}건</div>
          <div className="text-sm text-gray-500">어제 대비 {data.bookDod}%</div>
        </div>

        {/* 금일 예약 취소 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">금일 예약 취소</h3>
          <div className="text-3xl font-bold mb-2">{data.cancelCnt.toLocaleString()}건</div>
          <div className="text-sm text-gray-500">어제 대비 {data.cancelDod}%</div>
        </div>
      </div>

      {/* 중간 섹션 */}
      <div className="grid grid-cols-12 gap-4">
        {/* 홈페이지 이용자 추이 (큰 카드) */}
        <UserTrendChartSection initialData={data.periods || []} />

        {/* 오른쪽 컬럼 */}
        <div className="col-span-4 space-y-4">
          {/* 회원 성비 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">회원 성비</h3>
            <GenderRatioChart manCnt={data.manCnt || 0} womanCnt={data.womanCnt || 0} />
          </div>

          {/* 스토리지 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">스토리지</h3>
            <StorageChart used={114.47} supply={1000} />
          </div>

          {/* 관리자 정보 */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-400">👤</span>
              </div>
              <button className="text-gray-400">✏️</button>
            </div>
            <h3 className="text-lg font-semibold mb-2">홈페이지관리자</h3>
            <div className="text-sm text-gray-600 mb-1">hpadmin</div>
            <div className="text-sm text-gray-600 mb-4">010-0000-0000</div>
            <button className="w-full bg-blue-600 text-white py-2 rounded text-sm">
              개인 정보 관리
            </button>
          </div>
        </div>
      </div>

      {/* 하단 콘텐츠 리스트 (3x2 그리드) */}
      <div className="grid grid-cols-3 gap-4">
        {/* 공지사항 */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">공지사항</h3>
            <a href="#" className="text-sm text-blue-500">더보기 &gt;</a>
          </div>
          <ul className="space-y-2">
            <li className="text-sm border-b pb-2">
              <div className="text-gray-600">145 [필독] 홈페이지 리뉴얼 개인정보 확인 절차 홈페……</div>
              <div className="text-xs text-gray-400 mt-1">2025.11.27</div>
            </li>
            <li className="text-sm border-b pb-2">
              <div className="text-gray-600">144 [필독공지] 24년 4월~5월 그린피 홈페……</div>
              <div className="text-xs text-gray-400 mt-1">2025.11.21</div>
            </li>
          </ul>
        </div>

        {/* 자료실 */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">자료실</h3>
            <a href="#" className="text-sm text-blue-500">더보기 &gt;</a>
          </div>
          <div className="text-sm text-gray-400">목록이 없습니다</div>
        </div>

        {/* 이벤트 */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">이벤트</h3>
            <a href="#" className="text-sm text-blue-500">더보기 &gt;</a>
          </div>
          <ul className="space-y-2">
            <li className="text-sm border-b pb-2">
              <div className="text-gray-600">55 test test test 22222222 25.11.13~25.11.30 홈………</div>
              <div className="text-xs text-gray-400 mt-1">2025.11.14</div>
            </li>
            <li className="text-sm border-b pb-2">
              <div className="text-gray-600">54 test 25.11.13~25.12.31 홈...</div>
              <div className="text-xs text-gray-400 mt-1">2025.11.13</div>
            </li>
          </ul>
        </div>

        {/* 자주 찾는 질문 */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">자주 찾는 질문</h3>
            <a href="#" className="text-sm text-blue-500">더보기 &gt;</a>
          </div>
          <div className="text-sm text-gray-400">목록이 없습니다</div>
        </div>

        {/* 배너/팝업 관리 */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">배너/팝업 관리</h3>
            <a href="#" className="text-sm text-blue-500">더보기 &gt;</a>
          </div>
          <ul className="space-y-2">
            <li className="text-sm border-b pb-2">
              <div className="text-gray-600">126 [필독] 홈페이지 리뉴얼_개인정보 확인 절차_2025-11-27T... 홈…</div>
              <div className="text-xs text-gray-400 mt-1">2025.12.03</div>
            </li>
            <li className="text-sm border-b pb-2">
              <div className="text-gray-600">125 test_2025-11-13T20:28:37 홈…</div>
              <div className="text-xs text-gray-400 mt-1">2025.11.14</div>
            </li>
          </ul>
        </div>

        {/* 빈 공간 (3x2 그리드의 마지막 칸) */}
        <div className="bg-white rounded-lg shadow p-6">
          {/* 추가 콘텐츠 영역 */}
        </div>
      </div>
    </div>
  );
}

