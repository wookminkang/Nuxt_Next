'use client';

import { useState } from 'react';
import { UserTrendChart } from './UserTrendChart';
import { adminClientApi } from '@/shared/api/adminClient';

interface PeriodData {
  period: string;
  regCnt: number;
  visitTot: number | null;
  visitCnt: number;
}

interface UserTrendChartSectionProps {
  initialData: PeriodData[];
}

export const UserTrendChartSection = ({ initialData }: UserTrendChartSectionProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState<number>(0); // 0: 일, 1: 월, 2: 년
  const [periodsData, setPeriodsData] = useState<PeriodData[]>(initialData);
  const [isLoading, setIsLoading] = useState(false);

  const handlePeriodChange = async (period: number) => {
    if (selectedPeriod === period) return;

    setIsLoading(true);
    try {
      const data = await adminClientApi.getDashboardPeriods(period);
      setPeriodsData(data);
    } catch (error) {
      console.error('기간별 데이터 조회 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="col-span-8 bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">홈페이지 이용자 추이</h3>
        <div className="flex gap-2">
          <button
            onClick={() => handlePeriodChange(2)}
            disabled={isLoading}
            className={`px-3 py-1 text-sm border rounded ${selectedPeriod === 2
              ? 'bg-blue-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            년
          </button>
          <button
            onClick={() => handlePeriodChange(1)}
            disabled={isLoading}
            className={`px-3 py-1 text-sm border rounded ${selectedPeriod === 1
              ? 'bg-blue-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            월
          </button>
          <button
            onClick={() => handlePeriodChange(0)}
            disabled={isLoading}
            className={`px-3 py-1 text-sm border rounded ${selectedPeriod === 0
              ? 'bg-blue-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            일
          </button>
        </div>
      </div>
      <div className="h-64">
        {isLoading ? (
          <div className="h-full bg-gray-50 rounded flex items-center justify-center">
            <span className="text-gray-400">로딩 중...</span>
          </div>
        ) : periodsData && periodsData.length > 0 ? (
          <UserTrendChart data={periodsData} />
        ) : (
          <div className="h-full bg-gray-50 rounded flex items-center justify-center">
            <span className="text-gray-400">데이터가 없습니다</span>
          </div>
        )}
      </div>
    </div>
  );
};

